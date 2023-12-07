import { Component, Output, Input, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-new-drop-down',
  templateUrl: './new-drop-down.component.html',
  styleUrls: ['./new-drop-down.component.css']
})
export class NewDropDownComponent  implements AfterContentInit{
  @Output() mouseenter = new EventEmitter<any>();
  @Output() itemselected = new EventEmitter<any>();

  @Input() filtername:any = "Filter Items:"
  @Input() dropdowntag:any = "Items:"
  @Input() dropdowntagenable:any = false
  @Input() emptyoption = true
  @Input() enablefilter:any = false
  @Input() disabled:any = false
  @Input() selector:any = ""
  @Input() items:any = [] 
  itemfilter:any = ""

  constructor()
  {
  }

  ngAfterContentInit(): void {
    
  }


  MouseEnter()
  {
    this.mouseenter.emit()
  }

  ItemClicked(event:any)
  {
    setTimeout(() => {this.itemselected.emit(this.selector)},50)
  }
}
