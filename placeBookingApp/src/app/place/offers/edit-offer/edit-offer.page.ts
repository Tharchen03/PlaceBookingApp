import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/place.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
place: Place;
form: FormGroup;
isloading:boolean=true;
private placesSub :Subscription;
placeId:string='';
  constructor(private route: ActivatedRoute,
    private placeService:PlaceService,
    private navCtrl: NavController,
    private router:Router,
    private LoadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    ) { }

  ngOnInit() {

      this.isloading = true;
      this.route.paramMap.subscribe(paramMap =>{
        if(!paramMap.has('placedId')){
          this.navCtrl.navigateBack('/places/tabs/offers');
          return;
        }
        this.placeId = paramMap.get('placedId');
        
        this.placesSub = this.placeService
        .getPlace(this.placeId)
        .subscribe(
          place =>{
            this.place= place;
            const title = this.place.title;
            const description = this.place.description
            this.form = new FormGroup({
              title: new FormControl(this.place.title,{
                updateOn:'blur',
                validators: [Validators.required]
              }),
              description: new FormControl(this.place.description,{
                updateOn:'blur',
                validators:[Validators.required, Validators.maxLength(180)]
                })
              });
                  
                this.isloading = false;
              },
              error =>{
                this.alertCtrl
                .create({
                  header: 'An error occered',
                  message: 'Place could not be fetched. Pleace try again later.',
                  buttons: [
                    {
                      text: 'Okey',
                      handler: ()=>{
                        this.router.navigate(['/places/tabs/offers']);
                      }
                    }
                  ]
                })
                .then(alertEl =>{
                  alertEl.present();
                  this.placeService
                });
              }
            );
          });    
        } 
      // this.place = this.placeService.getSelectedplace(paramMap.get('placedId'))
      
        onUpdateOffer(){
          if(!this.form.valid){
            return;
          }
          // console.log(this.form.value);
          this.LoadingCtrl
          .create({
            message: 'updating place...'
          })
          .then(loadingEl =>{
            loadingEl.present();
            this.placeService
            .updatePlace(
              this.place.id,
              this.form.value.title,
              this.form.value.description,
            )
            .subscribe(()=>{
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/places/tabs/offers']);
          })
        })
     }
  }