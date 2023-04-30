import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacedetailsPageRoutingModule } from './placedetails-routing.module';
import { PlacedetailsPage } from './placedetails.page';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacedetailsPageRoutingModule
  ],
  declarations: [PlacedetailsPage, CreateBookingComponent]
})
export class PlacedetailsPageModule {}
