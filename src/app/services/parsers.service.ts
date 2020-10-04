import { Parser, Table } from '../classes/objects';
import { Injectable } from '@angular/core';
import { JsonParser, CsvParser } from '../classes/parsers';

@Injectable()
export class Parsers{

    private parsers: Map<string, Parser> = new Map();

    constructor(){
        this.parsers.set("json", new JsonParser());
        this.parsers.set("csv", new CsvParser());
    }

    public parse(text: string, type: string): Table {
        return this.parsers.get(type).parse(text);
    }

    public parseToString(table: Table, type: string): string {
        return this.parsers.get(type).parseToString(table);
    }

}