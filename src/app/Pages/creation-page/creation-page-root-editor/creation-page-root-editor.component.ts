import { Component, Output, EventEmitter, ViewChild, Input, AfterContentInit } from '@angular/core';

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
heirarchyitem:any = ""
@Input() customers = []

ngAfterContentInit(): void {
  // for(var x of this.structure.page)
  
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

HeirarchyItemSelected(item)
{
  this.heirarchyitem = item
}

HeirarchyAddItem()
{
  this.pagechanged.emit();
  if(this.structure.pageheirarchy.filter((value)=>
  {
    return value == this.heirarchyitem 
  }).length == 0)
  {
    this.structure.pageheirarchy.push(this.heirarchyitem)
  }
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
    this.structure.pageheirarchy.splice(index,1)
  }
}

CustomerItemSelected(item)
{
  this.structure.customer = item
  this.PageChanged()
}

}
