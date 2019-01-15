import { Paramskey } from "../smartfox/Paramkeys";

export class ProductInCombo{

    private  combo_id = -1;
	private  product_id = -1;
	private  quantity = -1;
    constructor(){

    }
	
	public  toSFSObject(o) {
		o.putInt(Paramskey.COMBO_ID, this.combo_id);
		o.putInt(Paramskey.PRODUCT_ID, this.product_id);
		o.putInt(Paramskey.QUANTITY, parseInt(this.quantity+""));
		return o;
	}
	
	public  fromSFSObject( o) {
		
		
		if(o.containsKey(Paramskey.COMBO_ID)) {
			this.setCombo_id(o.getInt(Paramskey.COMBO_ID));
		}
		

		if(o.containsKey(Paramskey.PRODUCT_ID)) {
			this.setProduct_id(o.getInt(Paramskey.PRODUCT_ID));
		}
		

		if(o.containsKey(Paramskey.QUANTITY)) {
			this.setQuantity(o.getInt(Paramskey.QUANTITY));
		}
		
		
	}

	public  getCombo_id() {
		return this.combo_id;
	}

	public  setCombo_id( combo_id) {
		this.combo_id = combo_id;
	}

	public  getProduct_id() {
		return this.product_id;
	}

	public  setProduct_id( product_id) {
		this.product_id = product_id;
	}

	public  getQuantity() {
		return this.quantity;
	}

	public  setQuantity( quantity) {
		this.quantity = quantity;
	}
}