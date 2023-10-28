import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NoteDTO } from 'src/app/note-dto';

const URL = "https://localhost:7051/"
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
    return this.http.get<NoteDTO[]>("https://localhost:7051/FrontRandomNote")
    .pipe(tap(response => {
      this.Notes = response
      console.log(this.Notes);
      
    }))
  }
}
