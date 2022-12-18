import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainRoutes } from './main.routing';
import { AddNewComponent } from './add-new/add-new.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { MiniCalendarPickerComponent } from '../../components/common/mini-calendar-picker/mini-calendar-picker.component';

@NgModule({
  declarations: [
    AddNewComponent,
    HomeComponent,
    SettingsComponent,
    MiniCalendarPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
