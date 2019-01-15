import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(status) {
    if (status == 1) {
      return "Đang phục vụ";
    }
    else if (status == 2) {
      return "Đã thanh toán";
    }
    else if (status == 3) {
      return "Đã huỷ";
    }
    else if (status == 4) {
      return "Đặt hàng";
    }
    else if (status == 5) {
      return "Đặt bàn";
    }
    return "";
  }
}
