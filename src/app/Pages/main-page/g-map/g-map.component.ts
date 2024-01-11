import { Component } from '@angular/core';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent {
  constructor() { }

  display : any;
  center: google.maps.LatLngLiteral = {lat: -33.779104947067, lng: 25.558868084657444};
  zoom = 15;
}
