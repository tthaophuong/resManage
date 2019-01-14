import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StaffRolePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'staffRole',
})
export class StaffRolePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(role) {
    if (role == 1) {
      return "Chủ nhà hàng";
    }
    else if (role == 2) {
      return "Quản trị hệ thống";
    }
    else if (role == 3) {
      return "Nhân viên chạy bàn";
    }
    else if (role == 4) {
      return "Nhân viên bếp";
    }
    else if (role == 5) {
      return "Nhân viên quản lý";
    }
    return "Chưa cập nhật";
  }
}
