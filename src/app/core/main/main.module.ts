import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainRoutes } from './main.routing';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

import { AddHumanComponent } from '../../components/humans/add-human/add-human.component';
import { AddNewComponent } from './add-new/add-new.component';
import { MiniCalendarPickerComponent } from '../../components/common/mini-calendar-picker/mini-calendar-picker.component';

@NgModule({
  declarations: [
    HomeComponent,
    SettingsComponent,
    AddHumanComponent,
    AddNewComponent,
    MiniCalendarPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
