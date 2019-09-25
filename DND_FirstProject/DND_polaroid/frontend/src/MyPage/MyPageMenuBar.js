import './MyPageMenuBar.css';
import React, { Component } from 'react';

class MyPageMenuBar extends Component {
    render() {
        return (
            <div className="MyPage-Menu-Tabs">
                <MyPageMenuButton MenuOnClick={this.props.MenuOnClick} className="MyPage-Menu-Selected" title="UPLOAD"/>
                <MyPageMenuButton MenuOnClick={this.props.MenuOnClick} className="" title="DOWNLOADED"/>
                <MyPageMenuButton MenuOnClick={this.props.MenuOnClick} className="" title="LIKED"/>
                <MyPageMenuButton MenuOnClick={this.props.MenuOnClick} className="" title="FAVORITE"/>
                <MyPageMenuButton MenuOnClick={this.props.MenuOnClick} className="" title="BENEFIT"/>
                <MyPageMenuButton MenuOnClick={this.props.MenuOnClick} className="" title="SETTINGS"/>
            </div>
        );
    }
}

const MyPageMenuButton = ({MenuOnClick, className, title}) => {
    return(
        <button onClick={MenuOnClick} className={className}> {title} </button> 
    );
}

export default MyPageMenuBar;