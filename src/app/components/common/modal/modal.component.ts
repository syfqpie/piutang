import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // Input
	@Input()
	isShow: boolean = true

  @Input()
  size: Size = 'sm'

  @Input()
  title: string = ''

  @Input()
  bodyTpl: TemplateRef<any> | null = null

  // Output
  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  /**
	 * Toggle event fx
	 * 
	 * @returns emit onToggle event
	 */
  toggle() {
    return this.onToggle.emit(true)
  }

}
