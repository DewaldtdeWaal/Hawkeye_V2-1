import {  Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-marshal',
  templateUrl: './marshal.component.html',
  styleUrls: ['./marshal.component.css']
})
export class MarshalComponent implements OnChanges {
  @Input() structure:any = {}

  ngOnChanges(): void {
    
  }

  GetDisplayValue()
  {
    var stringval = ""

    

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

    if(this.structure.descriptions != undefined)
    {
      stringval = this.structure.descriptions[bitposition]
    }

    return this.structure.description + ": " + stringval
  }
  
}
