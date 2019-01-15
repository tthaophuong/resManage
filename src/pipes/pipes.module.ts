import { NgModule } from '@angular/core';
import { CategoryNamePipe } from './category-name/category-name';
import { ProductStatusPipe } from './product-status/product-status';
import { CategoryTypePipe } from './category-type/category-type';
import { StaffRolePipe } from './staff-role/staff-role';
import { StaffStatusPipe } from './staff-status/staff-status';
import { OrderStatusPipe } from './order-status/order-status';
import { TimeDatePipe } from './time-date/time-date';
import { TableNamePipe } from './table-name/table-name';
@NgModule({
	declarations: [CategoryNamePipe,
    ProductStatusPipe,
    CategoryTypePipe,
    StaffRolePipe,
    StaffStatusPipe,
    OrderStatusPipe,
    TimeDatePipe,
    TableNamePipe],
	imports: [],
	exports: [CategoryNamePipe,
    ProductStatusPipe,
    CategoryTypePipe,
    StaffRolePipe,
    StaffStatusPipe,
    OrderStatusPipe,
    TimeDatePipe,
    TableNamePipe]
})
export class PipesModule {}
