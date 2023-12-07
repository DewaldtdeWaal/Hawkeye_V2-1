import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-string-scan',
  templateUrl: './string-scan.component.html',
  styleUrls: ['./string-scan.component.css']
})
export class StringScanComponent implements AfterContentInit, OnChanges {
  @Input() structure:any = {
    "componentType": "string_scan",
    "driverName": "WBLK_GREEN_RES01",
    "description": "Last Update",
    "tagName": "lastupdate",
    "outputType" : "time",
    "value" : ""}

    value =""

    ngAfterContentInit(): void {
      this.GetValue()
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.GetValue()
    }


    GetValue()
    {
      if(this.structure.outputType != undefined)
      {
        switch(this.structure.outputType.toLowerCase())
        {
          case("time"):
          {
            return new Date(this.structure.value).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})
            break;
          }
          default:
          {
            return this.structure.value
            break;
          }
        }
      }
      else
      {
        return this.structure.value
      }
    }

}
