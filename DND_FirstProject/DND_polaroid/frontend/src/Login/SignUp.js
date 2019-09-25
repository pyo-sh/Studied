import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from './UserFunctions';
import './SignUp.css';


class SignUp extends Component {
    state = {
        ID : '',
        PASSWORD : '',
        PASSWORDCHECK : '',
        check : true,
        email : '',
        nickname : '',
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {ID, PASSWORD, PASSWORDCHECK, nickname, email} = this.state;
        if( PASSWORD !== PASSWORDCHECK) {
            this.setState({
                check: false
            })
            return;
        }
        else {
            const user = {
                ID : ID,
                PASSWORD: PASSWORD,
                nickname : nickname,
                email: email,
            }
            register(user).then(res => {
                if(!res) alert('아이디가 중복되었습니다.')
                else{
                    alert('회원가입 성공!')
                    this.props.history.push(`/user/login`)
                }
            })
        }
    }
    render() {
        const { check } = this.state;
        return(
            <div className="Sign-Up-Box">
                
            <p>Sign UP!</p>
                <form className = "Sign-Form" onSubmit={this.onSubmit}>
                    <label htmlFor="ID"><h4>아이디</h4></label>
                    <div className="ID">
                        <input type = "text" placeholder="ID" className = "ID-Box" name="ID"
                        value={this.state.ID} onChange={this.onChange}/>
                        {/* <input type = "submit" className = "ID-Check" value = "확인"></input>     */}
                    </div>
                    
                    <label htmlFor="PASSWORD"><h4>비밀번호</h4></label>
                    <input type="password" placeholder="PASSWORD"
                    name = "PASSWORD" value={this.state.PASSWORD} onChange={this.onChange}/>

                    <h4>비밀번호 확인</h4>
                    <input type="password" placeholder="PASSWORD_CHECK" name = "PASSWORDCHECK" onChange={this.onChange}></input>
                    <label htmlFor="nickname"><h4>닉네임</h4></label>
                    <input type="text" placeholder="NICKNAME"
                    name ="nickname" value={this.state.nickname}
                    onChange={this.onChange}/>
                    
                    <label htmlFor="email"><h4>이메일</h4></label>
                    <input type="email" placeholder="E-Mail"
                    name = "email"
                    value={this.state.email}
                    onChange={this.onChange}/>
    
                    <button type = "submit" className = "Sign-Up-Button" >가입</button>
              
                      {check ? null : <div className= "Warning">비밀번호와 비밀번호확인이 다릅니다.</div>}
                </form>
                    <div className = "Sign-Up-Box-Bottom">
                        ALREADY HAVE ID?
                        <div>
                           <Link to = "/user/login" className = "Go-Login">Go to the Login!</Link>
                        </div>
                    </div>
            </div>

        )
    }
}

export default SignUp