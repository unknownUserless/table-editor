import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Parsers } from '../services/parsers.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  private fileInput: HTMLInputElement;
  type: string = "json";
  text: string = "";

  @ViewChild('input')
  private input: ElementRef;

  constructor(private router: Router, private parsers: Parsers) {
    if (router.getCurrentNavigation().extras.state != undefined) {
      this.text = this.router.getCurrentNavigation().extras.state.data;
      this.type = this.router.getCurrentNavigation().extras.state.type;
    }
  }

  ngOnInit(): void {
    this.fileInput = document.createElement("input");
    this.fileInput.type = "file";
    this.fileInput.addEventListener("change", async (ev: Event) => {
      let target: HTMLInputElement = <HTMLInputElement>event.target;
      let file: File = target.files[0];
      let fileText: string = await file.text();
      let fileType = file.name.split(".")[1];
      if (fileType == "json" || fileType == "csv") {
        this.type = fileType;
      }
      this.text = fileText;
    });

  }

  onLoadFile(): void {
    this.fileInput.click();
  }

  onCreateTable(): void {
    try {
      let table = this.parsers.parse(this.text, this.type);
      let extras: NavigationExtras = {
        state: {
          data: table
        }
      }
      this.router.navigate(["table"], extras);
    } catch (e) {
      alert(e.message);
    }

  }

  onClear(): void {
    this.text = "";
  }

}
