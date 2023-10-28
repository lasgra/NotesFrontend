import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteDTO } from '../note-dto';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ){}
  BestNotes: any[] = []
  RecentNotes: any[] = []
  ngOnInit() {
    this.GetBestNotes().subscribe()
    this.GetRecentNotes().subscribe()
  }
  CheckRecentVotes() {
    document.getElementById("Notes")!.childNodes.forEach(element => {
      let AutorElement = element.childNodes[1] as HTMLElement
      let UpVote = element.childNodes[3].childNodes[0] as HTMLImageElement
      let DownVote = element.childNodes[3].childNodes[2] as HTMLImageElement
      if (this.cookieService.check(AutorElement.innerText)){
        if(this.cookieService.get(AutorElement.innerText) == "1") {
          UpVote.src = "../../assets/F_UpVote.png"
        }
        if(this.cookieService.get(AutorElement.innerText) == "-1") {
          DownVote.src = "../../assets/F_DownVote.png"
        }
      }
    });
  }
  CheckBestVotes() {
    document.getElementById("Notes2")!.childNodes.forEach(element => {
      console.log("aaa");
      let AutorElement = element.childNodes[1] as HTMLElement
      let UpVote = element.childNodes[3].childNodes[0] as HTMLImageElement
      let DownVote = element.childNodes[3].childNodes[2] as HTMLImageElement
      if (this.cookieService.check(AutorElement.innerText)){
        if(this.cookieService.get(AutorElement.innerText) == "1") {
          UpVote.src = "../../assets/F_UpVote.png"
        }
        if(this.cookieService.get(AutorElement.innerText) == "-1") {
          DownVote.src = "../../assets/F_DownVote.png"
        }
      }
    });
  }
  GetBestNotes() : Observable<NoteDTO[]>{
    return this.http.get<NoteDTO[]>("https://localhost:7051/GetBestNotes")
    .pipe(tap(response => {
      this.BestNotes = response
      setTimeout(() => {
        this.CheckBestVotes()
      }, 100);
    }))
  }
  GetRecentNotes() : Observable<NoteDTO[]>{
    return this.http.get<NoteDTO[]>("https://localhost:7051/GetRecentNotes")
    .pipe(tap(response => {
      this.RecentNotes = response
      setTimeout(() => {
        this.CheckRecentVotes()
      }, 100);
    }))
  }
}
