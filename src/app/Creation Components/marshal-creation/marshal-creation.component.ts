import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-marshal-creation',
  templateUrl: './marshal-creation.component.html',
  styleUrls: ['./marshal-creation.component.css']
})
export class MarshalCreationComponent {
  @Output() pagechanged = new EventEmitter<any>()
  @Output() updatechild = new EventEmitter<any>()
  @Input() structure:any = {}
  @Input() developertags = {}
  drivers:any = []
  tagnames:any = []

  PageChanged()
  {
    this.pagechanged.emit()
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

  updateChild()
  {
    this.pagechanged.emit()
    // var Dex:String = this.structure["useIcon"]
    // if(Dex.toLowerCase() == "true")
    //   this.structure["useIcon"] = true
    // else
    //   this.structure["useIcon"] = false

    this.structure["componentType"] = "marshal"
    this.structure["value"] = ""

    if(this.structure.description == undefined || this.structure.description == "")
    {
      this.structure["description"] = "No Name"
    }

    this.updatechild.emit(this.structure)
  }
}
