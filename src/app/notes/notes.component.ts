import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetnotesDTO } from '../getnotes-dto';
import { Observable, tap } from 'rxjs';
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
    this.GetBestNotes().subscribe()
    this.GetRecentNotes().subscribe()
  }
  GetBestNotes() : Observable<GetnotesDTO[]>{
    const headers = new HttpHeaders({'ngrok-skip-browser-warning': 'true'});
    const requestOptions = { headers: headers };
    let URL : string = "http://localhost:7142/GetBestNotes"
    if(this.cookieService.check("Username")) {
      URL = "http://localhost:7142/GetBestNotes?Username="+this.cookieService.get("Username")
    }
    return this.http.get<GetnotesDTO[]>(URL, requestOptions)
    .pipe(tap(response => {
      this.BestNotes = response
    }))
  }
  GetRecentNotes() : Observable<GetnotesDTO[]>{
    const headers = new HttpHeaders({'ngrok-skip-browser-warning': 'true'});
    const requestOptions = { headers: headers };
    let URL : string = "http://localhost:7142/GetRecentNotes"
    if(this.cookieService.check("Username")) {
      URL = "http://localhost:7142/GetRecentNotes?Username="+this.cookieService.get("Username")
    }
    return this.http.get<GetnotesDTO[]>(URL, requestOptions)
    .pipe(tap(response => {
      this.RecentNotes = response
    }))
  }
}
