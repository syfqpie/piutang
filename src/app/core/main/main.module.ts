import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainRoutes } from './main.routing';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { DebtComponent } from './debt/debt.component';

import { AddHumanComponent } from '../../components/humans/add-human/add-human.component';
import { DebtFormComponent } from '../../components/debts/debt-form/debt-form.component';
import { MiniCalendarPickerComponent } from '../../components/common/mini-calendar-picker/mini-calendar-picker.component';
import { ModalComponent } from '../../components/common/modal/modal.component';
import { UpdateNameComponent } from '../../components/settings/update-name/update-name.component';
import { ChangePasswordComponent } from '../../components/settings/change-password/change-password.component';
import { AboutComponent } from '../../components/settings/about/about.component';

import { ClickOutsideDirective } from '../../shared/directives/clicks/click-outside.directive';
import { AddNewDebtComponent } from './add-new-debt/add-new-debt.component';

@NgModule({
  declarations: [
    HomeComponent,
    SettingsComponent,
    DebtComponent,
    AddNewDebtComponent,
    AddHumanComponent,
    DebtFormComponent,
    MiniCalendarPickerComponent,
    ModalComponent,
    UpdateNameComponent,
    ChangePasswordComponent,
    AboutComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
