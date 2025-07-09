import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile-service';
import { ProfileGeneralInfo } from '../../components/profile-general-info/profile-general-info';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  imports: [ProfileGeneralInfo, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getInfoProfile();
  }
}
