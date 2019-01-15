import { SFSConnector } from '../core/smartfox/sfs-connector';
import { SFSEvent } from '../core/smartfox/sfs-events';
import { Paramskey } from './Paramkeys';
import { UserData } from '../class/UserData';
import { RestaurantCMD } from './RestaurantCMD';
import md5 from 'md5';
import { Products } from '../class/Products';
import { Floors } from '../class/Floors';
import { Areas } from '../class/Areas';
import { Categories } from '../class/Categories';
import { Tables } from '../class/Tables';
import { Staffs } from '../class/Staffs';
import { Combos } from '../class/Combo';
import { ProductInCombo } from '../class/ProductInCombo';


var SFS2X = window['SFS2X'];
export class SFSUser {
    public static ROLE_PLAYER: number = 1;
    public static ROLE_CLUB_MANAGER: number = 3;
    public static ROLE_STADIUM_MANAGER: number = 2;


    username: string = "";
    password: string = "";
    role: number = -1;
    user_id: number = -1;
    phone: string = "";
    nick_name: string = "";

    constructor() {

    }

    onSFSUserInfoResponse(sfsObject) {
        if (sfsObject) {
            this.role = sfsObject.getInt('role');
            this.user_id = sfsObject.getInt('user_id');
            this.phone = sfsObject.getUtfString('phone');
            this.nick_name = sfsObject.getUtfString('nick_name');
        }
    }

    public getRole(): number {
        return this.role;
    }
}

export class Listener {
    name: string = "";
    method: any = () => { };
}

export class RestaurantSFSConnector extends SFSConnector {

    mSFSUser: SFSUser = new SFSUser();
    public mSFSUserRoom;
    public mListeners: Map<string, any> = new Map<string, any>();
    private static _instance: RestaurantSFSConnector = null;
    private cmd: string = "restaurant";

    constructor() {
        super();
    }

    public static getInstance(): RestaurantSFSConnector {
        if (this._instance == null) {
            this._instance = new RestaurantSFSConnector();
        }
        return this._instance;
    }



    public setData(data): void {
        super.setData(data);
        this.onResponseDataConfig(data);
    }

    private onResponseDataConfig(data): void {
        if (!data) return;
        if ('smartfox_server' in data) {
            let serverConfig = data[data['smartfox_server']];
            if (serverConfig) {
                if ('host' in serverConfig) this.setSFSHost(serverConfig['host']);
                if ('port' in serverConfig) this.setSFSPort(serverConfig['port']);
                if ('zone' in serverConfig) this.setSFSZone(serverConfig['zone']);
                if ('debug' in serverConfig) this.setSFSDebug(serverConfig['debug']);
            }
        }
    }


    public addListener(key: string, func: any): void {
        this.mListeners.set(key, func);
    }

    public removeListener(key: string): void {
        this.mListeners.delete(key);
    }

    public removeAllListener(): void {
        this.mListeners.clear();
    }

    public dispatchEvent(event): void {
        this.mListeners.forEach((val, key) => {
            val(event);
        });
    }

    public getSessionToken() {
        return this.mSFSClient.sessionToken;
    }

    public addListenerForExtensionResponse() {

        this.mSFSClient.removeEventListener(SFSEvent.EXTENSION_RESPONSE, () => { });
        this.mSFSClient.removeEventListener(SFSEvent.CONNECTION_LOST, () => { });
        this.mSFSClient.removeEventListener(SFSEvent.CONNECTION_RESUME, () => { });

        this.mSFSClient.addEventListener(SFSEvent.EXTENSION_RESPONSE, (eventParams) => {
            this.onExtensionResponse(eventParams);
        });

        this.mSFSClient.addEventListener(SFSEvent.CONNECTION_LOST, (eventParams) => {
            var eventsP = {
                cmd: SFSEvent.CONNECTION_LOST,
                params: new SFS2X.SFSObject()
            }
            this.onExtensionResponse(eventsP);
        });

        this.mSFSClient.addEventListener(SFSEvent.CONNECTION_RESUME, (eventParams) => {
            var eventsP = {
                cmd: SFSEvent.CONNECTION_RESUME,
                params: new SFS2X.SFSObject()
            }
            this.onExtensionResponse(eventsP);
        });
    }

    public onExtensionResponse(eventParams) {
        if (this.mDebug) {
            console.log("EXTENSION_RESPONSE : " + eventParams.cmd, eventParams.params.getDump());
        }
        this.dispatchEvent(eventParams);
    }

    private sendRoom(cmd: string, params): void {
        this.mSFSClient.send(new SFS2X.ExtensionRequest(cmd, params, this.mSFSUserRoom));
    }

    requestJoinRoom(roomName: string) {
        this.mSFSUserRoom = roomName;

        console.log("room: ", this.mSFSUserRoom);
        console.log("type:", typeof (this.mSFSUserRoom));


        return new Promise((resolve, reject) => {
            this.mSFSClient.removeEventListener(SFSEvent.ROOM_JOIN, () => { });
            this.mSFSClient.removeEventListener(SFSEvent.ROOM_JOIN_ERROR, () => { });
            this.mSFSClient.addEventListener(SFSEvent.ROOM_JOIN, (eventParams) => {
                return resolve(eventParams);
            });
            this.mSFSClient.addEventListener(SFSEvent.ROOM_JOIN_ERROR, (eventParams) => {
                return reject(eventParams);
            });
            this.mSFSClient.send(new SFS2X.JoinRoomRequest(roomName));
        });
    }



    doLogin(data: UserData) {
        if (SFS2X == null || SFS2X == undefined) {
            SFS2X = window['SFS2X'];
        }

        return new Promise((resolve, reject) => {
            this.mSFSClient.removeEventListener(SFSEvent.LOGIN, () => { });
            this.mSFSClient.removeEventListener(SFSEvent.LOGIN_ERROR, () => { });
            this.mSFSClient.addEventListener(SFSEvent.LOGIN, (eventParams) => {
                this.addListenerForExtensionResponse();
                return resolve(eventParams);
            });
            this.mSFSClient.addEventListener(SFSEvent.LOGIN_ERROR, (eventParams) => {
                return reject(eventParams);
            });

            let params = new SFS2X.SFSObject();
            params.putUtfString(Paramskey.USERNAME, data.getUserName());
            params.putUtfString(Paramskey.PASSWORD, md5(data.getPassword()));

            this.mSFSClient.send(new SFS2X.LoginRequest("", "", params, this.getSFSZone()));
        });
    }

    doSignUp(data: UserData) {
        if (SFS2X == null || SFS2X == undefined) {
            SFS2X = window['SFS2X'];
        }

        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.USERNAME, data.getUserName());
        params.putUtfString(Paramskey.PASSWORD, md5(data.getPassword()));
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_ACCOUNT);
        this.send(this.cmd, params);
    }

    doUpdateUserInfo(data: UserData) {
        if (SFS2X == null || SFS2X == undefined) {
            SFS2X = window['SFS2X'];
        }

        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.NAME, data.getName());
        params.putInt(Paramskey.USER_ID, data.getUserId());
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_ACCOUNT);
        this.send(this.cmd, params);
    }

    public doCreateRestaurant() {
        let params = new SFS2X.SFSObject();
        // params.putUtfString(Paramskey.NAME, "New restaurant");
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_RESTAURANT);
        this.send(this.cmd, params);
    }

    public getRestaurantOfUser() {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_RESTAURANT_OF_USER);
        this.send(this.cmd, params);
    }

    public addNewProduct(array: Array<Products>) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.ADD_PRODUCT);

        let _array = new SFS2X.SFSArray();
        array.forEach(element => {
            let o = new SFS2X.SFSObject();
            o = element.toSFSObject(o);
            _array.addSFSObject(o);

        });

        params.putSFSArray(Paramskey.ARRAY, _array);
        this.send(this.cmd, params);
    }

    public addNewFloor(floor: Floors) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_FLOOR);
        params = floor.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public addUpdateFloor(floor: Floors) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_FLOOR_INFO);
        params = floor.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public addNewArea(area: Areas) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_AREA);
        params = area.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public addUpdateArea(area: Areas) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_AREA_INFO);
        params = area.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public removeCategory(cate: Categories) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.REMOVE_CATEGORY);
        params = cate.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public removeFloor(floor_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.REMOVE_FLOOR);
        params.putInt(Paramskey.FLOOR_ID, floor_id);
        this.send(this.cmd, params);
    }

    public removeTable(table_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.REMOVE_TABLE);
        params.putInt(Paramskey.TABLE_ID, table_id);
        this.send(this.cmd, params);
    }

    public removeArea(area_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.REMOVE_AREA);
        params.putInt(Paramskey.AREA_ID, area_id);
        this.send(this.cmd, params);
    }

    public addNewTable(table: Tables) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_TABLE);
        params = table.toSFSObject(params);
        this.send(this.cmd, params);
    }


    public addUpdateTable(table: Tables) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_TABLE_INFO);
        params = table.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public addNewCategory(category: Categories) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_CATEGORY);
        params = category.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public updateCategory(category: Categories) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_CATEGORY_INFO);
        params = category.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public updateProduct(product: Products) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_PRODUCT_INFO);
        params = product.toSFSObject(params);
        this.send(this.cmd, params);
    }


    public getListCategoryOfRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_CATEGORIES_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }
    public getListProductOfRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_PRODUCT_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public getListFloorOfRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_FLOOR_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public getListAreaOfRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_AREA_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public getListTableOfRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_TABLE_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public getListStaffOfRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_STAFF);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public addUserToRestaurant(user_id, restaurant_id) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.ADD_STAFF_INTO_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        params.putInt(Paramskey.STAFF_ID, user_id);
        this.send(this.cmd, params);
    }

    public updateStaffInfoInRestaurant(staff: Staffs) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_STAFF_IN_RESTAURANT);
        params = staff.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public createCombo(combo: Combos) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.CREATE_COMBO);
        params = combo.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public addProductIntoCombo(array: Array<ProductInCombo>) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.ADD_PRODUCT_INTO_COMBO);

        let _array = new SFS2X.SFSArray();
        array.forEach(element => {
            let o = new SFS2X.SFSObject();
            o = element.toSFSObject(o);
            _array.addSFSObject(o);
        });

        params.putSFSArray(Paramskey.ARRAY, _array);
        this.send(this.cmd, params);
    }

    public getListComboOfRestaurant(restaurant_id) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_COMBO_OF_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public getTopProductInRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_TOP_PRODUCT_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public getBottomProductInRestaurant(restaurant_id: number) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_BOTTOM_PRODUCT_IN_RESTAURANT);
        params.putInt(Paramskey.RESTAURANT_ID, restaurant_id);
        this.send(this.cmd, params);
    }

    public updateCombo(combo: Combos) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.UPDATE_COMBO_INFO);
        params = combo.toSFSObject(params);
        this.send(this.cmd, params);
    }

    public getListProductInCombo(combo_id) {
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_PRODUCT_IN_COMBO);
        params.putInt(Paramskey.COMBO_ID, combo_id);
        this.send(this.cmd, params);
    }

    public getListOrder(restaurant_id : number){
        let params = new SFS2X.SFSObject();
        params.putUtfString(Paramskey.CMD, RestaurantCMD.GET_LIST_ORDER_TODAY);
        params.putInt(Paramskey.RESTAURANT_ID,restaurant_id);
        this.send(this.cmd,params);
    }


}