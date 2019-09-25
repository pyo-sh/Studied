import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './Mark.css';
import { delFavFolder } from './ImageFunction';

class FolderListItem extends Component {

    onClick = () => {
        delFavFolder(this.props.favFolderNum);
        this.props.getAllFolder();
    }
    
    render(){
        return(
            <div className={"Mark-Items"+ (this.props.checked ? " Check-Mark-Background" : '')} onClick={() => this.props.onToggle(this.props.favFolderNum)}>
                <Icon className = {"Icon-Folder" + (this.props.checked ? " Check-Mark" : '')} name = {this.props.checked ? "folder open" : "folder outline"}/>
                <div className={"Mark-Items-Item" + (this.props.checked ? " Check-Mark" : '')}> 
                    <div className = "Mark-Items-Item-Title"> {this.props.favFolderName} </div>
                    <Icon className = "X" name = "x" onClick={this.onClick} />
                </div>
            </div>
        )
    }
}

export default FolderListItem;