import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";
class DropDownStore extends EventEmitter{
	constructor(){
		super();
		this.dropdownList=["India","Nepal","Bhutan","Srilanka","Dubai","Dubai"];
		this.selectedItemList=[];
		this.highlightedEle='';
	}
	
	
	getDropDownList(){
		return this.dropdownList || [];
	}
	getChipList(){
		return this.selectedItemList || [];
	}
	getHighLightEle(){
		return this.highlightedEle || '';
	}
	highLight(){
		if(!this.highlightedEle || this.highlightedEle!==this.selectedItemList[this.selectedItemList.length-1]){
			this.highlightedEle= this.selectedItemList[this.selectedItemList.length-1];
		}else{
			this.setSelectedItem(this.selectedItemList[this.selectedItemList.length-1],'deleteChip');
		}
		this.emit('change','CHIP_HIGHLIGHT');
	}
	setSelectedItem(el,type){
		if(type==='addChip'){
			this.selectedItemList.push(el);
			this.dropdownList.splice(this.dropdownList.indexOf(el),1);
		}
		else if(type ==='deleteChip'){
			this.dropdownList.push(el);
			this.selectedItemList.splice(this.selectedItemList.indexOf(el),1);
		}
		this.emit('change','LIST_UPDATED');
	}
	
}

const dropdownstore = new DropDownStore();
export default dropdownstore;
