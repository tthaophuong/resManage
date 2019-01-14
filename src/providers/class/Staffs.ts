import { Users } from "./Users";
import { Paramskey } from "../smartfox/Paramkeys";

export class Staffs extends Users {
	private restaurant_id : number = -1;
	
	constructor(){
        super();
    }

	public getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}

	public toSFSObject(o){
		o.putInt(Paramskey.STAFF_ID, this.getUserID());
		o.putInt(Paramskey.RESTAURANT_ID,this.getRestaurant_id());
		o.putInt(Paramskey.ROLE,parseInt(this.getRole()+""));
		o.putInt(Paramskey.STATUS,parseInt(this.getStatus()+""));
		return o;
	}
	
	public fromObject(o: Staffs){
		this.setUserID(o.getUserID());
		this.setName(o.getName());
		this.setRole(o.getRole());
		this.setStatus(o.getStatus());
	}

	public  fromSFSObject( o) {
		super.fromSFSObject(o);
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
		if(o.containsKey(Paramskey.STAFF_ID)) {
			this.setUserID(o.getInt(Paramskey.STAFF_ID));
		}
	}
	
}