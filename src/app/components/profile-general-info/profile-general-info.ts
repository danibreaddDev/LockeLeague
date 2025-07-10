import { Component, inject, Input, WritableSignal } from '@angular/core';
import { ProfileService } from '../../core/services/profile-service';

import { Loader } from '../../shared/components/loader/loader';
interface profile {
  id: string;
  created_at: string;
  name: string;
  avatar_url: string;
  user_name: string;
  rank: number;
}

@Component({
  selector: 'app-profile-general-info',
  imports: [Loader],
  templateUrl: './profile-general-info.html',
  styleUrl: './profile-general-info.css',
})
export class ProfileGeneralInfo {
  @Input() profileInfo!: WritableSignal<profile | null>;
  //profileService = inject(ProfileService);
}
