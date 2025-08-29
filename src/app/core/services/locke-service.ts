import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { AuthService } from './auth-service';
import { filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LockeService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  private _currentUser$ = inject(AuthService).user$;
  constructor() {}
  async getLockes() {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { data, error } = await this._clientSupabase
      .from('locke_users')
      .select(
        `
    *,
   locke:locke_id (
      name,
      lifes,
      group_id
    )`
      )
      .eq('user_id', user.id);

    return { data, error };
  }
  async getBestLockes() {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { data, error } = await this._clientSupabase
      .from('locke_users')
      .select(
        `
    *,
   locke:locke_id (
      name,
      lifes,
      group_id
    )`
      )
      .eq('user_id', user.id)
      .limit(3);

    return { data, error };
  }
  async getGeneralInfoLocke(id: string) {
    const { data, error } = await this._clientSupabase
      .from('lockes')
      .select('*')
      .eq('id', id);
    console.log('mi locke', data);

    return { data, error };
  }
  async getLocke(id: string) {
    const { data, error } = await this._clientSupabase
      .from('locke_users')
      .select('id,team,user_id,lifes')
      .eq('locke_id', id);
    console.log('mi locke', data);

    return { data, error };
  }
  async getCreatorLocke(id: string) {
    const { data, error } = await this._clientSupabase
      .from('lockes')
      .select('created_by')
      .eq('id', id)
      .single();
    return { data, error };
  }
  async createLocke(lockeObjForm: any) {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const LockeToInsertData = {
      name: lockeObjForm.name,
      description: lockeObjForm.description,
      lifes: lockeObjForm.lifes,
      group_id: lockeObjForm.group_id,
      status: 'uncompleted',
      created_by: user.id,
    };
    const { data, error } = await this._clientSupabase
      .from('lockes')
      .insert(LockeToInsertData);
    return { data, error };
  }
  async updateLifesLocke(lifes: number, id: string) {
    const { data, error } = await this._clientSupabase
      .from('lockes')
      .update({ lifes: lifes })
      .eq('id', id);
    return { data, error };
  }
  async updateStatusLocke(status: string) {}
  async updateCurrentEvent(event: string, id: string) {
    const { data, error } = await this._clientSupabase
      .from('lockes')
      .update({ next_event: event })
      .eq('id', id);
    return { data, error };
  }
  async updateAnnouncement(announcementObj: any, id: string) {
    console.log('objeto a enviar del anunciuo', announcementObj);

    const { data, error } = await this._clientSupabase
      .from('lockes')
      .update({ announcement: announcementObj })
      .eq('id', id);
    return { data, error };
  }
  async updateLifesUser(userToEdit: any) {
    const { error } = await this._clientSupabase
      .from('locke_users')
      .update({
        lifes: userToEdit.lifes,
      })
      .eq('id', userToEdit.user.id);
    return { error };
  }
}
