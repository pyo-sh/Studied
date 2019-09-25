import React, { Component } from "react";
import { deleteUser } from "./UserFunctions";
import jwt_decode from "jwt-decode";

const id = () => {
  let token = "";
  localStorage.usertoken
    ? (token = localStorage.getItem("usertoken"))
    : (token = sessionStorage.getItem("usertoken"));
  const decodetoken = jwt_decode(token);
  const id = decodetoken.ID;
  console.log(id);
  return id;
};

export const del = () => {
  const userID = id();
  deleteUser(userID).then(res => {
    console.log(res);
  });
  if (localStorage.usertoken) {
    localStorage.removeItem("usertoken");
  } else if (sessionStorage.usertoken) {
    sessionStorage.removeItem("usertoken");
  } else {
    console.log("에러가 났습니다");
  }
}

class DeleteUser extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.del();
  };

  del = () => {
    const userID = id();
    deleteUser(userID).then(res => {
      console.log(res);
    });
    if (localStorage.usertoken) {
      localStorage.removeItem("usertoken");
    } else if (sessionStorage.usertoken) {
      sessionStorage.removeItem("usertoken");
    } else {
      console.log("에러가 났습니다");
    }
  };

  render() {
    return (
      <div>
        <div>유저 삭제</div>
        <form onSubmit={this.onSubmit}>
          <button type="submit">삭제</button>
        </form>
      </div>
    );
  }
}

export default DeleteUser;
