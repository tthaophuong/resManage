import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StaffStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'staffStatus',
})
export class StaffStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(status) {
    if(status == 1){
      return "Đã kích hoạt";
    }
    return "Khóa tài khoản";
  }
}
