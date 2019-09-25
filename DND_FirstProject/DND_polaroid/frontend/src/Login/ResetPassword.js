import React, { Component } from 'react';
import { ResetPwd } from './UserFunctions';
import jwt_decode from 'jwt-decode';
import './ResetPassword.css';

class ResetPassword extends Component {
    state = {
        PASSWORD: '',
        PWDCHECK : ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {userID} = this.props.match.params;
        const {token} = this.props.match.params; // 토큰이 jwt 형식인지 확인해서 아니면
        const decodeToken = jwt_decode(token); // decode 못하게 하는 방식이 좋지 않을까 생각듦
        if(decodeToken.ID === userID && (decodeToken.auth === true)) {
            const user = {
                userID,
                PASSWORD : this.state.PASSWORD
            }
            ResetPwd(user);
            alert('비밀번호가 성공적으로 변경되었습니다!');
            this.props.history.push('/user/login');
        }
        else {
            alert('비밀번호와 비밀번호 확인이 다릅니다. 확인해주세요.');
        }
    }
    render() {
        return (
            <div className = "ResetPassword-Box">
                <p> Reset Password! </p>
                <form className = "ResetPassword-Form" onSubmit = {this.onSubmit}>
                    <h4>패스워드</h4>
                    <input type ="password" placeholder="PASSWORD" onChange = {this.onChange} name ="PASSWORD" value={this.state.PASSWORD}></input>
                    <h4>패스워드체크</h4>
                    <input type="password" placeholder="PASSWORDCHECK"onChange = {this.onChange} name="PWDCHECK" value={this.state.PWDCHECK}></input>
                    <button className="ResetPassword-Button" type="submit">리셋</button>
                </form>
            </div>
        );
    }
}

export default ResetPassword;