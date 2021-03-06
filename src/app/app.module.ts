import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './services/auth/auth.service';
import { ChannelsComponent } from './channels/channels.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { DialogJoinChannelComponent } from './dialog-join-channel/dialog-join-channel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DialogAddWishComponent } from './dialog-add-wish/dialog-add-wish.component';
import { DialogDeleteChannelComponent } from './dialog-delete-channel/dialog-delete-channel.component';
import { DialogStartComponent } from './dialog-start/dialog-start.component';
import { DialogUserDeleteComponent } from './dialog-user-delete/dialog-user-delete.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { DialogLegalNoticeComponent } from './dialog-legal-notice/dialog-legal-notice.component';
import { DialogDataProtectionComponent } from './dialog-data-protection/dialog-data-protection.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogEditWishComponent } from './dialog-edit-wish/dialog-edit-wish.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ChannelsComponent,
    DialogAddChannelComponent,
    DialogJoinChannelComponent,
    DashboardComponent,
    DialogAddWishComponent,
    DialogDeleteChannelComponent,
    DialogStartComponent,
    DialogUserDeleteComponent,
    MenuBarComponent,
    DialogLegalNoticeComponent,
    DialogDataProtectionComponent,
    DialogEditWishComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressBarModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
