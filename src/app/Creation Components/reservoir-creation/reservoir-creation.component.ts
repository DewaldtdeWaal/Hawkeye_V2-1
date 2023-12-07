import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reservoir-creation',
  templateUrl: './reservoir-creation.component.html',
  styleUrls: ['./reservoir-creation.component.css']
})
export class ReservoirCreationComponent {
  @Output() pagechanged = new EventEmitter<any>()
  @Output() updatechild = new EventEmitter<any>();
  @Input() structure:any = null
  
  @Input() developertags:any = null

  PageChanged()
  {
    this.pagechanged.emit();
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
