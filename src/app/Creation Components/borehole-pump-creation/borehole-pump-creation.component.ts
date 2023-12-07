import { Component, Input, Output, EventEmitter, AfterContentInit, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-borehole-pump-creation',
  templateUrl: './borehole-pump-creation.component.html',
  styleUrls: ['./borehole-pump-creation.component.css']
})
export class BoreholePumpCreationComponent implements AfterContentInit, OnChanges {
  @Input() structure:any = null
  @Input() developertags:any = null;
  @Output() updatechild = new EventEmitter<any>();
  @Output() pagechanged = new EventEmitter<any>();
  drivers:any = []
  tagnames:any = []
  redtag:any =0
  greentag:any = 0
  bluetag:any = 0
  currentcolor:any = "#FFFFFF"

  ngOnChanges(changes: SimpleChanges): void {
  }

  PageChanged()
  {
    this.CheckColor()
    this.pagechanged.emit()
  }

  CheckColor()
  {
    var str = "#"
    var redstr = (this.redtag & 0xFF).toString(16)
    var greenstr = (this.greentag & 0xFF).toString(16)
    var bluestr = (this.bluetag & 0xFF).toString(16)
    if(redstr.length == 1)
      redstr = "0" + redstr

    if(greenstr.length == 1)
      greenstr = "0" + greenstr

    if(bluestr.length == 1)
      bluestr = "0" + bluestr

    this.currentcolor = str + redstr + greenstr + bluestr
  }

  ngAfterContentInit(): void 
  {
    this.UpdateDriverInformation()
  }

  UpdateDriverInformation()
  {
    this.drivers = []

    for(var drN in this.developertags)
    {
      this.drivers.push(drN)
    }

  }

  UpdateTagInformation(event:any)
  {
    this.pagechanged.emit()
    this.tagnames = []
    var driverselected = (<HTMLInputElement>event.target).innerHTML
    this.structure.driverName = driverselected
    for(var i =0; i< this.developertags[driverselected].length; i++)
    {
      this.tagnames.push(this.developertags[driverselected][i])
    }
    this.tagnames.push("commstatus")
    this.tagnames.push("lastupdate")
  }

  UpdateTagName(event:any)
  {
    this.pagechanged.emit()
    this.structure.tagName = (<HTMLInputElement>event.target).innerHTML
  }

  AddEntry()
  {
    this.pagechanged.emit()
  }

  updateChild()
  {
    this.pagechanged.emit()
    this.structure["componentType"] = "borehole_pump"
    this.structure["values"] = []

    if(this.structure.description == undefined || this.structure.description == "")
    {
      this.structure["description"] = "No Name"
    }

    this.updatechild.emit(this.structure)
  }
}
