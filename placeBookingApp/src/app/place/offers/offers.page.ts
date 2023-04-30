import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/place.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy{
  offers:Place[ ];
  private placesSub: Subscription;
  isloading: boolean;
  constructor(private placeService:PlaceService,
    private router:Router) { }

  placeIndex:number=0;
  
  ngOnInit() {
    // this.offers = this.placeService.allPlaces;
    this.placesSub = this.placeService.places.subscribe(places =>{
      this.offers = places;
    });
    this.placeService.fetchPlace().subscribe(()=>{
      this.isloading = false;
    });

  }
  onEdit(offerId:string,ionItemSliding:IonItemSliding){
    ionItemSliding.close();
    this.router.navigate(['/','places','tabs','offers','edit',offerId]);
    console.log(offerId,ionItemSliding);
  }
  
ngOnDestroy(){
  if(this.placesSub){
    this.placesSub.unsubscribe();
  }
}
} 