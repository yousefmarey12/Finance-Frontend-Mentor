import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "money",
    standalone: true
})
export class DisplayMoney implements PipeTransform {
    transform(value: any) {
        let number = value;
    let decimalIndex = number. toString().indexOf(".");
    let decimal = number. toString(). substring(decimalIndex);
    let integerStr = Math.trunc((+number)).toString();

    let reversedStr = ''
    for (let i = integerStr.length - 1, j = 0; i >= 0; i--, j++) {
    reversedStr += integerStr[i]
    if ((j + 1) % 3 == 0 && j != (integerStr.length -1 )) {
        reversedStr += ','
    }

    }
    
    let str = '';
    for (let i = reversedStr.length -1; i >= 0; i--) {
    str += reversedStr[i]
    }
   
    let finalStr;
    decimalIndex == -1 ? finalStr = str : finalStr = str + decimal;
   
    return finalStr

    }
}