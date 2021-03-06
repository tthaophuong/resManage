import { SfsClientBaseExtension } from "../core/smartfox/sfs-client-extension";
import { RestaurantCMD } from "./RestaurantCMD";
import { RestaurantOfUser } from "../class/RestaurantOfUser";
import { Categories } from "../class/Categories";
import { Products } from "../class/Products";
import { Floors } from "../class/Floors";
import { Areas } from "../class/Areas";
import { Tables } from "../class/Tables";
import { Staffs } from "../class/Staffs";
import { Paramskey } from "./Paramkeys";
import { Combos } from "../class/Combo";
import { ProductInCombo } from "../class/ProductInCombo";
import { Orders } from "../class/Orders";

export class RestaurantClient extends SfsClientBaseExtension {
    public static _instance: RestaurantClient = null;

    constructor() {
        super();
    }

    public static getInstance() {
        if (this._instance == null) {
            this._instance = new RestaurantClient();
        }
        return this._instance;
    }

    public onParseListOrder(array){
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Orders();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public doBaseDataWithCMDParams(cmd, params) {
        if (cmd == RestaurantCMD.GET_RESTAURANT_OF_USER) {
            return this.onParseGET_RESTAURANT_OF_USER(params);
        }
        else if (cmd == RestaurantCMD.CREATE_FLOOR) {
            return this.doParseInfo(params);
        }
        else if (cmd == RestaurantCMD.CREATE_AREA) {
            return this.doParseInfo(params);
        }
        else if (cmd == RestaurantCMD.CREATE_TABLE) {
            return this.doParseInfo(params);
        }
        else if (cmd == RestaurantCMD.GET_LIST_CATEGORIES_IN_RESTAURANT) {
            return this.onParseGET_LIST_CATEGORIES_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_PRODUCT_IN_RESTAURANT) {
            return this.onParseGET_PRODUCT_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_FLOOR_IN_RESTAURANT) {
            return this.onParseGET_LIST_FLOOR_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_AREA_IN_RESTAURANT) {
            return this.onParseGET_LIST_AREA_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_TABLE_IN_RESTAURANT) {
            return this.onParseGET_LIST_TABLE_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_STAFF) {
            return this.onParseGET_LIST_STAFF(params);
        }
        else if (cmd == RestaurantCMD.CREATE_ACCOUNT) {
            return this.onParseCREATE_ACCOUNT(params);
        }
        else if (cmd == RestaurantCMD.GET_LIST_COMBO_OF_RESTAURANT) {
            return this.onParseListCombo(params);
        }
        else if (cmd == RestaurantCMD.GET_TOP_PRODUCT_IN_RESTAURANT) {
            return this.onParseGET_PRODUCT_IN_RESTAURANT(params);
        }
        else if (cmd == RestaurantCMD.GET_TOP_PRODUCT_IN_RESTAURANT) {
            return this.onParseGET_PRODUCT_IN_RESTAURANT(params);
        }
        else if (cmd == RestaurantCMD.GET_PRODUCT_IN_COMBO) {
            return this.onParseGET_PRODUCT_IN_Combo(params);
        }
        else if(cmd == RestaurantCMD.GET_LIST_ORDER_TODAY){
            return this.doParseArrayExtensions(params);
        }
    }

    onParseCREATE_ACCOUNT(params) {
        let content = params.getSFSObject(Paramskey.CONTENT);
        let user = content.getSFSObject(Paramskey.USER);
        return user;
    }

    public onParseGET_PRODUCT_IN_Combo(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new ProductInCombo();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseListCombo(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Combos();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }


    public onParseGET_LIST_CATEGORIES_IN_RESTAURANT(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Categories();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_STAFF(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Staffs();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_PRODUCT_IN_RESTAURANT(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Products();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_FLOOR_IN_RESTAURANT(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Floors();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_AREA_IN_RESTAURANT(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Areas();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_TABLE_IN_RESTAURANT(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new Tables();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_RESTAURANT_OF_USER(params) {
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if (array) {
            for (let i = 0; i < array.size(); i++) {
                let sfs = array.getSFSObject(i);
                let newRes = new RestaurantOfUser();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }



    // public onParseGET_PRODUCT_IN_RESTAURANT(params){
    //     let data = this.doParseArrayExtensions(params);
    //     let array = data.array;
    //     let res = [];
    //     if(array){
    //         for(let i = 0;i < array.size(); i++){
    //             let sfs = array.getSFSObject(i);
    //             let newRes = new RestaurantOfUser();
    //             newRes.fromSFSObject(sfs);
    //             res.push(newRes);
    //         }
    //     }
    //     return res;

    // }
}