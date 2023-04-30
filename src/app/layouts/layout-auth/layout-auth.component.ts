import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-auth',
  template: `
    <div class="h-screen w-screen grid grid-cols-8 px-6 md:px-0">
      <div
        class="col-span-8 md:col-start-4
        md:col-span-2 flex flex-col justify-center
        text-neutral-900 dark:text-white">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class LayoutAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
