import { Component, EventEmitter, Input, Output, AfterContentInit, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.css']
})
export class ListBoxComponent implements AfterContentInit, OnChanges {
  @Input() disabled:any = false
  @Input() disablefilter:any = false
  @Input() enablefilter:any = true
  @Input() items:any = []
  filtereditems:any = []
  @Output() itemselected = new EventEmitter<any>();
  filter = ""

  ngAfterContentInit(): void {

    if(this.enablefilter)
    {
      this.FilterItems(this.filter)
    }
    else
    {
      this.filtereditems = this.items
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.enablefilter)
    {
      this.FilterItems(this.filter)
    }
    else
    {
      this.filtereditems = this.items
    }
  }

  ItemSelected(item:any)
  {
    if(!this.disabled)
      this.itemselected.emit((<HTMLInputElement>item.target).innerHTML)
  }

  FilterItems(filter:any)
  {
    if(!this.disabled)
    {
      this.filtereditems = []
  
      for(var i = 0; i < this.items.length; i++)
      {
        var item = this.items[i]
        if(item.includes(filter))
          this.filtereditems.push(item)
      }
    }
  }

  Filter(textb:any)
  {
    this.filter = (<HTMLInputElement>textb.target).value
    this.FilterItems(this.filter)
  }
}
