import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteDTO } from '../note-dto';
import { Observable, tap } from 'rxjs';
import { Ipaddress } from '../ipaddress';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
let IpAddres
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router : Router
  ){}
    
  ngOnInit() {    
    if (this.cookieService.check('Username') != false) {
      
      this.Ip("").subscribe()
    }
    else {
      this.Ip("").subscribe()
    }
  }
  Clicked(Username : HTMLInputElement) {
    this.Ip(Username.value).subscribe()
  }
  Ip(Username : string) : Observable<Ipaddress> {
    return this.http.get<Ipaddress>("http://api.ipify.org/?format=json")
    .pipe(tap(response => {
      let UserDTO = {
        Username : Username,
        IP : response.ip
      }      
      this.cookieService.set('IP', response.ip);
      this.CheckForAccount(UserDTO).subscribe()
    }))
  }
  CheckForAccount(UserDTO : any) {
    return this.http.post<NoteDTO[]>("https://localhost:7051/FindUser", UserDTO)
      .pipe(tap(response => {     
        if (response.toString() == "Exists" && UserDTO.Username == ""){
          this.AccountExist()
        }     
        if (response.toString() == "NotExists" && UserDTO.Username != ""){
          this.AddAccount(UserDTO).subscribe()
        }
        if (response.toString() == "Exists"){
          this.MoveButton("User exists")
        }  
    }))
  }
  AddAccount(UserDTO : any) : Observable<NoteDTO[]>{
    return this.http.post<NoteDTO[]>("https://localhost:7051/AddUser", UserDTO)
    .pipe(tap(response => {  
      if (response.toString() == "Added"){
        this.cookieService.set('Username', UserDTO.Username);
        this.router.navigate(['/Create'])
      }
      else {
        this.MoveButton("User exists")
      }
    }))
  }
  AccountExist(){
    document.getElementById("RemoveHere")?.classList.add("Invisible")
    document.getElementById("NotRemoveHere")?.classList.remove("Invisible")
  }
  MoveButton(text : string){
    document.getElementById("DoneButton")!.innerText = text
    document.getElementById("DoneButton")?.classList.add("ButtonError")
    setTimeout(() => {
      document.getElementById("DoneButton")?.classList.remove("ButtonError")
      document.getElementById("DoneButton")!.innerText = "Create !"
    }, 1000);
  }
}
