import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetnotesDTO } from '../getnotes-dto';
import { Observable, interval, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ){}
  BestNotes: GetnotesDTO[] = []
  RecentNotes: GetnotesDTO[] = []
  ngOnInit() {
    console.log(this.cookieService.get("Username"));
    
    this.GetBestNotes().subscribe()
    this.GetRecentNotes().subscribe()
  }
  GetBestNotes() : Observable<GetnotesDTO[]>{
    let URL : string = "https://localhost:7051/GetBestNotes"
    if(this.cookieService.check("Username")) {
      URL = "https://localhost:7051/GetBestNotes?Username="+this.cookieService.get("Username")
    }
    return this.http.get<GetnotesDTO[]>(URL)
    .pipe(tap(response => {
      this.BestNotes = response
      console.log(response);
      
    }))
  }
  GetRecentNotes() : Observable<GetnotesDTO[]>{
    let URL : string = "https://localhost:7051/GetRecentNotes"
    if(this.cookieService.check("Username")) {
      URL = "https://localhost:7051/GetRecentNotes?Username="+this.cookieService.get("Username")
    }
    return this.http.get<GetnotesDTO[]>(URL)
    .pipe(tap(response => {
      this.RecentNotes = response
    }))
  }
}
