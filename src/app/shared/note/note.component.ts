import {Component, inject, Input, ViewChild, ElementRef} from '@angular/core';
import {tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GetnotesDTO } from 'src/app/getnotes-dto';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['note.component.css']
})
export class NoteComponent {
  @ViewChild("RateText", { read: ElementRef }) rateText!: ElementRef;
  @ViewChild("Author", { read: ElementRef }) AuthorText!: ElementRef;
  @Input({required: true}) note!: GetnotesDTO;
  IconName!: string;

  private cookieService: CookieService = inject(CookieService);
  private http: HttpClient = inject(HttpClient);

  ChangeIcon(icon : any) {
    if (!this.cookieService.check("Username")) return;
      let Icon = icon as HTMLImageElement
      this.SendVote(this.AuthorText.nativeElement.innerText, this.cookieService.get("Username"), Icon).subscribe()
  }
  SendVote(Author : string, Username : string, Icon : HTMLImageElement) {
    console.log("aaaa");
    const headers = new HttpHeaders({'ngrok-skip-browser-warning': 'true'});
    const requestOptions = { headers: headers };
    return this.http.post("http://localhost:7142/Vote?Author=" + Author + "&Username=" + Username, requestOptions)
      .pipe(tap(response => {
        console.log(response);
        let rate = parseInt(this.rateText.nativeElement.innerText)
        let array = Icon.src.split("/")
        this.IconName = array[array.length - 1]
        switch (response) {
          case "Vote removed":
            Icon.src = "../../assets/UpVote.png"
            this.rateText.nativeElement.innerText = (rate - 1).toString()
            break
          case "Vote added":
            Icon.src = "../../assets/F_UpVote.png"
            this.rateText.nativeElement.innerText = (rate + 1).toString()
            break
        }
      }))
  }
}
