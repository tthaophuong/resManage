import { Orders } from "../class/Orders";
import { ProductModels } from "../../pages/combo/combo";


export class OrderManager{
    public static _instance: OrderManager = null;
    CREATE_ORDER = 1;
    EDIT_ORDER = 2;

    private mOrderNew: OrderModels = {order: new Orders(), products: []};

    private mAllOrders: Array<Orders> = [];

    constructor(){

    }

    public getAllOrders(){
        return this.mAllOrders;
    }

    public onResponseAllOrders(orders){
        this.mAllOrders = orders;
    }


    public getOrderSelected(){
        return this.mOrderNew;
    }

    public static getInstance() : OrderManager {
        if (this._instance == null) {
            this._instance = new OrderManager();
        }
        return this._instance;
    }
}

export interface OrderModels{
    order?: Orders;
    products?: Array<ProductModels>;
}

