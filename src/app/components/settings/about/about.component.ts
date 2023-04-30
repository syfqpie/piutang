import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // Data
  isShow: boolean = false
  version: string = environment.appVersion

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isShow = !this.isShow
  }

}
