import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings:Booking[];
  isloading : boolean;
  private bookingSub: Subscription;
 
  constructor(private bookingService:BookingsService,
   private router:Router,
   private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.loadedBookings = this.bookingService.bookings
    this.bookingSub = this.bookingService.bookings.subscribe(bookings =>{
      this.loadedBookings = bookings;
      console.log(this.loadedBookings );
      
    });
    this.isloading = true;
    this.bookingService.fetchBookings().subscribe(() =>{
      this.isloading = false;
    })
  }
  onCancelBooking(bookingId:string,SlidingBooking:IonItemSliding){
    SlidingBooking.close();
    // this.router.navigate(['/','places','bookings',bookingId]);
    // console.log(bookingId,SlidingBooking);
    this.loadingCtrl.create({message : 'cancelling...'}).then(loadingEl =>{
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(()=>{
        loadingEl.dismiss();
      });
    });
  }
  ngOnDestroy(){
    if (this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }
}
