import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { sessionLogin, localLogin } from './UserFunctions';



class Login extends Component {
    state = {
        click : false,
        ID : '',
        email : '',
        PASSWORD: '',
        loginCheck: true
    }

    handleClick = () => {
        this.setState ({
            click: !this.state.click
        })

        if(!this.state.click){
          alert("로그인 상태 유지를 합니다.")
        }
          
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            ID: this.state.ID,
            PASSWORD: this.state.PASSWORD
        }

        this.state.click ? 
          localLogin(user).then(res => {
            if(res) {
                this.props.history.push(`/mypage`)
            }
            else{
              this.setState({
                loginCheck : false
              })
            }
          }) :
          sessionLogin(user).then(res => {
              if(res) {
                  this.props.history.push(`/mypage`)
              }
              else{
                this.setState({
                  loginCheck : false
                })
              }
          })
    }

    render() {
      const { loginCheck } = this.state;
        const checkStyleChange = {
            color: 'rgb(82, 195, 181)'
        }

        const checkStyleOrigin = {
            color: 'rgb(100, 100, 100)'
        }

        let checkStyle = this.state.click ? checkStyleChange : checkStyleOrigin
      
        return (
          <div className="Login-Box">
              <p> Welcome Back!</p>
              <form className = "Login-Form" onSubmit={this.onSubmit} method="post">
                  <label htmlFor="ID">
                    <h4>아이디</h4>
                  </label>
                  <input
                    placeholder="ID"
                    type="text"
                    name="ID"
                    value={this.state.ID}
                    onChange={this.onChange}
                    onFocus = {this.handleFocus} 
                    onBlur = {this.handleBlur}
                  />
                  <label htmlFor="PASSWORD">
                    <h4>Password</h4>
                  </label>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    name="PASSWORD"
                    value={this.state.PASSWORD}
                    onChange={this.onChange}
                    onFocus = {this.handleFocus} 
                    onBlur = {this.handleBlur}
                  />
                  <div className = "Login-Maintain">
                    <i
                      onClick={this.handleClick}
                      className="far fa-check-circle"
                      style={checkStyle}
                    />
                    로그인 상태 유지
                  </div>
                  <div className="Login-Button-Align">
                    <button type="submit" className="Login-Button">
                      로그인
                    </button>
                  </div>
                  { loginCheck ? null : <div className="Login-Check">아이디나 비밀번호가 일치하지 않습니다.</div>}
              </form>
              <div className="Login-Box-Bottom">
                    <Link to="/user/signup" className="Link">
                      회원가입
                    </Link>
                    <div className="find">
                      <Link to="/user/findid" className="Link">아이디 찾기 </Link>
                      <Link to="/user/findpassword" className="Link"> 비밀번호 찾기 </Link>
                    </div>
                  </div>
            </div>
          
        );
        }
}

export default Login