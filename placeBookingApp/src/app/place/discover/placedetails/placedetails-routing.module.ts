import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacedetailsPage } from './placedetails.page';

const routes: Routes = [
  {
    path: '',
    component: PlacedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacedetailsPageRoutingModule {}
