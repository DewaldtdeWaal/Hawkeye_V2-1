import { Component, Input, Output, EventEmitter, AfterContentChecked, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-string-scan-creation',
  templateUrl: './string-scan-creation.component.html',
  styleUrls: ['./string-scan-creation.component.css']
})
export class StringScanCreationComponent implements AfterContentInit, OnChanges {
  @Output() pagechanged = new EventEmitter<any>();
  @Input() structure:any = null
  @Input() developertags:any = null;
  @Output() updatechild = new EventEmitter<any>();
  drivers:any = []
  tagnames:any = []
  outputTypes:any = ["time","string"]
  outputType:any = "string"

  ngAfterContentInit(): void 
  {
    this.UpdateDriverInformation()
    this.UpdateLocalVariables()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.UpdateLocalVariables()
  }

  UpdateLocalVariables()
  {
    if(this.structure.outputType == undefined)
      this.outputType = "string"
    else
      this.outputType = this.structure.outputType
  }

  PageChanged()
  {
    this.pagechanged.emit();
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
    this.pagechanged.emit();
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
    this.pagechanged.emit();
    this.structure.tagName = (<HTMLInputElement>event.target).innerHTML
  }

  updateChild()
  {
    this.pagechanged.emit();
    this.structure["componentType"] = "string_scan"
    this.structure["value"] = ""
    if(this.structure.description == undefined || this.structure.description == "")
    {
      this.structure["description"] = "No Name"
    }
    this.structure.outputType = this.outputType
    this.updatechild.emit(this.structure)
  }

  SetOutputType(outtype)
  {
    this.outputType = outtype
    this.structure.outputType = this.outputType
  }
}
