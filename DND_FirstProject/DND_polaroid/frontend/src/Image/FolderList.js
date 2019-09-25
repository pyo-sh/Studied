import React, { Component } from 'react';
import FolderListItem from './FolderListItem';
import './Mark.css';

class FolderList extends Component {
    state = {
        folder : []
    }
    componentDidMount(){
        const folder = this.props.folder;
        this.setState({
            folder
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.folder !== this.props.folder) {
            const folder = this.props.folder;
            this.setState({
                folder
            })
        }
    }
    render(){
        const folderList = this.state.folder.map(
            ({favFolderNum, favFolderName, checked}) => (
                <FolderListItem 
                favFolderNum={favFolderNum}
                favFolderName={favFolderName}
                checked={checked}
                key={favFolderNum}
                onToggle={this.props.onToggle}
                getAllFolder={this.props.getAllFolder}
                />
            )
        )

        return(
            <div className = "MarK-List">
                {folderList}
            </div>
        )
    }
}

export default FolderList;