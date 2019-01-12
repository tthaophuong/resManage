import { Categories } from "../class/Categories";
import { Products } from "../class/Products";
import { Floors } from "../class/Floors";
import { Tables } from "../class/Tables";
import { Areas } from "../class/Areas";

export class RestaurantManager{
    public static _instance: RestaurantManager = null;
    mCategorys: Array<Categories> = [];
    mProducts: Array<Products> = [];
    mFloors: Array<Floors> = [];
    mTables: Array<Tables> = [];
    mAreas: Array<Areas> = [];

    constructor(){

    }

    public setCategors(params){
        this.mCategorys = params;
    }
    public setProducts(params){
        this.mProducts = params;
    }
    public setFloors(params){
        this.mFloors = params;
    }
    public setTables(params){
        this.mTables = params;
    }
    public setAreas(params){
        this.mAreas = params;
    }

    public static getInstance(){
        if(this._instance == null){
            this._instance = new RestaurantManager();
        }
        return this._instance;
    }

}