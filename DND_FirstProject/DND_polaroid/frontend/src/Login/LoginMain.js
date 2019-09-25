import React, { Component } from 'react';
import MainPhoto from './MainPhoto';
import Login from './Login';
import SignUp from './SignUp';
import FindID from './FindID';
import FindPassword from './FindPassword';
import Profile from './Profile';
import Facebook from './Facebook';
import {Route} from 'react-router-dom';
import './LoginMain.css';

class LoginMain extends Component {
    render() {
        return (
            <div>
                 <div className ="Main">
                     <div className="Main-Left" >
                         <MainPhoto/>
                     </div>
                    <div className="Main-Right">
                        <Route path="/user/login" component={Login} /> 
                        <Route path="/user/signup" component={SignUp} /> 
                        <Route path="/user/findiD" component={FindID} />  
                        <Route path="/user/findpassword" component={FindPassword} />
                        <Route path="/user/profile" component={Profile} />
                        <Route path="/user/facebook" component={Facebook}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginMain;