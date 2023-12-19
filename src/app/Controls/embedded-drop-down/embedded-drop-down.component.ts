import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-embedded-drop-down',
  templateUrl: './embedded-drop-down.component.html',
  styleUrls: ['./embedded-drop-down.component.css']
})
export class EmbeddedDropDownComponent implements AfterContentInit, OnChanges {
  @Input() structure:any = null
  @Input() allowchildcheckbox:any = false
  @Input() allowchildren:any = true
  @Output() valuechanged = new EventEmitter<any>()
  @Output() childclicked = new EventEmitter<any>()
  display:any = false
  names:any = []
  items:any = []

  ngAfterContentInit(): void {
    this.GetCurrentNames()
    this.GetItems()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetCurrentNames()
    this.GetItems()
  }

  GetCurrentNames()
  {
    this.names = []

    for(var item in this.structure)
    {
      if(item != 'items' && item != "showchildren")
        this.names.push(item)
    }
  }

  GetItems()
  {
    this.items = []

    for(var item in this.structure.items)
    {
      if(item != 'items')
        this.items.push(item)
    }
  }

  ChildClicked(item)
  {
    this.childclicked.emit(item)
  }

  ValueChanged()
  {
    this.valuechanged.emit()
  }
}
