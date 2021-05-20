import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillGuestComponent } from 'src/app/pages/guest/bill-guest/bill-guest.component';
import { DashboardGuestComponent } from 'src/app/pages/guest/dashboard-guest/dashboard-guest.component';

import { GuestComponent } from './guest.component';

const routes: Routes = [{
  path: '',
  component: GuestComponent,
  children: [
    { path: 'home', component: DashboardGuestComponent },
    { path: 'bill', component: BillGuestComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
