import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMainComponent } from './layouts/layout-main/layout-main.component';
import { NavbarMainComponent } from './components/layouts/navbar-main/navbar-main.component';
import { TabBarMainComponent } from './components/layouts/tab-bar-main/tab-bar-main.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutMainComponent,
    NavbarMainComponent,
    TabBarMainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
