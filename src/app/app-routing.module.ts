import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: 'channel/:id',
    component: ChannelsComponent,
    children: [{ path: 'dashboard/:id', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
