import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetnotesDTO } from '../getnotes-dto';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ){}
  Note: any[] = []
  Notes: GetnotesDTO[] = []
  ngOnInit() {
    this.GetNote().subscribe()
  }
  GetNote() : Observable<GetnotesDTO[]>{
    const headers = new HttpHeaders({'ngrok-skip-browser-warning': 'true'});
    const requestOptions = { headers: headers };
    let URL : string = "http://localhost:7142/RandomNote"
    if(this.cookieService.check("Username")) {
      URL = "http://localhost:7142/RandomNote?Username="+this.cookieService.get("Username")
    }
    return this.http.get<GetnotesDTO[]>(URL, requestOptions)
    .pipe(tap(response => {
      console.log(response);
      
      this.Notes = response
    }))
  }
}
