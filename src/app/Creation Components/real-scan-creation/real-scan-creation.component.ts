import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-real-scan-creation',
  templateUrl: './real-scan-creation.component.html',
  styleUrls: ['./real-scan-creation.component.css']
})
export class RealScanCreationComponent {
  @Output() pagechanged = new EventEmitter<any>();
  @Input() structure:any = null
  @Input() developertags:any = null;
  @Output() updatechild = new EventEmitter<any>();
  drivers:any = []
  tagnames:any = []

  ngAfterContentInit(): void 
  {
    this.UpdateDriverInformation()
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
    var Dex:any = this.structure["useUnit"]
    if(Dex != true && Dex != false)
    {
      if(Dex.toLowerCase() == "true")
        this.structure["useUnit"] = true
      else
        this.structure["useUnit"] = false
    }
    else
    {
      this.structure["useUnit"] = Dex
    }
    
    if(this.structure.description == undefined || this.structure.description == "")
    {
      this.structure["description"] = "No Name"
    }

    this.structure["componentType"] = "real_scan"
    this.structure["value"] = 0
    this.updatechild.emit(this.structure)
  }
}
