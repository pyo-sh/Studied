import React, { Component } from 'react';
import { findPassword } from './UserFunctions';
import "./Find.css";

class FindPassword extends Component {
    state = {
        ID : '',
        email : ''
    }
    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            ID : this.state.ID,
            email : this.state.email
        }
        findPassword(user).then(res => {   // 비밀번호찾기 이메일과 id를 서버로 보냄
            if(!res)
                alert('잘못된 정보입니다! 다시 입력해주세요!');
            else
                alert('이메일을 확인해주세요!');
        });
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
          <div className="Find-Box">
                <p>Find Password!</p>
                <form className = "Find-Form" onSubmit = {this.onSubmit}>
                    <div className = "Find-Font">
                        아이디를 입력하세요.
                    </div>
                    <input type = "text" placeholder = "ID" name="ID" onChange={this.onChange}></input>
                    <div className = "Find-Font">
                        Email을 입력하세요.
                    </div>
                    <input type = "email" placeholder = "EMail" name="email" onChange={this.onChange}></input>
                    <button type = "submit" className = "Find-Button">확인</button>
                </form>
            </div>
        )
    }
}

export default FindPassword;