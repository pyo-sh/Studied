import React, { Component } from "react";
import { findId } from "./UserFunctions";
import "./Find.css";

class FindID extends Component {
  state = {
    email: ""
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    findId(email).then(res=>{
      this.props.history.push('/user/login');
      if(!res)
        alert('잘못된 이메일입니다 !');
      else
        alert('이메일을 확인해주세요!');
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    return (
      <div className="Find-Box">
          <p>Find ID!</p>
          <form className = "Find-Form"onSubmit ={this.onSubmit}>
              <div className="Find-Font">Email을 입력하세요.</div>
              <input type="email" placeholder="EMail" name="email" onChange={this.onChange} value ={this.state.email} />
                <button type="submit" className="Find-Button">확인</button>
          </form>
      </div>
    );
  }
}

export default FindID;
