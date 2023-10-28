import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteDTO } from '../note-dto';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
let IconName
let IconNameS
let Rate : number
let Result : number = 0
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ){}
  BestNotes: any[] = []
  RecentNotes: any[] = []
  ChangeIcon(icon : any) {
    if (this.cookieService.check("Username") == true) {
      let RateText = icon.parentElement?.childNodes[1] as HTMLSpanElement
      let IconS = icon
      if (icon.parentElement?.childNodes[0] != icon){
        IconS = icon.parentElement?.childNodes[0] as HTMLImageElement
      }
      if (icon.parentElement?.childNodes[2] != icon){
        IconS = icon.parentElement?.childNodes[2] as HTMLImageElement
      }
      let Icon = icon as HTMLImageElement
      IconName = Icon.src.split("/")
      IconName = IconName[IconName.length - 1]
      IconNameS = IconS.src.split("/")
      IconNameS = IconNameS[IconNameS.length - 1]
      Rate = parseInt(RateText.innerText)
      switch (IconName) {
        case "F_UpVote.png":
          Icon.src = "../../assets/UpVote.png"
          RateText.innerText = (Rate - 1).toString()
          Result--
          break
        case "UpVote.png":
          Icon.src = "../../assets/F_UpVote.png"
          RateText.innerText = (Rate + 1).toString()
          Result++
          break
        case "F_DownVote.png":
          Icon.src = "../../assets/DownVote.png"
          RateText.innerText = (Rate + 1).toString()
          Result++
          break
        case "DownVote.png":
          Icon.src = "../../assets/F_DownVote.png"
          RateText.innerText = (Rate - 1).toString()
          Result--
          break
      }
      Rate = parseInt(RateText.innerText)
      if (IconNameS.split("_")[0] == "F")
      {
        switch (IconNameS) {
          case "F_UpVote.png":
            IconS.src = "../../assets/UpVote.png"
            RateText.innerText = (Rate - 1).toString()
            Result--
            break
          case "F_DownVote.png":
            IconS.src = "../../assets/DownVote.png"
            RateText.innerText = (Rate + 1).toString()
            Result++
            break
        }
      }
      if (icon.parentElement?.childNodes[0].src.split("/")[4].split(".")[0] == "F_UpVote"){
        this.cookieService.set(icon.parentElement?.parentElement?.childNodes[1].innerText, "1")
      }
      if (icon.parentElement?.childNodes[2].src.split("/")[4].split(".")[0] == "F_DownVote"){
        this.cookieService.set(icon.parentElement?.parentElement?.childNodes[1].innerText, "-1")
      }
      if (icon.parentElement?.childNodes[2].src.split("/")[4].split(".")[0] != "F_DownVote" && icon.parentElement?.childNodes[0].src.split("/")[4].split(".")[0] != "F_UpVote") {
        this.cookieService.set(icon.parentElement?.parentElement?.childNodes[1].innerText, "0")
      }
      this.SendVote(Result.toString(), icon.parentElement?.parentElement?.childNodes[1].innerText).subscribe()
      Result = 0
    }
  }
  SendVote(Votes : string, Autor : string) {
    let Data = {
      Votes: Votes,
      Autor: Autor
    }
    return this.http.post("https://localhost:7051/Vote?Vote=" + Votes + "&Autor=" + Autor, Data)
    .pipe(tap(response => {
      console.log(response);
      
    }))
  }
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
