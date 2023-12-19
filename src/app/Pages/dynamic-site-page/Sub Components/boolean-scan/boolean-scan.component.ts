import { Component, Input, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-boolean-scan',
  templateUrl: './boolean-scan.component.html',
  styleUrls: ['./boolean-scan.component.css']
})
export class BooleanScanComponent implements AfterContentInit, OnChanges {
  @Input() structure:any = {
    "componentType": "",
    "driverName": "",
    "description": "",
    "tagName": "",
    "useIcon": false,
    "trueResponse": "",
    "falseResponse": "",
    "value" : ""
  }

  iconsize = 20;

  ngAfterContentInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  GetDisplayValue()
  {
    var valy:any = this.structure.value
    if(valy == 0)
    {
      return this.structure.description + ": " + this.structure.falseResponse
    }
    else if(valy == 1)
    {
      return this.structure.description + ": " + this.structure.trueResponse
    }
    else
    {
      return this.structure.description + ": "
    }
  }

  GetValue()
  {
    var valy:any = this.structure.value
    if(valy == 0)
    {
      return false
    }
    return true;
  }

}
