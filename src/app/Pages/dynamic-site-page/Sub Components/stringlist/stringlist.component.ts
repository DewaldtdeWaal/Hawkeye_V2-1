import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stringlist',
  templateUrl: './stringlist.component.html',
  styleUrls: ['./stringlist.component.css']
})
export class StringlistComponent {
  @Input() structure:any = {}

  ngOnChanges(): void {
    
  }

  GetDisplayValue()
  {
    var stringval = ""
    
    if(this.structure.descriptions != undefined && this.structure.componentType == 'marshal')
    {
      var testvalue = this.structure.value
      var bitposition = -1
      while(true)
      {
        if(testvalue == 0)
        {
          break;
        }
  
        if(testvalue > 0 )
        {
          bitposition += 1
          testvalue >>= 1
        }
  
      }

      stringval = this.structure.descriptions[bitposition]
    }

    if(this.structure.descriptions != undefined && this.structure.componentType == 'stringlist')
    {
      stringval = this.structure.descriptions[this.structure.value]
    }

    return this.structure.description + ": " + stringval
  }
}
