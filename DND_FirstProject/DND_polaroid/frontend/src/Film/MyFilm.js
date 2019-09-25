import './MyFilm.css';
import { getAllInfo } from '../MyPage/MyPageFunction';
import jwt_decode from 'jwt-decode';
import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class MyFilm extends Component {
    state = {
        id: "",
        film: 0
    }
    
    componentWillMount(){
        let token = '';
        localStorage.usertoken ? token = localStorage.getItem('usertoken') : token = sessionStorage.getItem('usertoken');
        if(token === null) return 
        else {
            const decode = jwt_decode(token);
            const id = decode.ID;
            this.setState({
                id: id
            });
        }
    }
    componentDidMount(){
        if(localStorage.usertoken || sessionStorage.usertoken){
            this.getInfo();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.pathname.includes("charge") && this.props.location.pathname.includes("mypage")){
            this.getInfo()
        }
    }
    getInfo = () => {
        const { id } = this.state
        getAllInfo(id).then(res=> {
            this.setState({
                film : res.film
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    render(){
        return(
            <div className="MyFilm" id = {this.props.mypage}>
                보유필름 : 
                <Link className = "Amount" to = "/film/charge"> {this.state.film ? this.state.film : "0"} </Link>
            </div>
        );
    }
}

export default withRouter(MyFilm);
