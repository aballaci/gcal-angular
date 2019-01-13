import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'splitAndGet'})
export class SplitAndGetPipe implements PipeTransform {
  transform(value: string, splitter: string, maxlength: number): string {
    const pieces = value.split(splitter);
    let used = 0;
    const result: string[] = new Array();
    for (let x of pieces) {
      if ((used + x.length) <= maxlength) {
        result.push(x);
        used = used + x.length;
      } else {
        break;
      }
    }
    return result.join(splitter);
  }
}
