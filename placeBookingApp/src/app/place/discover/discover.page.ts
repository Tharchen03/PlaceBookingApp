import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/place.service';
import { Place } from '../place.model';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy{
  Places:Place[ ];
  private placesSub: Subscription;
  isloading: boolean=true;

  constructor(private placeService:PlaceService) { }
   placeIndex:number=0;

  ngOnInit() {
    this.isloading=true
    this.placesSub = this.placeService.places.subscribe(places=>{
      this.Places = places;
      console.log(this.Places);
      
    });

    this.placeService.fetchPlace().subscribe(()=>{
      this.isloading = false;
    });

    this.placeIndex= 0;
    // this.Places = this.placeService.allPlaces;
    //console.log(this.Places);
    //   setInterval(()=>{
    //     this.placeIndex++;
    //     if(this.placeIndex==this.Places.length){
    //       this.placeIndex=0
    //     }

    //   },3000)
  }
    ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
     }
      
    }
    
  }