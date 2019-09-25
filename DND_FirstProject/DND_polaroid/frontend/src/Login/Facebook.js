import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';


const responseFacebook = (response) => {
    console.log(response);
  }

class Facebook extends Component {
    render() {
        return (
            <div>
                  <FacebookLogin
    appId="456127544937478"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook} 
    cssClass="my-facebook-button-class"
    icon="fa-facebook"/>,
            </div>
        );
    }
}

export default Facebook;