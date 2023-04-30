import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlaceService } from 'src/app/place.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit {
  selectedPlace:Place;
  constructor(private activeRoute:ActivatedRoute,
    private placeService:PlaceService,
    private navController:NavController) { }

  ngOnInit() {
  //   this.activeRoute.paramMap.subscribe(parmMap=>{

  //     if(!parmMap.has('placeId')){
  //       return
  //     // this.navController.navigateBack('/places/tabs/offers')
  //     }
    //    this.selectedPlace = 
    //    this.placeService.getSelectedplace(parmMap.get('placeId'))
    //    console.log(this.selectedPlace);
    //  })
  }
  }
  

