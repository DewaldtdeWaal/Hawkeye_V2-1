import { Component, Output, EventEmitter, ViewChild, Input, AfterContentInit } from '@angular/core';
import { HeirarchyEditor } from 'src/app/heirarchy-editor.service';

@Component({
  selector: 'app-creation-page-root-editor',
  templateUrl: './creation-page-root-editor.component.html',
  styleUrls: ['./creation-page-root-editor.component.css']
})
export class CreationPageRootEditorComponent implements AfterContentInit {
@Output() updateroot = new EventEmitter<any>();
@Output() uploadpage = new EventEmitter<any>();
@Output() pagechanged = new EventEmitter<any>();
@ViewChild('pagebox') pagebox:any;
@ViewChild('containerbox') containerbox:any;
@Input() structure:any;
@Input() heirarchystructure:any = {}
heirarchyitem:any = ""
@Input() customers = []
nextitems:any = []

ngAfterContentInit(): void {
  // for(var x of this.structure.page)
  
}

constructor(private heirarchy: HeirarchyEditor)
{

}

GetCustomer()
{

  if(!this.structure.customer || this.structure.customer == "")
  {
    if(this.customers.length > 0)
    {
      this.structure.customer = this.customers[0]
    }
  }

  return this.structure.customer
}

PageChanged()
{
  this.pagechanged.emit();
}

AddContainer(event:Event)
{

  this.pagechanged.emit();
  var output 

  if(this.containerbox.nativeElement.value != undefined && this.containerbox.nativeElement.value != "")
    output = {containername:this.containerbox.nativeElement.value}


  this.updateroot.emit(output)
}

UploadPage()
{
  this.uploadpage.emit({uploadpage:true})
}

GetHeirarchyItems()
{
  this.PageHeirarchyExists()
  
  this.nextitems = []
  //Here
  if(this.structure != undefined && this.structure.pageheirarchy != undefined)
  {
    var pgheir = JSON.parse(JSON.stringify(this.structure.pageheirarchy))
    pgheir.splice(0,0,this.GetCustomer())
  
    this.nextitems = this.heirarchy.GetLevelObjects(this.heirarchystructure,pgheir,0)
  }
}

HeirarchyItemSelected(item)
{
  this.heirarchyitem = item
}

SelectExistingHeirarchyItem(name)
{
  this.pagechanged.emit();

  if(name && name != "")
  {
    if(this.structure.pageheirarchy == undefined)
    {
      this.structure.pageheirarchy = []
    }
    this.structure.pageheirarchy.push(name)
  }
}

PageHeirarchyExists()
{
  if(this.structure.pageheirarchy == undefined)
  {
    this.structure.pageheirarchy = []
  }
}

HeirarchyAddItem()
{
  this.pagechanged.emit();

  this.PageHeirarchyExists()

  if(this.structure.pageheirarchy.filter((value)=>
  {
    return value == this.heirarchyitem 
  }).length == 0)
  {
    this.structure.pageheirarchy.push(this.heirarchyitem)
  }
  this.heirarchyitem = ""
}

HeirarchyRemoveItem()
{
  this.pagechanged.emit();
  var index = -1
  for(var i = 0; i < this.structure.pageheirarchy.length; i++)
  {
    if(this.structure.pageheirarchy[i]== this.heirarchyitem)
    {
      index = i
      break
    }
  }

  if(index > -1)
  {
    var removecount = this.structure.pageheirarchy.length - (index)
    this.structure.pageheirarchy.splice(index, removecount)
  }
  this.heirarchyitem = ""
}

CustomerItemSelected(item)
{
  this.structure.customer = item
  this.PageChanged()
}

}
