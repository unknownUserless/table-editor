import { Component, OnInit, ViewChild, AfterContentInit, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Table, TableEdit } from '../classes/objects';
import { DownloadingComponent } from '../downloading/downloading.component';
import { Parsers } from '../services/parsers.service';
declare const $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  table: TableEdit;
  colName: string = "";
  type: string = "json";

  @ViewChild(DownloadingComponent)
  private downloading: DownloadingComponent;

  contenteditable: boolean = false;

  constructor(private router: Router, private parsers: Parsers) {
    let table: Table;
    if (router.getCurrentNavigation().extras.state == undefined) {
      table = JSON.parse(localStorage.getItem("table"));
    } else {
      table = router.getCurrentNavigation().extras.state.data;
      this.saveToStorage(table);
    }
    this.table = new TableEdit(table.head, table.data);
  }

  onUp(index: number): void {
    if (index == 0) return;
    this.table.safeSwapRows(index, index - 1);
  }

  onDown(index: number): void {
    if (index == this.table.editableTable.data.length - 1) return;
    this.table.safeSwapRows(index, index + 1);
  }

  onLeft(index: number): void {
    if (index == 0) return;
    this.table.safeSwapColumns(index, index - 1);
  }

  onRight(index: number): void {
    if (index == this.table.editableTable.head.length - 1) return;
    this.table.safeSwapColumns(index, index + 1);
  }

  onBlur(event: any, i: number, j: number): void {
    this.table.setChange(i, j, event.target.textContent.trim());
  }

  onChangeHead(event: any, i: number): void {
    let headName = event.target.textContent.trim();
    if (headName == ""){
      headName = "title";
      event.target.textContent = "title";
    }
    this.table.setHead(i, headName);
  }

  onRemoveRow(i: number): void {
    this.table.safeRemoveRow(i);
  }

  onAddRow(): void {
    this.table.safeAddRow();
  }

  onAddColumn(): void {
    this.table.safeAddColumn(this.colName);
  }

  onRemoveColumn(j: number): void {
    this.table.safeRemoveColumn(j);
  }

  onSave(): void {
    this.table.save();
    this.saveToStorage(this.table.editableTable);
    this.contenteditable = false;
  }

  onCancel(): void {
    this.table.cancel();
    this.contenteditable = false;
  }

  onEdit(): void {
    this.contenteditable = true;
  }


  onModal(): void {
    this.downloading.init(this.table.editableTable);
  }

  saveToStorage(table: Table): void {
    let str = JSON.stringify(table);
    localStorage.setItem("table", str);
  }

  onChoseName(): void {
    $('#column-add').modal('toggle');
  }

  isColNameValid(): boolean {
    if (this.colName.trim() == "") {
      return false;
    }
    return true;

  }

  onPrapareUpload(): void {
    $('#upload').modal('toggle');
  }

  onUpload(): void {
    let extras: NavigationExtras = {
      state: {
        data: this.parsers.parseToString(this.table.editableTable, this.type),
        type: this.type
      }
    }
    this.router.navigate(["/"], extras);
  }

}
