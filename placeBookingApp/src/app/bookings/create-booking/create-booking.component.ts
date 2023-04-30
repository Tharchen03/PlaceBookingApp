import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/place/place.model';


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

@Input() selectedPlace:Place;
@ViewChild('f') from:NgForm;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}
  onCancel(){
    this.modalCtrl.dismiss('user cancelled','cancel');
  }
  onBookPlace(){
    
  if(!this.from.valid || !this.datesValid){
    return;
  }
  this.modalCtrl.dismiss(
    {
    bookingData:{
      firstname: this.from.value['first-name'],
      lasttname: this.from.value['last-name'],
      guestnumber: this.from.value['guest-number'],
      startDate: new Date(this.from.value['date-from']),
      endDate:  new Date(this.from.value['date-to']),
    }
  },
  'confirm'
  );
}
datesValid(){
  const startDate = new Date(this.from.value['date-from']);
  const endDate = new Date(this.from.value['date-to']);
  return endDate > startDate;
}
}
