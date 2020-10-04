import { Parser, Table, JsonObject } from './objects';

export class JsonParser implements Parser{

    public parse(json: string): Table {
        let parsed: any = JSON.parse(json);
        
        if (parsed.length == undefined) throw new Error("Данные не являются массивом json");

        if (parsed.length == 0) throw new Error("Пустой массив! Невозможно создать таблицу");

        let head: string[];
        let data: string[][] = [];

        for (let i = 0; i < parsed.length; i++) {
            let obj: any = parsed[i];
            let tempKeys: string[] = [];
            let row: string[] = [];
            for (let key in obj) {
                tempKeys.push(key);
                row.push(obj[key]);
            }
            if (head == null) {
                head = tempKeys;
            } else {
                if (!this.arraysEqual(head, tempKeys)){
                    throw new Error("Ключи объектов в массиве json различаются!");   
                }
            }
            data.push(row);
        }
        return new Table(head, data);
    }

    public parseToString(table: Table): string {
        let arr = [];
        for (let i = 0; i < table.data.length; i++){
            let obj: JsonObject = {};
            for (let j = 0; j < table.head.length; j ++){
                obj[table.head[j]]=table.data[i][j];
            }
            arr.push(obj);
        }
        return JSON.stringify(arr);
    }
 
    private arraysEqual(arr1: string[], arr2: string[]): boolean {

        if (arr1.length != arr2.length)
            return false;

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;

    }

}

export class CsvParser implements Parser{

    public parse(csv: string): Table {
        
        let parsed: string[] = csv.split("\n");
        
        if (parsed.length == 0) throw new Error("Не удалось распарсить csv");

        let head: string[] = parsed[0].split(",").map(s => s.trim());
        parsed.splice(0, 1);
        let data: string[][] = [];

        for (let row of parsed){
            let arr = row.split(",").map(s => s.trim());
            if (arr.length != head.length) throw new Error("Строки содержат разное количество элементов");
            data.push(arr);
        }

        return new Table(head, data);
    }

    public parseToString(table: Table): string {
        let str = "";
        str += table.head.join(",");
        for (let row of table.data){
            str += "\n";
            str += row.join(",");
        }
        return str;
    }

}