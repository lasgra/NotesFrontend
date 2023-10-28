import {Component, inject, Input, ViewChild} from '@angular/core';
import {NoteDTO} from "../../note-dto";
import {tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['note.component.css']
})
export class NoteComponent {
  @ViewChild("RateText") rateText!: HTMLSpanElement;
  @Input({required: true}) note!: NoteDTO;
  IconName!: string;
  IconNameS!: string;

  private cookieService: CookieService = inject(CookieService);
  private http: HttpClient = inject(HttpClient);

  ChangeIcon(icon : any) {
    if (!this.cookieService.check("Username")) return;

      let IconS = icon
      if (icon.parentElement?.childNodes[0] != icon){
        IconS = icon.parentElement?.childNodes[0] as HTMLImageElement
      }
      if (icon.parentElement?.childNodes[2] != icon){
        IconS = icon.parentElement?.childNodes[2] as HTMLImageElement
      }
      let Icon = icon as HTMLImageElement
      this.IconName = Icon.src.split("/")[this.IconName.length - 1]
      this.IconNameS = IconS.src.split("/")[this.IconNameS.length - 1]

      const rate = parseInt(this.note.rate);
      // votestate - negative means disliked, positive means liked
      let voteState = 0;

      switch (this.IconName) {
        case "F_UpVote.png":
          Icon.src = "../../assets/UpVote.png"
          this.rateText.innerText = (rate - 1).toString()
          voteState--
          break
        case "UpVote.png":
          Icon.src = "../../assets/F_UpVote.png"
          this.rateText.innerText = (rate + 1).toString()
          voteState++
          break
        case "F_DownVote.png":
          Icon.src = "../../assets/DownVote.png"
          this.rateText.innerText = (rate + 1).toString()
          voteState++
          break
        case "DownVote.png":
          Icon.src = "../../assets/F_DownVote.png"
          this.rateText.innerText = (rate - 1).toString()
          voteState--
          break
      }

      if (this.IconNameS.split("_")[0] == "F")
      {
        switch (this.IconNameS) {
          case "F_UpVote.png":
            IconS.src = "../../assets/UpVote.png"
            this.rateText.innerText = (rate - 1).toString()
            voteState--
            break
          case "F_DownVote.png":
            IconS.src = "../../assets/DownVote.png"
            this.rateText.innerText = (rate + 1).toString()
            voteState++
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

      this.SendVote(voteState.toString(), icon.parentElement?.parentElement?.childNodes[1].innerText).subscribe()
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
}
