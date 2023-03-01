import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostComponent } from './newsfeed/post/post.component';
import { FabComponent } from './newsfeed/fab/fab.component';
import { BottomSheetComponent } from './newsfeed/fab/bottom-sheet/bottom-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsfeedComponent,
    SignUpComponent,
    PostComponent,
    FabComponent,
    BottomSheetComponent,
  ],
  imports: [
    FormsModule,
    MatListModule,
    MatInputModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
