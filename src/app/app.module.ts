import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { UpperHomeComponent } from './home/upper-home/upper-home.component';
import { LowerHomeComponent } from './home/lower-home/lower-home.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { CreateComponent } from './create/create.component';
import { RandomComponent } from './random/random.component';
import { NoteComponent } from './shared/note/note.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Account", component: AccountComponent},
  {path: "Notes", component: NotesComponent},
  {path: "Create", component: CreateComponent},
  {path: "Random", component: RandomComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    UpperHomeComponent,
    LowerHomeComponent,
    HeaderComponent,
    HomeComponent,
    AccountComponent,
    NotesComponent,
    CreateComponent,
    RandomComponent,
    NoteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AppComponent,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
