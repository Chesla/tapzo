import React, { Component } from 'react';
import close from './close-button.svg';
import './App.css';
import DropDownStore from './stores/dropdownstore';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            chipList:[],
        }
        this._getDropDownStore = this._getDropDownStore.bind(this);
    }
    componentWillMount(){
       
        DropDownStore.on('change',this._getDropDownStore);
    }
    
    componentWillUnmount(){
        DropDownStore.removeListener('change',this._getDropDownStore);
    }
    _getDropDownStore(type){
        if(type=='LIST_UPDATED'){
            this.setState({
                chipList:DropDownStore.getChipList()
            })
        }
    }
    componentDidMount(){
         console.log(this.props.history);
    }
    _showChips(){
        let {chipList} = this.state;
        if(chipList.length==0){
            return null;
        }
        return chipList.map((c)=>{
            return(
                <Chip key={c} chipName={c}/>
            )
        })
    }
    render() {
        return (
            <div>
                {this._showChips()}
                <DropDownList/>
            </div>
        );
    }
}

class DropDownList extends Component{
    constructor(props){
        super(props);
        this.state={
            dropdownList:DropDownStore.getDropDownList(),
            filterName:'',
            showList:false
        }
    }
    setSelectedItem(element){
        DropDownStore.setSelectedItem(element,'addChip');
    }
    showDropDownList(){
        let {dropdownList,filterName,showList} = this.state;
        // if(filterName=='' && !showList){
        //     return null;
        // }
        return dropdownList.filter((d)=>{
            let name = d.toLowerCase();
            filterName = filterName.toLowerCase();
            return name.indexOf(filterName)!==-1
        })
        .map((d)=>{
            return(
                <div className="dropDownListName" onClick={()=>{this.setSelectedItem(d)}}>{d}</div>
            )
        })
    }
    checkKeyEvent(event){
        let {filterName} = this.state;
        console.log(event.keyCode);
        if(event.keyCode==8 && filterName===''){
            DropDownStore.highLight();
        }
        if(event.keyCode==13 && filterName===''){
            this.setState({
                showList:true
            })
        }
    }
    render(){
        return(
            <div className="dropDownCnt">
                <input type ="text" 
                        placeholder="Search by name"
                        className="inputText"
                        onKeyDown={(event)=>{this.checkKeyEvent(event)}}
                        onChange={(event)=>{
                                this.setState({
                                    filterName:event.target.value
                                })
                            }}
                    />
                {this.showDropDownList()}
            </div>
        )
    }

}

class Chip extends Component{
    constructor(props){
        super(props);
        this.state={
            highLightEle:''
        }
        this._getDropDownStore = this._getDropDownStore.bind(this);
    }
    componentWillMount(){
       
        DropDownStore.on('change',this._getDropDownStore);
    }
    
    componentWillUnmount(){
        DropDownStore.removeListener('change',this._getDropDownStore);
    }
    _getDropDownStore(type){
        if(type=='CHIP_HIGHLIGHT'){
            console.log('_getDropDownStore',DropDownStore.getHighLightEle());
            this.setState({
                highLightEle:DropDownStore.getHighLightEle()
            })
        }
    }
    setSelectedItem(element){
        DropDownStore.setSelectedItem(element,'deleteChip');
    }
    render(){
        let {chipName} = this.props;
        let {highLightEle} = this.state;
        return (
            <div className={highLightEle!==chipName ? "chipCnt" : "chipCnt highLight"}>
                <div className="chipName">
                    {chipName}
                </div>
                <div className="chipAction" onClick={()=>{this.setSelectedItem(chipName)}}>
                    <img src={close} className="close-logo" alt="logo" />
                </div>
            </div>
        )
    }
}