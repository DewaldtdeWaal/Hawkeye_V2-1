import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
  @Output() mouseenter = new EventEmitter<any>();
  @Output() itemselected = new EventEmitter<any>();

  @Input() disable:any = false
  @Input() selector:any = ""
  @Input() items:any = [] 

  MouseEnter()
  {
    this.mouseenter.emit()
  }

  ItemClicked(event:any)
  {
    this.selector = (<HTMLInputElement>event.target).innerHTML
    this.itemselected.emit(this.selector)
  }
}
