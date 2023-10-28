import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
  constructor(

  ){}
  ngOnInit() {
    console.log();
    
  }
}
