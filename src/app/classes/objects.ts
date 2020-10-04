import { isArray } from 'util';

export class Table {
    constructor(public head: string[], public data: string[][]) { }

    swapRows(i: number, j: number): void {
        let destRow: string[] = [...this.data[i]];
        this.data[i] = [...this.data[j]];
        this.data[j] = destRow;
    }

    swapColumns(i: number, j: number): void {
        let destHead = this.head[i];
        this.head[i] = this.head[j];
        this.head[j] = destHead;

        for (let ind = 0; ind < this.data.length; ind++) {
            let destEl = this.data[ind][i];
            this.data[ind][i] = this.data[ind][j];
            this.data[ind][j] = destEl;
        }
    }

    removeRow(i: number): void {
        this.data.splice(i, 1);
    }

    addRow() {
        this.data.push(new Array(this.head.length).fill(""));
    }

    removeColumn(j: number) {
        this.head.splice(j, 1);
        for (let row of this.data) {
            row.splice(j, 1);
        }
    }

    addColumn(colName: string) {
        this.head.push(colName);
        for (let row of this.data) {
            row.push("");
        }
    }

    changeValue(i: number, j: number, value: string) {
        this.data[i][j] = value;
    }


}

export class TableEdit {

    private _editableTable: Table;
    private _safeTable: Table;
    private _changesTable: Table;

    constructor(head: string[], data: string[][]) {
        this._editableTable = new Table([...head], copyArr(data));
        this._safeTable = new Table([...head], copyArr(data));
        this._changesTable = new Table([...head], copyArr(data));
    }

    get editableTable(): Table {
        return this._editableTable;
    }

    safeRemoveRow(i: number): void {
        this._editableTable.removeRow(i);
        this._changesTable.removeRow(i);
    }

    safeAddRow() {
        this._editableTable.addRow();
        this._changesTable.addRow();
    }

    safeRemoveColumn(j: number) {
        this._editableTable.removeColumn(j);
        this._changesTable.removeColumn(j);
    }

    safeAddColumn(colName: string) {
        this._editableTable.addColumn(colName);
        this._changesTable.addColumn(colName);
    }

    safeSwapRows(i1: number, i2: number): void {
        this._changesTable.swapRows(i1, i2);
        this._editableTable.swapRows(i1, i2);
    }

    safeSwapColumns(j1: number, j2: number): void {
        this._changesTable.swapColumns(j1, j2);
        this._editableTable.swapColumns(j1, j2);
    }

    setChange(i: number, j: number, value: string): void {
        this._changesTable.data[i][j] = value;
    }

    setHead(i: number, value: string): void {
        this._changesTable.head[i] = value;
    }

    saveChanges(){
        this._editableTable.data = copyArr(this._changesTable.data);
        this._editableTable.head = [...this._changesTable.head];
    }

    save(): void {
        this.saveChanges();
        this._safeTable.data = copyArr(this._editableTable.data);
        this._safeTable.head = [...this._editableTable.head]; 
        this._editableTable = new Table([...this._safeTable.head], copyArr(this._safeTable.data));
    }

    cancel(): void {
        this._editableTable = new Table([...this._safeTable.head], copyArr(this._safeTable.data));
    }

}

export interface JsonObject {
    [key: string]: string;
}

export interface Parser {
    parseToString(table: Table): string;
    parse(text: string): Table;
}

export function copyArr(arr: any): any {
    if (!isArray(arr)) throw new Error("WrongArgumentException");
    let carr = new Array(arr.length);
    for (let i = 0; i < carr.length; i++) {
        if (isArray(arr[i])) {
            carr[i] = copyArr(arr[i]);
        } else {
            carr[i] = arr[i];
        }
    }
    return carr;
}