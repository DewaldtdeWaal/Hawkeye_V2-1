// MapComponent ts

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-property-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  ngOnInit() {
    this.initMap();
  }

  property : any;
 
  
  constructor( ){}
  async initMap() {
    const  Map  = await google.maps.importLibrary("maps");

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 10,
      center: { lat:-33.95719133500393,  lng: 25.600222789050612 },
       mapId: '4504f8b37365c3d0',
    });

    for (const property of this.properties) {
      const marker = new google.maps.Marker({
        map,
        position: property.position,
        title: property.description,
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        this.toggleHighlight(marker, property);
      });
    }
  }

  toggleHighlight(marker: google.maps.Marker, property: any) {
    if (marker.getZIndex() === 1) {
      marker.setZIndex(null);
      // Remove the highlight class or handle it based on your CSS classes
    } else {
      marker.setZIndex(1);
      // Add the highlight class or handle it based on your CSS classes
    }
  }
  
   
    
    buildContent(property: any) {
     const content = document.createElement("div");

      if(property && typeof property === "object") {
     content.classList.add("property");
      }
    content.innerHTML = `<div class="icon">
    <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
    <span class="fa-sr-only">${property.type}</span>
    </div>
    <div class="details">
        <div class="address">${property.address}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
            <span class="fa-sr-only">size</span>
            <span>${property.size} ft<sup>2</sup></span>
        </div>
        </div>
    </div>
`
      
    return content;
  }

  infowindow = new google.maps.InfoWindow({
    content: this.buildContent(this.property),
  });

  properties = [{
    address: 'Allister Miller Dr, Walmer, Gqeberha, 6070',
    description: 'Airport Reservoir',
    type: 'building',
    size: 300,
    position: {
      lat: -33.9864000933515, 
      lng: 25.61399429260211,
    },
  }, {
    address: 'Daniel Pienaar St, Gqeberha',
    description: 'Motherwell Pumpstation & Reservoir',
    type: 'Pumpstation & Reservoir',
    size: 200,
    position: {
      lat: -33.77932786183001,
      lng:  25.55893245365766,
    },
  },
  {
    address: '80 Stanford Rd, Korsten, Gqeberha, 6020',
    description: 'Stanford Pumpstation',
    type: 'Pumpstation',
    size: 800,
    position: {
      lat: -33.92960992629553, 
      lng: 25.5768165,
    },
  }, {
    address: '99 Welcome Ave, Theescombe, Gqeberha, 6070',
    description: ' Theescombe Pumpstation',
    type: 'Pumpstation',
    size: 210,
    position: {
      lat: -33.980546165316866, 
      lng: 25.484246020193105,
    },
  }, {
    address: '1 Malta Rd, Glendinningvale, Gqeberha, 6001',
    description: 'Glendinningvale Pumpstation',
    type: 'Pumpstation',
    size: 200,
    position: {
      lat: -33.9546026071499, 
      lng: 25.593220323564747,
    },
  }, {
    address: 'rivier, Gamtoos River St, Vanderbijlpark, 1911',
    description: 'Gamtoos Bridge',
    type: 'Bridge',
    size: 700,
    position: {
      lat: -33.934361957023526, 
      lng: 25.018048224829915
    },
  }, {
    address: '7 Ivana Dr, Framesby, Gqeberha, 6045',
    description: 'Linton Waterworks',
    type: 'waterworks',
    size: 600,
    position: {
      lat: -33.94535996595254, 
      lng: 25.51529579784432
    },
  }, {
    address: 'Farms Port Elizabeth, Gqeberha, 6018',
    description: 'Sea View Water Pumpstaion',
    type: 'Pumpstation',
    size: 100,
    position: {
      lat: -33.99744020263713, 
      lng: 25.362704799343913
    },
  }];


  


}

