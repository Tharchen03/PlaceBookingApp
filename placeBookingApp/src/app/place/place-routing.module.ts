import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacePage } from './place.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full',
  },
  {
 path:'tabs',
 component:PlacePage,
 children:[
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full',
  },
      {
        path: 'discover',
        children:[
          {
            path: '',
            loadChildren: ()=> import('./discover/discover.module').then(m =>m.DiscoverPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./discover/placedetails/placedetails.module').then(m =>m.PlacedetailsPageModule)
          },
        ]
      },
    
  
    {
        path:'offers',
        children:[
          {
            path: '',
            loadChildren: () => import('./offers/offers.module').then(m =>m.OffersPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./offers/new-offer/new-offer.module').then(m =>m.NewOfferPageModule)
          },
          {
            path: 'edit/:placedId',
            loadChildren: () => import('./offers/edit-offer/edit-offer.module').then(m =>m.EditOfferPageModule)
          },
          {
            path: ':placedId',
            loadChildren: () => import('./offers/offer-booking/offer-booking.module').then(m =>m.OfferBookingPageModule)
          },
        ] 
    }
      
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacePageRoutingModule {}
