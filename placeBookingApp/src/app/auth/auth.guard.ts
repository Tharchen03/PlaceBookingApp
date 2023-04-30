import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router) {  }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // if (!this.authService.userIsAuthenticated){
        //   this.router.navigateByUrl('/auth');
        // }
       return this.authService.userIsAuthenticated.pipe(
           take(1),
        switchMap(isAuthenticated =>{
          if(!isAuthenticated){
            return this.authService.autoLogin();
          }
          else{
            return of(isAuthenticated);
          }
        }), 
        tap(isAuthenticated =>{
          if (!isAuthenticated){
            this.router.navigateByUrl('/auth')
          }
        })
       );    
    }
  }
// switchMap(isAuthenticated =>{
//   if(!isAuthenticated){
//    return this.authService.autoLogin();
//   }else{
//    return of(isAuthenticated);
//   }
//  }),
//  tap(isAuthenticated =>{
//    if (!isAuthenticated){
//      this.router.navigateByUrl('/auth');
//    }
//  })
// );
