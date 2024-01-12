import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements AfterContentInit, OnChanges {
  
  constructor() { }

  @Input() userdata:any = {}
  @Input() pages:any = null
  index = 0
 

  display : any;
  center: google.maps.LatLngLiteral = {lat: -33.779104947067, lng: 25.558868084657444};
  zoom = 15;

  ngAfterContentInit(): void {
      console.log(this.userdata)
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
      console.log(this.userdata.pages)
  }
 
}
