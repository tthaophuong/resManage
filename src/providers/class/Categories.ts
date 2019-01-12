import { Paramskey } from "../smartfox/Paramkeys";

export class Categories{
    private  category_id : number = -1;
	private  name : string = "";
    private  icon : string = "";
    
    constructor(){}

    public toSFSObject(o) {
		o.putInt(Paramskey.CATEGORY_ID, this.getCategory_id());
		o.putUtfString(Paramskey.NAME, this.getName());
		o.putUtfString(Paramskey.ICON, this.getIcon());
		return o;
	}
	
	public  fromSFSObject(o) {
		if(o.containsKey(Paramskey.CATEGORY_ID)) {
			this.setCategory_id(o.getInt(Paramskey.CATEGORY_ID));
		}
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		if(o.containsKey(Paramskey.ICON)) {
			this.setIcon(o.getUtfString(Paramskey.ICON));
		}
	}

	public  getCategory_id() {
		return this.category_id;
	}

	public  setCategory_id( category_id) {
		this.category_id = category_id;
	}

	public  getName() {
		return this.name;
	}

	public  setName( name) {
		this.name = name;
	}

	public  getIcon() {
		return this.icon;
	}

	public  setIcon( icon) {
		this.icon = icon;
	}
}