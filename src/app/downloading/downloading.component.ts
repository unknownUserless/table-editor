import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Table, Parser } from '../classes/objects';
import { NgModel } from '@angular/forms';
import { Parsers } from '../services/parsers.service';
declare const $: any;

@Component({
  selector: 'file-downloading',
  templateUrl: './downloading.component.html',
  styleUrls: ['./downloading.component.css']
})
export class DownloadingComponent{

  type: string;
  fileName: string = "";
  table: Table;
  private link: HTMLElement;

  constructor(private parsers: Parsers) {
    this.link = document.createElement('a');

  }

  onDownload(): void {
    let text = this.parsers.parseToString(this.table, this.type);
    const blob = new Blob([text]);
    const url = window.URL.createObjectURL(blob);
    this.link.setAttribute('href', url);
    this.link.setAttribute('download', this.fileName + "." + this.type);
    this.link.click();

  }

  init(table: Table) {
    this.table = table;
    $('#downloading').modal('toggle');
  }

  isFileNameValid(): boolean {
    if (this.fileName.trim() == "") {
      return false;
    } else {
      return true;
    }
  }

}
