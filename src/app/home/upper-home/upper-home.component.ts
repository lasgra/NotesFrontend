import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NoteDTO } from 'src/app/note-dto';

const URL = "http://localhost:7142/"
@Component({
  selector: 'app-upper-home',
  templateUrl: './upper-home.component.html',
  styleUrls: ['./upper-home.component.css']
})
export class UpperHomeComponent {
  constructor(
    private http: HttpClient
  ) {}
  Notes: any[] = []
  data() {
    const Data = new Date()
    console.log(Data.getTime());
  }
  ngOnInit(){
    console.log(this.Notes);
    this.GetNote().subscribe()
  }
  GetNote() : Observable<NoteDTO[]>{
    const headers = new HttpHeaders({'ngrok-skip-browser-warning': 'true'});
    const requestOptions = { headers: headers };
    return this.http.get<NoteDTO[]>("http://localhost:7142/FrontRandomNote", requestOptions)
    .pipe(tap(response => {
      this.Notes = response
      console.log(this.Notes);
      
    }))
  }
}
