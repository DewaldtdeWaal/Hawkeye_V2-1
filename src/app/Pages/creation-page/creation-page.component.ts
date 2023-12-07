import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-creation-page',
  templateUrl: './creation-page.component.html',
  styleUrls: ['./creation-page.component.css']
})
export class CreationPageComponent implements OnChanges {
  @Input() structure:any = null;
  @Input() developertags:any = null;
  @Input() disabled:any = false;
  @Input() customers:any = []
  @Output() pagechanged = new EventEmitter<any>();
  component:any = "page"
  componentList:any = []


  ngOnChanges(changes: SimpleChanges): void {
    if(this.disabled)
    {
      this.component = "page"
    }
  }

  GetComponentList(event:any)
  {
    this.componentList = ["page"]
    this.GetComponents(this.structure)
  }

  GetComponents(obj:any)
  {
    if(obj.components != undefined)
    {
      for(var i = 0;i < obj.components.length;i++)
      {
        this.GetComponents(obj.components[i])
      }
      if(obj.description)
        this.componentList.push(obj.description)
    }
  }

  ShiftSelectionLeft()
  {
    var index = this.IndexOfSelectedChild()

    if(index > 0)
    {
      [this.structure.components[index], this.structure.components[index-1]] = [this.structure.components[index-1],this.structure.components[index]]
    }
    this.pagechanged.emit();
  }

  ShiftSelectionRight()
  {
    var index = this.IndexOfSelectedChild()

    if(index < this.structure.components.length - 1)
    {
      [this.structure.components[index], this.structure.components[index+1]] = [this.structure.components[index+1],this.structure.components[index]]
    }
    this.pagechanged.emit();
  }

  DeleteSelection()
  {
    var index = this.IndexOfSelectedChild()
    this.structure.components.splice(index,1)
    this.component = "page"
    this.pagechanged.emit();
  }

  IndexOfSelectedChild()
  {
    var index = -1
    for(var i =0; i < this.structure.components.length; i++)
    {
      if(this.structure.components[i].description == this.component)
      {
        index = i
      }
    }
    return index
  }

  SetParent(event:any)
  {
    this.component = event//(<HTMLInputElement>event.target).innerHTML
  }

  updateroot(event:any)
  {
    
    if(event.containername != undefined)
    {
      if(this.structure.components == undefined)
      {
        this.structure["components"] = []
        this.pagechanged.emit()
      }

      var existingIndex = -1

      for(var i = 0; i < this.structure.components.length; i++)
      {
        if(this.structure.components[i].description == event.containername)
          existingIndex = i
      }

      if(existingIndex == -1)
      {
        this.structure["components"].push({componentType:"container",description:event.containername, components:[]})
        this.pagechanged.emit()
      }
        
    }

  }

  PageChanged()
  {
    this.pagechanged.emit()
  }



}
