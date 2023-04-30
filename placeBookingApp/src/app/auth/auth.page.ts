import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController} from '@ionic/angular';
import { Observable} from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  userName:string='';
  password:string='';
  isLogin: boolean=true;
  isloading: boolean;
  constructor(private authService:AuthService,
   private router:Router,
   private loadingCtrl: LoadingController,
   private alertCtrl: AlertController
 ) { }

  ngOnInit() {
   //console.log(this.authService.checkCredentials('Myname','password'));
  }
  authenticate(email:string, password:string){
    this.isloading = true;
    this.loadingCtrl
    .create({ keyboardClose : true, message: 'logging in...'})
    .then(loadingEl =>{
      loadingEl.present();
      let authObs: Observable<AuthResponseData>;
      if(this.isLogin){
        authObs = this.authService.login(email,password);
      }else{
        authObs = this.authService.signup(email,password);
      }
      authObs.subscribe(
        resData =>{
          console.log(resData);
          this.isloading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');   
        },
        errRes =>{
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not sign you up, please try again';
          if(code === 'EMAIL_EXISTS'){
            message = 'This email address exists already!';
          }else if(code === 'EMAIL_NOT_FOUND'){
            message = 'E-mail address could not be found';
          }else if(code === 'INVALID_PASSWORD'){
            message = 'This password is not correct'
          }
          this.showAlert(message);
        }
      );
    });
  }
  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }
  onSubmit(){
    const email = this.userName;
    const password = this.password;

    this.authenticate(email,password);
  }
  private showAlert(message:string){
    this.alertCtrl
    .create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Okay']
    })
    .then(alertEl => alertEl.present());
  }
}





//login(){
  // console.log( `${this.userName} and ${this.password}`);
   // this.authService.checkCredentials(this.userName,this.password)
   //console.log(this.authService.isCredentialsTrue);
  // this.authService.login();
 //  this.navController.navigateForward('/places/tabs/discover');
// }