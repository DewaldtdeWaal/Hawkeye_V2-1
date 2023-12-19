import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chart-creation',
  templateUrl: './chart-creation.component.html',
  styleUrls: ['./chart-creation.component.css']
})
export class ChartCreationComponent implements AfterContentInit {
  @Output() pagechanged = new EventEmitter<any>()
  @Output() updatechild = new EventEmitter<any>();
  @Input() structure:any = null
  @Input() developertags:any = null

  siteitems:any = []
  tagitems:any = []
  enableright:any = false
  typeitems:any = ["line","bar"]
  createditems:any = []

  selecteditem:any = ""

  
  selectedsite:any = ""
  selectedtag:any = ""
  alias:any = ""
  selectedtype:any = ""
  currentitemura:any = false

  leftname:any = ""
  rightname:any = ""

  ApplyFRCalculations:any = false;

  ngAfterContentInit(): void {


    if(this.structure.yrightaxisname)
    {
      this.enableright =  true
      this.rightname = this.structure.yrightaxisname
    }

    this.leftname = this.structure.yleftaxisname

    this.UpdateCreatedItems()
  }

  OnTypeItemSelected(typeselected)
  {
    this.selectedtype = typeselected
    this.PageChanged()
  }

  UpdateItems()
  {
    this.siteitems = []
    for(var x in this.developertags)
    {
      this.siteitems.push(x)
    }
    this.UpdateTags()
  }

  UpdateTags()
  {
      this.tagitems = this.developertags[this.selectedsite]
  }

  OnTagItemSelected(tagselected)
  {
    this.selectedtag = tagselected
    this.PageChanged()
  }

  OnSiteItemSelected(siteselected)
  {
    this.selectedsite = siteselected
    this.PageChanged()
  }

  PageChanged()
  {
    this.pagechanged.emit();
  }

  updateChild()
  {
    this.pagechanged.emit();
    
    
    this.structure.yleftaxisname = this.leftname
    if(this.enableright)
      this.structure.yrightaxisname =  this.rightname

    if(this.structure.description == undefined || this.structure.description == "")
    {
      this.structure["description"] = "No Name"
    }

    this.structure["componentType"] = "chart"
    for(var i = 0;i < this.structure.trendinformation.length;i++)
    {
      this.structure.trendinformation[i].data = []
    }
    this.updatechild.emit(this.structure)
  }

  AddItem()
  {
    this.PageChanged()
    if(!this.structure.trendinformation)
      this.structure.trendinformation = []
  
    if(this.alias != undefined && this.alias != "")
    {
      var exists = this.structure.trendinformation.filter((item) => { 

                                                                      if(this.alias == item.name)
                                                                      {
                                                                        return true
                                                                      }
                                                                      return false
                                                                    } ).length > 0 

      var newItem:any = {}
      newItem.sitename = this.selectedsite
      newItem.tagname = this.selectedtag
      newItem.type = this.selectedtype
      newItem.smooth = true
      newItem.showSymbol = false
      newItem.name = this.alias
      newItem.yAxisIndex = this.currentitemura == true ? 1:0
      newItem.data = []
      newItem.ApplyFlowRateCalculations = this.ApplyFRCalculations

      if(exists)
      {
        for(var i = 0;i < this.structure.trendinformation.length; i++)
        {
          if(this.structure.trendinformation[i].name == this.alias)
          {
            this.structure.trendinformation[i] = newItem
            break;
          }
        }
      }
      else
      {
        
        this.structure.trendinformation.push(newItem)
      }
      

      this.UpdateCreatedItems()
    }
  }

  UpdateCreatedItems()
  {
    if(!this.structure.trendinformation)
      this.structure.trendinformation = []


    this.createditems = []
    for(var i = 0;i < this.structure.trendinformation.length; i++)
    {
      this.createditems.push(this.structure.trendinformation[i].name)
    }
  }

  DeleteCreatedItem()
  {
    this.PageChanged()
    if(this.selecteditem)
    {

    var spliceindex = -1

    for(var i = 0;i < this.structure.trendinformation.length; i++)
    {
      if(this.structure.trendinformation[i].name == this.selecteditem)
      {
        spliceindex = i
        break;
      }
    }

    this.structure.trendinformation.splice(spliceindex,1)

    this.selecteditem = null
    }

    this.selectedsite = null
    this.selectedtag = null
    this.selectedtype = null
    this.alias = null
    this.currentitemura = null

    this.UpdateCreatedItems()
  }

  SelectCreatedItem(selection)
  {
    this.PageChanged()
    this.selecteditem = selection

    for(var i = 0;i < this.structure.trendinformation.length; i++)
    {
      if(this.structure.trendinformation[i].name == this.selecteditem)
      {
         this.selectedsite = this.structure.trendinformation[i].sitename
         this.selectedtag = this.structure.trendinformation[i].tagname
         this.selectedtype = this.structure.trendinformation[i].type
         this.alias = this.structure.trendinformation[i].name
         this.currentitemura = this.structure.trendinformation[i].yAxisIndex
         if(this.structure.trendinformation[i].ApplyFlowRateCalculations != undefined)
         {
            this.ApplyFRCalculations = this.structure.trendinformation[i].ApplyFlowRateCalculations
         }
         else
         {
            this.ApplyFRCalculations = false
         }
        break;
      }
    }

    this.UpdateItems()
  }

}