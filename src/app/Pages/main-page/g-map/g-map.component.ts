
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
 
   map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 4
  });
  // map: google.maps.Map;
  display : any;
  center: google.maps.LatLngLiteral = {lat: -33.779104947067, lng: 25.558868084657444};
  zoom = 8;
  markers: google.maps.MarkerOptions[] = [];
  infoWindow = new google.maps.InfoWindow();

  ngAfterContentInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void
   {

      let pagesWithGis = this.userdata.pages.filter(page =>
      {
        return page.gis != null;
      });

      for(let i = 0; i < pagesWithGis.length; i++)
      {

        let pageName = pagesWithGis[i].pageName;
        let type = pagesWithGis[i].gis.type;
        let longitude = pagesWithGis[i].gis.longitude;
        let latitude = pagesWithGis[i].gis.latitude;

        this.addMarker
        ({
          position: {lat: latitude, lng: longitude}, 
          title: pageName
        });

        this.infoWinOps
        ({
          position: {lat: latitude, lng: longitude},
          content: pageName,
        })

        }

      }

      addMarker(marker: google.maps.MarkerOptions)
      {
        console.log(marker, "marker")
        this.markers.push(marker);       
      }

      infoWinOps(infoWindow: google.maps.InfoWindowOptions)
      {
        this.infoWindow = new google.maps.InfoWindow;
        console.log(infoWindow, "infoWindow")
        this.addInfoWindow(this.infoWindow);
      }

      addInfoWindow(infoWindow: google.maps.InfoWindow) 
      {
        this.infoWindow = infoWindow;
        this.infoWindow.open(this.map);
      }
    

  }
 
 