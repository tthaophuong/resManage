import { Categories } from "../class/Categories";
import { Products } from "../class/Products";
import { Floors } from "../class/Floors";
import { Tables } from "../class/Tables";
import { Areas } from "../class/Areas";
import { Staffs } from "../class/Staffs";
import { Combos } from "../class/Combo";

export class RestaurantManager {
    public static _instance: RestaurantManager = null;
    mCategorys: Array<Categories> = [];
    mProducts: Array<Products> = [];
    mFloors: Array<Floors> = [];
    mTables: Array<Tables> = [];
    mAreas: Array<Areas> = [];
    mStaffs: Array<Staffs> = [];
    mCombos: Array<Combos> = [];

    mTopProducts: Array<Products> = [];
    mBottomProducts: Array<Products> = [];

    constructor() {

    }

    public getTopProducts(){
        return this.mTopProducts;
    }

    public getBottomProducts(){
        return this.mBottomProducts;
    }

    public getFloorInfo(floor_id: number){
        if(this.mFloors.length > 0){
            for (const floor of this.mFloors) {
                if(floor.getFloor_id() == floor_id){
                    return floor;
                }
            }
        }
        return new Floors();
    }

    public getTableInfo(table_id: number){
        if(this.mTables.length > 0){
            for (const table of this.mTables) {
                if(table.getTable_id() == table_id){
                    return table;
                }
            }
        }
        return new Tables();
    }

    public getAreaInfo(area_id: number){
        if(this.mAreas.length > 0){
            for (const area of this.mAreas) {
                if(area.getArea_id() == area_id){
                    return area;
                }
            }
        }
        return new Areas();
    }

    public getProductInfo(product_id: number){
        if(this.mProducts.length > 0){
            for (const product of this.mProducts) {
                if(product.getProduct_id() == product_id){
                    return product;
                }
            }
        }
        return new Products();
    }

    public getStaffInfo(staff_id: number){
        if(this.mStaffs.length > 0){
            for (const staff of this.mStaffs) {
                if(staff.getUserID() == staff_id){
                    return staff;
                }
            }
        }
        return new Staffs();
    }

    public getCategoryInfo(category_id: number){
        if(this.mCategorys.length > 0){
            for (const category of this.mCategorys) {
                if(category.getCategory_id() == category_id){
                    return category;
                }
            }
        }
        return new Categories();
    }

    public getComboInfo(combo_id: number){
        if(this.mCombos.length > 0){
            for (const category of this.mCombos) {
                if(category.getCombo_id() == combo_id){
                    return category;
                }
            }
        }
        return new Combos();
    }

    public getFloors() {
        return this.mFloors;
    }
    public getAreas() {
        return this.mAreas;
    }
    public getTables() {
        return this.mTables;
    }
    public getProducts() {
        return this.mProducts;
    }
    public getCategorys() {
        return this.mCategorys;
    }
    public getStaffs() {
        return this.mStaffs;
    }
    public getCombos() {
        return this.mCombos;
    }

    public setCombos(params) {
        this.mCombos = params;
    }

    public setCategors(params) {
        this.mCategorys = params;
    }
    public setProducts(params) {
        this.mProducts = params;
    }
    public setFloors(params) {
        this.mFloors = params;
    }
    public setTables(params) {
        this.mTables = params;
    }
    public setAreas(params) {
        this.mAreas = params;
    }
    public setStaff(params) {
        this.mStaffs = params;
    }

    public static getInstance() {
        if (this._instance == null) {
            this._instance = new RestaurantManager();
        }
        return this._instance;
    }

}