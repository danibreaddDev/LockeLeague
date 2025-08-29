import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;

  constructor(private userService: UserService) {}
  async getTournaments(idLocke: string, status: string) {
    const { data, error } = await this._clientSupabase
      .from('tournaments')
      .select('*')
      .eq('locke_id', idLocke)
      .eq('status', status);
    return { data, error };
  }
  async getTournament(tournamentId: string) {
    const { data, error } = await this._clientSupabase
      .from('tournaments')
      .select('*')
      .eq('id', tournamentId)
      .single();
    return { data, error };
  }
  async createTournament(tournamentData: any) {
    const { data, error } = await this._clientSupabase
      .from('tournaments')
      .insert(tournamentData)
      .select('*')
      .single();

    return { data, error };
  }
  async startTournament(tournamentId: string, idLocke: string) {
    //Add memebers in table participants
    const participantsResult = await this.addParticipants(
      tournamentId,
      idLocke
    );
    if (!participantsResult.data || participantsResult.error) {
      console.error(
        'No se pudieron añadir participantes:',
        participantsResult.error
      );
      return;
    }
    //set matches
    const matchesResult = await this.setMatches(
      tournamentId,
      participantsResult.data
    );
    if (!matchesResult.data || matchesResult.error) {
      console.error('no se crearon los matches');
      return;
    }
    //update tournament status to active
    const { error: updateTournament } = await this._clientSupabase
      .from('tournaments')
      .update({
        status: 'active',
        started_at: new Date().toISOString(),
      })
      .eq('id', tournamentId);
    const { data: tournamentCount, error: errorGettingTournament } =
      await this._clientSupabase
        .from('lockes')
        .select('tournaments')
        .eq('id', idLocke)
        .single();

    const { error: errorAddingTournamentLocke } = await this._clientSupabase
      .from('lockes')
      .update({
        tournaments: tournamentCount?.tournaments + 1,
      })
      .eq('id', idLocke);
    return {
      updateTournament,
      errorGettingTournament,
      errorAddingTournamentLocke,
    };
  }
  async getMatches(tournamentId: string) {
    // 1️⃣ Traer todos los matches
    const { data: matches, error: errorMatches } = await this._clientSupabase
      .from('matches')
      .select('*')
      .eq('tournament_id', tournamentId);

    if (!matches) return { matches: null, errorMatches };

    // 2️⃣ Obtener todos los participant_ids
    const participantIds = matches.flatMap((m) => [
      m.participant_id,
      m.participant2_id,
    ]);

    // 3️⃣ Traer info de participantes
    const { data: participantsData, error: participantsError } =
      await this._clientSupabase
        .from('participants')
        .select('id, user_id')
        .in('id', participantIds);

    if (!participantsData) return { participantsData: null, participantsError };

    // 4️⃣ Traer info de usuarios
    const userIds = participantsData.map((p) => p.user_id);
    const { data: usersInfo, error: errorUsersInfo } =
      await this.userService.getUserByIds(userIds);

    if (!usersInfo) return { usersInfo: null, errorUsersInfo };

    // 5️⃣ Crear mapa de participante → info completa
    const participantMap = participantsData.reduce((acc, participant) => {
      const user = usersInfo.find((u) => u.id === participant.user_id);
      acc[participant.id] = {
        participant_id: participant.id,
        user_id: participant.user_id,
        name: user?.name || '',
        avatar_url: user?.avatar_url || '',
      };
      return acc;
    }, {} as Record<string, { participant_id: string; user_id: string; name: string; avatar_url: string }>);

    // 6️⃣ Reemplazar IDs por objetos en los matches
    const matchesWithParticipants = matches.map((match) => ({
      ...match,
      participant: participantMap[match.participant_id],
      participant2: participantMap[match.participant2_id],
    }));
    console.log(matchesWithParticipants);

    return { matches: matchesWithParticipants };
  }
  async completeMatches(
    winners: any,
    currentRound: string,
    tournamentId: string
  ) {
    const winnersToUpdate = winners.map((winner: any) => ({
      status: 'completed',
      completed_at: new Date().toISOString(),
      winner_id: winner.participant.participant_id,
    }));

    const { data, error } = await this._clientSupabase
      .from('matches')
      .update(winnersToUpdate)
      .in(
        'id',
        winners.map((w: any) => w.matchId)
      );

    await this.generateNextRoundMatches(tournamentId, currentRound);
    return { error };
  }
  async getParticipants(tournamentId: string) {
    const { data, error: errorGetParticipants } = await this._clientSupabase
      .from('participants')
      .select('*')
      .eq('tournament_id', tournamentId);
    if (data) {
      const userIds = data.map((p) => p.user_id);
      const { data: usersInfo, error: errorUsersInfo } =
        await this.userService.getUserByIds(userIds);

      if (!usersInfo) return { usersInfo: null, errorUsersInfo };

      // 5️⃣ Crear array de participantes con info completa
      let participants = [] as any;
      data.map((participant) => {
        const user = usersInfo.find((u) => u.id === participant.user_id);
        participants.push({
          participant_id: participant.id,
          user_id: participant.user_id,
          name: user?.name || '',
          avatar_url: user?.avatar_url || '',
          final_rank: participant.final_rank,
          points: participant.points,
        });
      });
      return { participants, error: null };
    }
    return { errorGetParticipants };
  }
  private async addParticipants(tournamentId: string, idLocke: string) {
    const { data: users, error: usersError } = await this._clientSupabase
      .from('locke_users')
      .select('user_id, lifes')
      .eq('locke_id', idLocke);

    if (usersError) {
      return { data: null, error: usersError };
    }

    if (!users || users.length === 0) {
      return { data: null, error: null };
    }

    const participants = users.map((user) => ({
      user_id: user.user_id,
      tournament_id: tournamentId,
      seed: user.lifes,
      points: 0,
      final_rank: users.length,
    }));

    const { data: inserted, error: insertError } = await this._clientSupabase
      .from('participants')
      .insert(participants)
      .select('id,seed');

    return { data: inserted, error: insertError };
  }
  private async setMatches(tournamentId: string, participants: any) {
    const matches = [];
    let matchNumber = 1;
    const sortedParticipants = participants.sort(
      (p1: any, p2: any) => p1.seed - p2.seed
    );
    const round = this.getRound(sortedParticipants.length, '');
    for (let index = 0; index < sortedParticipants.length; index += 2) {
      const p1 = participants[index].id;
      const p2 = participants[index + 1]?.id ?? null; // bye
      const isBye = p2 === null;
      const match = {
        tournament_id: tournamentId,
        participant_id: p1,
        participant2_id: p2,
        winner_id: isBye ? p1 : null,
        round: round,
        status: isBye ? 'completed' : 'pending',
        match_number: matchNumber,
        completed_at: isBye ? new Date().toISOString() : null,
      };
      if (isBye) {
        console.log('Match is a bye, auto-advancing participant:', match);
        const { error: errorUpdatingRank } = await this._clientSupabase
          .from('participants')
          .update({
            final_rank: sortedParticipants.length - 1,
          })
          .eq('id', p1);
        if (errorUpdatingRank) {
          return { data: null, error: errorUpdatingRank };
        }
      }
      console.log(match);
      matches.push(match);
      matchNumber++;
    }
    console.log('matches to insert,', matches);
    //comprobar si hay participantes
    const { data: existingParticipants, error: errorExistinParticipants } =
      await this._clientSupabase
        .from('participants')
        .select('user_id')
        .eq('tournament_id', tournamentId);

    console.log('Participantes existentes:', existingParticipants);
    // Insertar en tabla matches
    if (!existingParticipants) {
      console.error('No hay participantes existentes.');
      return { data: null, error: errorExistinParticipants };
    }
    const { data, error } = await this._clientSupabase
      .from('matches')
      .insert(matches)
      .select('*');

    if (error) console.error('Error insertando matches:', error);

    return { data, error: null };
  }
  private getRound(nParticipants: number, currentRound: string) {
    if (nParticipants === 2) {
      return 'final';
    } else if (nParticipants === 4) {
      return 'semifinal';
    } else if (nParticipants === 8) {
      return 'quarterfinal';
    }
    if (currentRound) {
      const match = currentRound.match(/round_(\d+)/);
      if (match) return `round_${parseInt(match[1]) + 1}`;
    }
    return 'round_1';
  }
  private async generateNextRoundMatches(
    tournamentId: string,
    currentRound: string
  ) {
    const { data: winners, error } = await this._clientSupabase
      .from('matches')
      .select('*')
      .eq('tournament_id', tournamentId)
      .eq('round', currentRound);
    if (!winners) {
      return { error };
    } else if (winners.length === 1) {
      console.log(winners[0]);

      //tournament completed
      const { error: errorUpdatingRank } = await this._clientSupabase
        .from('participants')
        .update({
          final_rank: 1,
        })
        .eq('id', winners[0].winner_id);
      console.log('tournament completed');
      if (error) {
        return { errorUpdatingRank };
      }
      const { error: errorUpdatingTournament } = await this._clientSupabase
        .from('tournaments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', tournamentId);
      if (errorUpdatingTournament) {
        return { error: errorUpdatingTournament };
      }
      const { error: errorDeletingMatches } = await this._clientSupabase
        .from('matches')
        .delete()
        .eq('tournament_id', tournamentId);
      if (errorDeletingMatches) {
        return { errorDeletingMatches };
      }
      const { error: errorSetingPoints } = await this._clientSupabase.rpc(
        'tournament_setpoints',
        {
          tournament: tournamentId,
        }
      );

      if (errorSetingPoints) {
        return { errorSetingPoints };
      }
      const { data: winner, error: errorGetingwinner } =
        await this._clientSupabase
          .from('participants')
          .select('user_id')
          .eq('id', winners[0].winner_id)
          .single();
      if (errorGetingwinner) {
        return { errorGetingwinner };
      }
      const { data: user, error: errorGetingwinCount } =
        await this._clientSupabase
          .from('users')
          .select('tournament_wins')
          .eq('id', winner.user_id)
          .single();
      if (errorGetingwinCount) {
        return { errorGetingwinCount };
      }
      const { error: errorUpdatingWin } = await this._clientSupabase
        .from('users')
        .update({
          tournament_wins: user.tournament_wins + 1,
        })
        .eq('id', winner.user_id);
      if (errorUpdatingWin) {
        return { errorUpdatingWin };
      }
    } else {
      const matches = [];
      let matchNumber = 1;
      const sortedParticipants = winners.sort(
        (p1: any, p2: any) => p1.seed - p2.seed
      );
      const round = this.getRound(winners.length, currentRound);
      for (let index = 0; index < sortedParticipants.length; index += 2) {
        const p1 = sortedParticipants[index].id;
        const p2 = sortedParticipants[index + 1]?.id ?? null; // bye
        const match = {
          tournament_id: tournamentId,
          participant_id: p1,
          participant2_id: p2,
          winner_id: null,
          round: round,
          status: 'pending',
          match_number: matchNumber,
          completed_at: null,
        };
        console.log(match);
        matches.push(match);
        matchNumber++;
      }
      const { data, error: errorInserting } = await this._clientSupabase
        .from('matches')
        .insert(matches)
        .select('*');

      return { data, error: errorInserting };
    }
    return { error: null };
  }
}
