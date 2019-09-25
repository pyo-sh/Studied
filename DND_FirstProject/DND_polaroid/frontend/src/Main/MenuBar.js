import React, { Component } from 'react';
import './MenuBar.css';
import MyFilm from '../Film/MyFilm';
import {Icon, Dropdown} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class MenuBar extends Component {
    state = {
        visible : false,
        search : ''
    }

    componentDidMount(){
        if(window.location.pathname.indexOf("search") < 0){
            this.setState({search : ''});
        }
    }
    logOut = (e) => {
        e.preventDefault();
        localStorage.usertoken ? localStorage.removeItem('usertoken') :  sessionStorage.removeItem('usertoken');
        alert('로그아웃 되었습니다.');
        this.props.history.push(`/`);
    }
    handleState = () => {
        this.setState({search : ''});
    }
    handleToggle = () => {
        const visible = this.state.visible;
        this.setState({visible : !visible});
    }

    onChange = (e) => {
        this.setState({search : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this.state.search === '')
            alert("검색어를 입력하세요.");
        else
            this.props.history.push(`/search/${this.state.search}`);
    }

    render() {
        return (
            <>
                <header className = "Menu">
                    <div className = "Menu-First">
                        <div className="Menu-Logo">
                            <img className = "Logo" src = 'https://poloapp.s3.ap-northeast-2.amazonaws.com/logo/Logo.svg' alt = ""></img>
                            <Link to="/"><span className="Menu-Title" onClick={this.handleState}>Polaroid</span></Link>
                        </div>
                        <form className ="Search-Form" onSubmit={this.onSubmit} method = "post">
                            <Icon className = "Icon-Search" name="search" size="large"/>
                            <input className = "Search-Input" type = "text" value = {this.state.search} onChange={this.onChange}/>
                        </form>
                    </div>

                    <div className = "Menu-Item">
                        <Dropdown text="Category" pointing simple item className="link item Menu-Category">
                            <Dropdown.Menu> 
                                <Dropdown.Item onClick = {this.handleToggle}> Best Photos </Dropdown.Item>
                                    <div className = {"Sub-Menu" + (this.state.visible ? " Visible" : "")}>
                                        <Link className = "Sub-Item" to = "/category/daily" onClick={this.handleState}>Daliy</Link>
                                        <Link className = "Sub-Item" to = "/category/weekly" onClick={this.handleState}>Weekly</Link>
                                        <Link className = "Sub-Item" to = "/category/monthly" onClick={this.handleState}>Monthly</Link>
                                    </div>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Wallpaper" onClick={this.handleState}>
                                        Wallpaper
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Nature" onClick={this.handleState}>
                                        Nature
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Fashion" onClick={this.handleState}>
                                        Fashion
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Illustration" onClick={this.handleState}>
                                        Illustration
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Art-Works" onClick={this.handleState}>
                                        Art Works
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/People" onClick={this.handleState}>
                                        People
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Patterns" onClick={this.handleState}>
                                        Patterns
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Architecture" onClick={this.handleState}>
                                        Architecture
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Business" onClick={this.handleState}>
                                        Business
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Animals" onClick={this.handleState}>
                                        Animals
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Travel" onClick={this.handleState}>
                                        Travel
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className = "Link" to = "/category/Food" onClick={this.handleState}>
                                        Food
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? <Link to="/user/login"> <button className = "Login-Btn" onClick={this.handleState}>Login</button></Link> : <button className = "Login-Btn" onClick={this.logOut}>Logout</button>}
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? "" : <MyFilm/> } 
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? <Link to="/user/signup"><button className = "Sign-Btn" onClick={this.handleState}>Sign Up</button></Link> : <Link to="/mypage"><button className = "Sign-Btn" onClick={this.onClick}>My Page</button></Link>} 
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? "" : <Link to="/upload"><button className = "Sign-Btn" id = "Upload" onClick={this.handleState}>Upload</button></Link> } 

                    </div>
                </header>
             </>
        );
    }
}

export default withRouter(MenuBar);