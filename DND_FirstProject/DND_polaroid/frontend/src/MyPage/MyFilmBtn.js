import './MyFilmBtn.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import MyFilm from '../Film/MyFilm'

class MyFilmBtn extends Component{
    render(){
        return (
            <div className = "MyPage-Film">
                <MyFilm mypage = "mypage"/>
                <button 
                    className="MyFilmBtn"
                    onClick={this.onClickFilm}>충전하기
                </button>
            </div>
        );
    }
    onClickFilm = () => {
        this.props.history.push('/film/charge');
    }
}
export default withRouter(MyFilmBtn);