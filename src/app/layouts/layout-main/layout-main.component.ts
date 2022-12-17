import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pui-layout-main',
  template: `
    <div class="h-screen w-screen">
      <piu-navbar-main></piu-navbar-main>

      <div class="container px-2 md:px-40 py-2.5 text-white">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class LayoutMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
