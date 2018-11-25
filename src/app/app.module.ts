import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AgentInfoComponent } from './agent-info/agent-info.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { PropertyMapComponent } from './property-map/property-map.component';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';
import { MatInputModule,
         MatButtonModule,
         MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AgentInfoComponent,
    AmenitiesComponent,
    PropertyMapComponent,
    MortgageCalculatorComponent,
    PropertyDetailsComponent,
    PhotoGalleryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
