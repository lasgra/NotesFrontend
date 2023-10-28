import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteDTO } from '../note-dto';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
let LastColor : HTMLDivElement
let LastMarkerColor : HTMLDivElement
let ButtonAnim = false
let CreatedNoteDTO : NoteDTO
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router : Router
  ){}
  ngOnInit() {
    this.ChangeColor(document.getElementById("Yellow") as HTMLDivElement, document.getElementById("Note") as HTMLDivElement)
    if (this.cookieService.check("Username") == false) {
      document.getElementById("RemoveHere")?.classList.add("Invisible")
      document.getElementById("Text")!.innerText = "You need to create account first"
      document.getElementById("CheckButton")?.classList.add("Invisible")
      document.getElementById("CheckButtonInv")?.classList.remove("Invisible")
      document.getElementById("NotRemoveHere")?.classList.remove("Invisible")
    }
    document.getElementById("Autor")!.innerText = this.cookieService.get("Username")
    this.CheckUser().subscribe()
  }
  CheckUser() {
    return this.http.post("https://localhost:7051/GetNote?Autor=" + this.cookieService.get("Username"), this.cookieService.get("Username"))
    .pipe(tap(response => {
      if (response == "Exists") {
        document.getElementById("RemoveHere")?.classList.add("Invisible")
        document.getElementById("NotRemoveHere")?.classList.remove("Invisible")
      }
    }))
  }
  ChangeColor(Color : HTMLDivElement, Note : HTMLDivElement) {
    if (LastColor != undefined)
    {
      LastColor.style.border = ""
    }
    LastColor = Color
    Color.style.border = "2px black solid"
    Note.style.backgroundColor = Color.style.backgroundColor
  }
  ChangeMarkerColor(Color : HTMLDivElement, Note : HTMLTextAreaElement) {
    if (LastMarkerColor != undefined)
    {
      LastMarkerColor.style.border = ""
    }
    LastMarkerColor = Color
    Color.style.border = "2px black solid"
    Note.style.color = Color.style.backgroundColor
  }
  ChangeFontSize (Slider : HTMLInputElement, Text : HTMLTextAreaElement) {
    Text.style.fontSize = Slider.value + "%"
  }
  Send(Button : HTMLDivElement, Message : HTMLTextAreaElement, Title : HTMLInputElement) {
    if (Message.value != "" && Title.value != "") {
      Button.classList.remove("RevButtonAnim")
      Button.classList.add("ButtonAnim")
      ButtonAnim = true
    }
    else {
      if (ButtonAnim == true) {
        console.log("aaaa");

        ButtonAnim = false
        Button.classList.remove("ButtonAnim")
        Button.classList.add("RevButtonAnim")
      }
    }
  }
  SendMessage(Message : HTMLTextAreaElement, Title : HTMLInputElement) {
    CreatedNoteDTO = {
      class: "",
      title: Title.value,
      author: this.cookieService.get("Username"),
      text:  Message.value,
      rate:  "0",
      bgColor: LastColor.style.backgroundColor,
      date: (new Date().getTime()).toString(),
    }
    this.PostMessage(CreatedNoteDTO).subscribe()
  }
  PostMessage(NoteDTO : NoteDTO) {
    return this.http.post("https://localhost:7051/AddNote", NoteDTO)
    .pipe(tap(response => {
      this.router.navigate(['/Notes'])
    }))
  }
}
