import { Component, Input, AfterContentInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-creation-page-container-editor',
  templateUrl: './creation-page-container-editor.component.html',
  styleUrls: ['./creation-page-container-editor.component.css']
})
export class CreationPageContainerEditorComponent implements AfterContentInit, OnChanges{
  @Output() pagechanged = new EventEmitter<any>();
  @Input() structure:any = null
  @Input() developertags:any = null;
  @Input() containerdescription:any = null
  containerstructure:any = null
  
  newcomponentstring:any = "New Component"
  components = [this.newcomponentstring]

  selectedChildName:any = ""
  selectedChild:any = null;

  selectedtype:any = ""
  componenttypes:any = []

  editchild:any = false; 

  todisplay:any = ["boolean_scan",
  "real_scan",
  "level_display",
  "string_scan",
  "borehole_pump",
  "reservoir",
  "chart",
  "stringlist"]

  ngAfterContentInit(): void 
  {
    this.UpdateContainerObject()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.UpdateContainerObject()
    this.ResetSelections()
  }

  ShiftSelectionUp()
  {
    var index = this.IndexOfSelectedChild()

    if(index > 0)
    {
      [this.containerstructure.components[index], this.containerstructure.components[index-1]] = [this.containerstructure.components[index-1],this.containerstructure.components[index]]
    }
    this.pagechanged.emit();
  }

  ShiftSelectionDown()
  {
    var index = this.IndexOfSelectedChild()

    if(index < this.containerstructure.components.length - 1)
    {
      [this.containerstructure.components[index], this.containerstructure.components[index+1]] = [this.containerstructure.components[index+1],this.containerstructure.components[index]]
    }
    this.pagechanged.emit();
  }

  DeleteSelection()
  {
    var index = this.IndexOfSelectedChild()
    this.containerstructure.components.splice(index,1)
    this.selectedChildName = this.newcomponentstring
    this.selectedtype = ""
    this.pagechanged.emit();
  }

  IndexOfSelectedChild()
  {
    var index = -1
    for(var i =0; i < this.containerstructure.components.length; i++)
    {
      if(this.containerstructure.components[i].description == this.selectedChildName)
      {
        index = i
      }
    }
    return index
  }

  PageChanged()
  {
    this.pagechanged.emit();
  }

  DeleteCurrentContainer()
  {

    this.pagechanged.emit();
  }

  UpdateContainerObject()
  {
    if(this.containerdescription != "" && this.containerdescription != null)
    {
      if(this.structure != undefined && this.structure != null)
      {
        
        for(var i = 0;i < this.structure.components.length;i++)
        {
          if(this.structure.components[i].description == this.containerdescription)
            this.containerstructure = this.structure.components[i]
        }

        this.UpdateContainerComponents()
      } 
    }
  }

  SelectContainerChild(event:any)
  {
    this.selectedtype = null
    this.editchild = false;
    this.selectedChildName = event//(<HTMLInputElement>event.target).innerHTML

    if(this.selectedChildName != this.newcomponentstring)
    {
      for(var i = 0; i<this.containerstructure.components.length; i++)
      {
        if(this.selectedChildName == this.containerstructure.components[i].description)
        {
          this.selectedChild = this.containerstructure.components[i]
          this.selectedtype = this.selectedChild.componentType
          this.editchild = true
          break;
        }

      }
    }
    else
      this.selectedChild = {}

    if(this.selectedChildName == this.newcomponentstring)
    {
      this.componenttypes = this.todisplay;
    }
    else
    {
      this.componenttypes = []
    }
  }

  SelectComponentType(event:any)
  {
    this.selectedtype = (<HTMLInputElement>event.target).innerHTML
  }

  UpdateContainerComponents()
  {
    this.components = [this.newcomponentstring]

    for(var i = 0;i < this.containerstructure.components.length;i++)
    {
      if(this.containerstructure.components[i].description != undefined)
        this.components.push(this.containerstructure.components[i].description)
    }
  }

  UpdateChild(event:any)
  {
    this.pagechanged.emit();
    var updated:any = false;
    for(var i = 0; i < this.containerstructure.components.length;i++)
    {
      if(this.containerstructure.components[i].description == event.description)
      {
        this.containerstructure.components[i] = event
        updated = true
      }
    }

    if(updated != true)
      this.containerstructure.components.push(event);

    this.ResetSelections()
  }

  ResetSelections()
  {
    this.selectedtype = ""
    this.selectedChildName = ""
    this.editchild = false
  }


}
