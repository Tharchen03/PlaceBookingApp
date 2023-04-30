import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';
import { map, take, switchMap, tap} from 'rxjs/operators';

interface BookingData{
  bookedFrom:string;
  bookedTo:string;
  firstName:string;
  guestNumber:number;
  lastName:string;
  placeId: string;
  placeImage:string;
  placeTitle:string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

      private _bookings = new BehaviorSubject<Booking[]>([]);
      get bookings(){
        return this._bookings.asObservable();
      }

      constructor(private authService:AuthService, 
        private http:HttpClient) { }
            addBooking(
              placeId: string,
              placeTitle:string,
              placeImage:string,
              firstName:string,
              lastName:string,
              guestnumber:number,
              dateFrom:Date,
              dateTo:Date,
            ){
        let generatedId: string;
        const newBooking = new Booking(
          Math.random().toString(),
          placeId,
          'abc',
          placeTitle,
          placeImage,
          firstName,
          lastName,
          guestnumber,
          dateFrom,
          dateTo
        );
        return this.http
        .post<{name: string}>(
          'https://placebookingapp-d85b6-default-rtdb.firebaseio.com/bookings.json',
          {...newBooking, id:null}
        )
        .pipe(
          switchMap(resData =>{
            generatedId = resData.name;
            return this.bookings;
          }),
          take(1),
          tap(bookings =>{
            newBooking.id =generatedId;
            this._bookings.next(bookings.concat(newBooking))
          })
        );
      }
      cancelBooking(bookingId: string){
        return this.http
        .delete(
          `https://placebookingapp-d85b6-default-rtdb.firebaseio.com/${bookingId}.json`
        )
        .pipe(
          switchMap(()=>{
            return this.bookings;
          }),
          take(1),
          tap(bookings =>{
            this._bookings.next(bookings.filter(b => b.id!== bookingId));
          })
        );
      }
      fetchBookings(){
        return this.http
        .get<{[Key:string]:BookingData}>(
          `https://placebookingapp-d85b6-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="abc"`
        )
        .pipe(
          map(bookingData =>{
            
            console.log(bookingData);
            const bookings =[];
            for (const key in bookingData){
              if(bookingData.hasOwnProperty(key)){
                bookings.push(
                  new Booking(
                    key,
                    bookingData[key].placeId,
                    bookingData[key].userId,
                    bookingData[key].placeTitle,
                    bookingData[key].placeImage,
                    bookingData[key].firstName,
                    bookingData[key].lastName,
                    bookingData[key].guestNumber,
                    new Date(bookingData[key].bookedFrom),
                    new Date(bookingData[key].bookedTo)
                  )
                )
              }
            }
            return bookings;
          }),
          tap(bookings =>{
            this._bookings.next(bookings);
          })
        );
      }
  }










  
// private _bookings: Booking[] =[
//   {
//     id: 'xyz',
//     placeId: 'p1',
//     userId: 'abc',
//     placeTitle: 'Thimphu',
//     guestNumber: 2,
//   },
//   {
//     id:'xyz',
//     placeId:'p2',
//     userId:'abc',
//     placeTitle:'Paro',
//     guestNumber: 2,
//   }
// ];
//   constructor() { }
//   get bookings(){
//     return this._bookings;
    
//   }
//   getSelectedplace(placeId:string){
//     return this.bookings.find(eachPlace=>{
//     return eachPlace.id === placeId;
//     })
//   }
