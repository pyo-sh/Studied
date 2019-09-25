import React, {Component} from 'react';
import SideContent from './SideContent';
// 안 쓰는 구문 주석 처리.
// import Users from '../Profile/ProfileSmall';
import SearchUser from './SearchUser.js';
import './ContentTop.css';
import Photos from './Photos';

class Search extends Component {
    state = { 
        searchList : "photos",
        photoCount : 0,
        userCount : 0,
    };
    getPhotoCount = (length) => {
        this.setState({
            photoCount : length
        })
    }
    getUserCount = (userlength) => {
        this.setState({
            userCount : userlength
        })
    }

    changeStatetoPhotos = () => {
        this.setState({searchList : "photos"});
    }

    changeStatetoUsers = () => {
        this.setState({searchList : "users"});
    }

    render(){
        const { photoCount, userCount } = this.state;
        return (
            <div className = "Content-Top">
                <div className = "Content-Top-Information">
                    <div className = "Title">{this.props.match.params.search}</div>
                    <div className = "Content-Top-Result">
                        <div className = {"Result-Photos" + ((this.state.searchList === "photos") ? " Color" : "")} onClick = {this.changeStatetoPhotos}> {this.state.searchList === "photos" ? photoCount : ""}  Photos </div>
                        <div className = {"Result-Users" + ((this.state.searchList === "users") ? " Color" : "")} onClick = {this.changeStatetoUsers}> {this.state.searchList === "users" ? userCount : ""} Users </div>
                    </div>
                </div>
                <div className = "Content" id = "content-top-search">
                    <div className = "Content-Left">
                        {this.state.searchList === "photos" ? <Photos search = {this.props.match.params.search} getPhotoCount = {this.getPhotoCount} /> : <SearchUser id = {this.props.match.params.search}  getUserCount = {this.getUserCount} />}
                    </div>
                    <div className = "Content-Right"> <SideContent/> </div>
                </div>
            </div>
        )
    }
}

export default Search;