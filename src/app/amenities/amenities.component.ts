import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {

  amenitiesList = ['3 Car Garage Parking',
    'Outdoor Back Patio',
    'High Ceilings',
    'Lots of Light',
    'Corner Unit',
    'Close to Restaurants',
    'Close to Shopping',
    'Stainless Appliances',
    'Stone Countertops',
    'Private Patio',
    'Near Public Transport',
    'Loft',
    'Walk-in Shower',
    'Excellent Location'];
    
  constructor() { }

  ngOnInit() {
  }

}
