import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingsService } from 'src/app/bookings/bookings.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { PlaceService } from 'src/app/place.service';
import { Place } from '../../place.model';


@Component({
  selector: 'app-placedetails',
  templateUrl: './placedetails.page.html',
  styleUrls: ['./placedetails.page.scss'],
})
export class PlacedetailsPage implements OnInit {
  selectedPlace: Place;
  isBooable= false;
  isloading: boolean;
  private placeSub: Subscription;

  constructor(private activateRoute:ActivatedRoute,
    private placeService:PlaceService,
    private navController:NavController,
    private actionSheetController:ActionSheetController,
    private route:ActivatedRoute,
    private modalCtrl: ModalController,
    private actionSheetCtrl:ActionSheetController,
    private bookingService:BookingsService,
    private loadingCtrl:LoadingController,
    private authService:AuthService,
    private alertCtrl: AlertController,
    private router:Router
    ) { }

  ngOnInit() {
    //console.log(this.activateRoute.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe(parmMap=>{
     if(!parmMap.has('placeId')){
      this.navController.navigateBack('/places/tabs/offers')
      return;
     }
     this.isloading = true;
     this.placeSub = this.placeService
     .getPlace(parmMap.get('placeId'))
     .subscribe(
      place =>{
        this.selectedPlace = place;
        this.isBooable = place.userId === 'abc';
        this.isloading = false;
      },
      error =>{
        this.alertCtrl
        .create({
          header: 'An error occured',
          message: 'Could not load place',
          buttons: [
            {
              text: 'Okay',
              handler: ()=>{
                this.router.navigate(['/places/tabs/discover']);
              }
            }
          ]
        })
        .then(alertEl => alertEl.present());
      } 
     )
    // this.selectedPlace = 
    // this.placeService.getSelectedplace(parmMap.get('placeId'))
    // console.log(this.selectedPlace);
  })
     }
     goToDiscover(){
      this.navController.navigateBack('/places/tabs/offers')
    }
      bookPlace(){
        this.actionSheetController.create({
          header: 'Book your Place',
          buttons:[
            {
              text: 'select slot',
              handler:()=>{
                this.openBookingModal();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }]
        }).then(actionSheet=>{
          actionSheet.present();
        })
      }
      openBookingModal(){
        this.modalCtrl
        .create({
          component: CreateBookingComponent,
          componentProps: { selectedPlace: this.selectedPlace}
        })
        .then(ModalEl=>{
          ModalEl.present();
          return ModalEl.onDidDismiss();
          
        }).then(data=>{
          // console.log(data);
          // console.log(this.selectedPlace)
          if(data.role === 'confirm'){
            this.loadingCtrl
            .create({ message: 'Booking place...'})
            .then(loadingEl =>{
              loadingEl.present();
              const resData = data.data.bookingData;
              console.log(resData);
              
              this.bookingService
              .addBooking(
                this.selectedPlace.id,
                this.selectedPlace.title,
                this.selectedPlace.imageUrl,
                resData.firstname,
                resData.lasttname,
                resData.guestnumber,
                resData.startDate,
                resData.endDate,
              )
              .subscribe(() =>{
                loadingEl.dismiss();
              });
            });
          }
        })
      }
      ngOnDestroy(){
        if(this.placeSub){
          this.placeSub.unsubscribe();
        }
      }
    }

