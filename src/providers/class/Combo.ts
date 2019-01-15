import { Paramskey } from "../smartfox/Paramkeys";


export class Combos {
    private combo_id = -1;
    private name = "";
    private price = 0;
    private restaurant_id = -1;

    constructor() { }

    public toSFSObject(o) {

        o.putInt(Paramskey.COMBO_ID, this.combo_id);
        o.putInt(Paramskey.RESTAURANT_ID, this.restaurant_id);
        o.putDouble(Paramskey.PRICE, parseInt(this.price+""));
        o.putUtfString(Paramskey.NAME, this.name);
        return o;
    }

    public  fromSFSObject(o) {

        if (o.containsKey(Paramskey.NAME)) {
            this.setName(o.getUtfString(Paramskey.NAME));
        }

        if (o.containsKey(Paramskey.COMBO_ID)) {
            this.setCombo_id(o.getInt(Paramskey.COMBO_ID));
        }

        if (o.containsKey(Paramskey.RESTAURANT_ID)) {
            this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
        }

        if (o.containsKey(Paramskey.PRICE)) {
            this.setPrice(o.getDouble(Paramskey.PRICE));
        }

    }

    public getCombo_id() {
        return this.combo_id;
    }

    public  setCombo_id(combo_id) {
        this.combo_id = combo_id;
    }

    public getName() {
        return this.name;
    }

    public  setName(name) {
        this.name = name;
    }

    public getPrice() {
        return this.price;
    }

    public  setPrice(price) {
        this.price = price;
    }

    public getRestaurant_id() {
        return this.restaurant_id;
    }

    public  setRestaurant_id(restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

}
