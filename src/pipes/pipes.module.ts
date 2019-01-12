import { NgModule } from '@angular/core';
import { CategoryNamePipe } from './category-name/category-name';
import { ProductStatusPipe } from './product-status/product-status';
import { CategoryTypePipe } from './category-type/category-type';
import { StaffRolePipe } from './staff-role/staff-role';
import { StaffStatusPipe } from './staff-status/staff-status';
@NgModule({
	declarations: [CategoryNamePipe,
    ProductStatusPipe,
    CategoryTypePipe,
    StaffRolePipe,
    StaffStatusPipe],
	imports: [],
	exports: [CategoryNamePipe,
    ProductStatusPipe,
    CategoryTypePipe,
    StaffRolePipe,
    StaffStatusPipe]
})
export class PipesModule {}
