import { Component, inject, Input } from '@angular/core';
import { ProfileService } from '../../core/services/profile-service';

import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-profile-general-info',
  imports: [Loader],
  templateUrl: './profile-general-info.html',
  styleUrl: './profile-general-info.css',
})
export class ProfileGeneralInfo {
  profileService = inject(ProfileService);
}
