import { Component, OnInit } from '@angular/core';
import { } from '@google/maps';

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.css']
})
export class PropertyMapComponent implements OnInit {
  map;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  
  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.9001211, lng: -71.2639603},
        zoom: 11.5
    });
  }


}
