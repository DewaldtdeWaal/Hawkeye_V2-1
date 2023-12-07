import { Component, Input, AfterContentInit, HostBinding, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements AfterContentInit {
@Input() structure:any = {
  "componentType": "",
  "description": "",
  "components": []};

private width:any = "350px"

components = {}

constructor(private elref:ElementRef,private renderer: Renderer2)
{
  
}

ngAfterContentInit(): void {
  this.components = this.structure.components
  this.renderer.setStyle(this.elref.nativeElement,'width',this.width)
}

SetWidth(event)
{
  this.renderer.setStyle(this.elref.nativeElement,'width',event)
}

}
