import { Component, signal, effect } from '@angular/core';
import { ProfileService } from '../../core/services/profile-service';
import { ProfileGeneralInfo } from '../../components/profile-general-info/profile-general-info';
import { CommonModule } from '@angular/common';

interface profile {
  id: string;
  created_at: string;
  name: string;
  avatar_url: string;
  user_name: string;
  rank: number;
}
@Component({
  selector: 'app-profile',
  imports: [ProfileGeneralInfo, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileInfo = signal<profile | null>(null);
  constructor(private profileService: ProfileService) {
    effect(() => {
      this.getInfoProfile();
    });
  }

  getInfoProfile() {
    this.profileService
      .getInfo()
      .then((res) => {
        console.log(res);
        this.profileInfo.set(res.data);
      })
      .catch((error) => console.error(error));
  }
}
