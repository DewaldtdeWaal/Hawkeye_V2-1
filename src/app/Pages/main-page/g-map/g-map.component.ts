
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

  highLat = -34
  lowLat = -33
  highLong = 24
  lowLong = 26

  bounds = new google.maps.LatLngBounds();
  

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

        if(latitude > this.highLat)
        {
          this.highLat = latitude;
        }
        if(latitude < this.lowLat)
        {
          this.lowLat = latitude;
        }
        if(longitude > this.highLong)
        {
          this.highLong = longitude;
        }
        if(longitude < this.lowLong)
        {
          this.lowLong = longitude;
        }

        console.log(this.highLat, this.lowLat, this.highLong, this.lowLong)

        this.addMarker
        ({
          position: {lat: latitude, lng: longitude}, 
          title: pageName,
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
        console.log(marker, "marker"),
        this.markers.push(marker);   
        this.bounds.extend(marker.position),

        this.bounds.extend(new google.maps.LatLng(this.highLat, this.highLong));
        this.bounds.extend(new google.maps.LatLng(this.lowLat, this.lowLong));
      }

      infoWinOps(infoWindow: google.maps.InfoWindowOptions)
      {
        this.infoWindow = new google.maps.InfoWindow;
        console.log(infoWindow, "infoWindow")
        this.addInfoWindow();
      }

      addInfoWindow() 
      {
        this.infoWindow.open(this.map);
        console.log(this.infoWindow, "infoWindow2");
      }
    

  }
 
