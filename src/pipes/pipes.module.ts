import { NgModule } from '@angular/core';
import { CategoryNamePipe } from './category-name/category-name';
import { ProductStatusPipe } from './product-status/product-status';
@NgModule({
	declarations: [CategoryNamePipe,
    ProductStatusPipe],
	imports: [],
	exports: [CategoryNamePipe,
    ProductStatusPipe]
})
export class PipesModule {}
