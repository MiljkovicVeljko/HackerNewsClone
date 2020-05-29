import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'takeUrl'
})
export class TakeUrlPipe implements PipeTransform {

  transform(urlLong: string) {
    let sliceUrl = urlLong.slice(8, urlLong.length);
    let secondArg = sliceUrl.indexOf("/");
    return sliceUrl.slice(0, secondArg);
  }

}
