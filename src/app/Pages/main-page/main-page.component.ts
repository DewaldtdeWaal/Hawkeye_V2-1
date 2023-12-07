import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @Input() links:any=[];
  @Output() pagechanged = new EventEmitter<{newpagename:"",sitename:""}>;
  // {pagetext: "Greenbushes",pagelink:"/page"}

  constructor()
  {
  }

  linkClick(eventData:Event)
  {
    if(eventData.target!=null)
    {
      var elementHTML = (<HTMLInputElement>eventData.target).innerHTML

      for(var i = 0; i < this.links.length; i++)
      {
        if(this.links[i].pagename == elementHTML)
        {
          this.pagechanged.emit(this.links[i])
        }
      }
    }
  }
}
