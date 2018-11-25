import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  address = '154 Ipswich Road';
  city = 'Boxford';
  state = 'MA';
  sqft = '2884';
  bedrooms = '4';
  baths = '3.5'
  mlsNumber = 'MLS-55555555';
  lotSize = '4.3';
  type = 'Single Family';
  yearBuilt = '2006';
  heatingCooling = 'Forced Air / Central Air';
  propertyBlob = `Private luxury seven acre estate with 3 bedroom family/guest wing. 
                  Three beautifully finished floors with elevator access.The main floor features a gracious chef's 
                  kitchen with large eating area & upscale appliances. It opens to a screened porch. The impressive, 
                  fireplaced great room offers custom cabinetry, & access to the sweeping deck. The second floor's 
                  luxurious ensuite master bedroom includes a custom designed bath & private balcony. A large 
                  paneled office & another ensuite bedroom plus main laundry complete the second level. The finished 
                  walkout lower level offers a spacious bonus room with adjoining full bath. The guest wing 
                  features a light filled family room, bonus room with kitchenette, 3 bedrooms & 2 baths with separate laundry. 
                  Your family and guests will enjoy outdoor living in this special private retreat which includes a 
                  spectacular infinity pool, large stone patio and outdoor kitchen. 3+2 garages.`;

  constructor() { }

  ngOnInit() {
  }

}
