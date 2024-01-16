
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
  zoom = 8;
  markers: google.maps.MarkerOptions[] = [];
  infoWindow = new google.maps.InfoWindow();

  ngAfterContentInit(): void {
      console.log(this.userdata)
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
      console.log(this.userdata.pages)

      let pagesWithGis = this.userdata.pages.filter(page => {
        return page.gis != null;
      });

      console.log(pagesWithGis)

      for(let i = 0; i < pagesWithGis.length; i++){

        let pageName = pagesWithGis[i].pageName;
        console.log(pageName)
        let type = pagesWithGis[i].gis.type;
        console.log(type)
        let longitude = pagesWithGis[i].gis.longitude;
        console.log(longitude)
        let latitude = pagesWithGis[i].gis.latitude;
        console.log(latitude)

        this.addMarker({
          position: {lat: latitude, lng: longitude}, 
          title: pageName
        });

        }

      }

      addMarker(marker: google.maps.MarkerOptions) {
        this.markers.push(marker);
        
      }

  }
 
 