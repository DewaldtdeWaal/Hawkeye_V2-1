import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css']
})
export class TagEditorComponent implements OnChanges {
  @Output() datasaved = new EventEmitter<any>();
  @Output() datachanged = new EventEmitter<any>();
  @Input() tagdata:any =null;
  items:any  = []
  types:any = ["BOOL","REAL","INT","FLOAT","UDINT","UINT","DINT","MARSHAL","STRING_LIST"]
  cansave:any = false;
  currentDesc:any = ""

  ngOnChanges(changes: SimpleChanges): void {
    this.GetConnections()
  }

  UpdateTag()
  {
    for(var i in this.tagdata)
    {
      if((this.tagdata.typeDropDownValue == 'BOOL' || this.tagdata.typeDropDownValue == 'STRING_LIST' || this.tagdata.typeDropDownValue == 'MARSHAL') && (i == "unit" || i == "scaling"))
        delete this.tagdata[i];

      if((this.tagdata.typeDropDownValue != 'FLOAT' && this.tagdata.typeDropDownValue != 'UDINT' && this.tagdata.typeDropDownValue != 'DINT' && this.tagdata.typeDropDownValue != 'REAL')&& (i == "word_swap_control"))
        delete this.tagdata[i];

      if((this.tagdata.typeDropDownValue != 'STRING_LIST' && this.tagdata.typeDropDownValue != 'MARSHAL')&& (i == "descriptions"))
        delete this.tagdata[i];

      if(!this.tagdata['trend_control'] && (i == "tagdata.periodDropDownValue"))
       delete this.tagdata[i];
        
    }
    this.datasaved.emit();
  }

  TagChanged(anything?:any)
  {
    this.datachanged.emit();
    this.cansave = true
    return anything
  }

  GetConnections()
  {
    this.items = []
    for(var key in this.tagdata)
    {
      this.items.push(key)
    }
  }

  GetBoolean(strBool:any)
  {
    this.TagChanged() 
    return strBool == 'true' ? true:false;
  }

  GetElementValue(event:any)
  {
    this.TagChanged()
    return (<HTMLInputElement>event.target).value
  }

  UpdateDescriptions()
  {
    var descArr:any = []

    for(var x in this.tagdata.descriptions)
      descArr.push( x.toString() + " : " + this.tagdata.descriptions[x]  )

    return descArr
  }

  AddDescription()
  {
    if(this.tagdata["descriptions"] == undefined)
    {
      this.tagdata.descriptions = {}
    }
    
    var itemCount = 0;
    var contains = false;

    for(var x in this.tagdata.descriptions)
    {
      if(this.tagdata.descriptions[x] == this.currentDesc)
        contains = true
      itemCount += 1
    }

    if(!contains)
      this.tagdata.descriptions[itemCount] = this.currentDesc

    this.UpdateDescriptions()
  }

  RemoveDescription()
  {

    var location:any = ""
    
    for(var x in this.tagdata.descriptions)
    {
      if(this.tagdata.descriptions[x] == this.currentDesc)
        location = x
    }

    delete this.tagdata.descriptions[location]

    this.UpdateDescriptions()
  }
  SUDescription()
  {
    
    this.UpdateDescriptions()
  }
  SDDescription()
  {
    
    this.UpdateDescriptions()
  }
}
