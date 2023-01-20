import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/services/profile/profile.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // Data
  profile: Profile | null = null

  constructor(
    private profileSvc: ProfileService
  ) { }

  ngOnInit(): void {
    this.profile = this.profileSvc.currentProfile
  }

}
