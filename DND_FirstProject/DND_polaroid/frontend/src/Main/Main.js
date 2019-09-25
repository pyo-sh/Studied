import React from 'react';
import MenuBar from './MenuBar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MyPage from '../MyPage/MyPageScreen';
import Upload from '../Upload/Upload';
import Image from '../Image/ImageScreen';
import Login from '../Login/Login';
import SignUp from '../Login/SignUp';
import FindID from '../Login/FindID';
import FindPassword from '../Login/FindPassword';
import Facebook from '../Login/Facebook';
import '../Login/LoginMain.css';
import MainPhoto from '../Login/MainPhoto';
import DeleteUser from '../Login/DeleteUser';
import ResetPassword from '../Login/ResetPassword';
import Category from './Category';
import Search from './Search';
import FilmCharge from '../Film/FilmCharge';
import IDPage from '../Profile/IDPage';

const Main = () => {  // 출력 될 곳
        return (
            <Router>
                <Switch>
                    <Route path='/user' component = {LoginPage}/>
                    <Route path='/'  component={HomePage}/>
                </Switch>
            </Router>
        );
    };

const HomePage = ({match}) => {  // '/' 로 들어왔을 때
    return(
        <>
            <MenuBar/>
            <Switch>
                <Route path={match.url+'category/:category'} exact={true} component={Category}/>
                <Route path={match.url+'search/:search'} exact={true} component={Search}/>
                <Route path={match.url+'imagepage/:id'} exact={true} component = {Image}/>
                <Route path={match.url+'upload'} exact={true} component = {Upload} />
                <Route path={match.url+'mypage'} exact={true} component = {MyPage} />
                <Route path={match.url+'film/charge'} exact={true} component={FilmCharge}/>
                <Route path={match.url+':id'} exact={true} component={IDPage}/>
                <Route path={match.url} exact={true} component = {Home}/>
            </Switch>
        </>
    )
}

const LoginPage = ({match}) => { // '/user' 로 들어 왔을 때.
    return(
            <div className ="Main">
                     <div className="Main-Left">
                        <MainPhoto /> 
                    </div>

                    <div className="Main-Right">
                    <Switch>
                        <Route path={match.url+'/login'} exact={true} component={Login} /> 
                        <Route path={match.url+'/signup'}exact={true} component={SignUp} /> 
                        <Route path={match.url+'/findid'} exact={true} component={FindID} />  
                        <Route path={match.url + '/findpassword'} exact={true}  component={FindPassword} />
                        <Route path={match.url + '/facebook'} exact={true} component={Facebook}/>
                        <Route path={match.url + '/delete'} exact={true} component={DeleteUser}/>
                        <Route path={match.url + '/reset/:userID/:token'} exact={true} component={ResetPassword}/>
                    </Switch>
                    </div>
            </div>
    )
}

export default Main;