import './MyPage.css';
import MyProfile from './MyProfile';
import MyPageMenuBar from './MyPageMenuBar';
import MyPageBenefit from './MyPageBenefit';
import MyInformation from './MyInformation';
import MyFavorite from './MyFavorite';
import { getAllInfo, getBenefitMonth, getAllFilmList } from './MyPageFunction';
import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import MyPagePhotos from './MyPagePhotos';
import { withRouter } from 'react-router-dom'

class MyPage extends Component {
    state ={ // grade 는 안하고 있네 지금 2019.09.17 db에서
        selectedMenu: "UPLOAD",
        profile: {
            profileImg: "",
            name: "",
            id: "",
            about: "",
            following: 0,
            follower: 0,
            grade: "일반",
            film : 0,
            benefit: {
                monthData: [
    
                ],
                monthUseData: [
             
                ]
            },
            // 마이프로필인지 다른사람프로필인지 확인하는 boolean
            checkProfile: true,
            isSubmenuOPen : false
        }
    }
    // 렌더링이 되고 난 후 getInfo를 실행 시키면서 db에 있는 해당 아이디의 정보들을 가지고 와서 setState 시킴
      componentDidMount(){
        if(!localStorage.usertoken && !sessionStorage.usertoken){ //둘다 토큰이 없으면
            alert('로그인을 해주세요!'); // 마이페이지에 들어가지 못하게 한다.
            this.props.history.push('/')
        }
        this.getInfo();
        this.getMonthBenefit();
        this.getMonthUseFilm();
    }
    getID = () => { // 아이디 가져오기
        let token = '';
        localStorage.usertoken ? token = localStorage.getItem('usertoken') : token = sessionStorage.getItem('usertoken');
        if(token === null)
          return null;
        const decode = jwt_decode(token);
        const ID = decode.ID;
        return ID;
    }
    getInfo = () => {  // 유저 정보 가져오기
        const ID = this.getID();
        if(ID){
                   // console.log(ID); // 아이디를 콘솔창에서 알아보기 위함
        getAllInfo(ID).then(res=> {
            this.setState({
                profile: {
                    ...this.state.profile,
                    id : ID,
                    name : res.nickname,
                    about : res.introduce,
                    following: res.follow,
                    follower : res.follower,
                    grade : res.grade,
                    film : res.film,
                    profileImg : res.profileImg
                }  
            })
        })
        .catch(err => {
            console.error(err);
        })
        }
    }
    getMonthBenefit = () => { // 월 별 데이터 가져오기 달 수익.
        const ID = this.getID();
        getBenefitMonth(ID)
        .then(res => {
            this.setState({
                profile:{
                    ...this.state.profile,
                    benefit:{
                        ...this.state.profile.benefit,
                        monthData : res  // 수익
                    }
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
    }
    getMonthUseFilm = () => { // 월 별 사용 데이터 가져오기  사용//
        const ID = this.getID();
        getAllFilmList(ID)
        .then(res => {
            this.setState({
                profile:{
                    ...this.state.profile,
                    benefit:{
                        ...this.state.profile.benefit,
                        monthUseData : res // 사용.
                    }
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
    }
    // 메뉴바를 눌러서 버튼의 innerText 값을 받아서 state를 바꾸면 반환하는 페이지가 바뀌는 형식이다.
    _SelectMenu = () => {
        const id = this.getID();
        const type = this.state.selectedMenu;
        switch(type) {
            case "UPLOAD" : return <MyPagePhotos id={id} outputType={type}/>;
            case "DOWNLOADED" : return <MyPagePhotos id={id} outputType={type}/>;
            case "LIKED" : return <MyPagePhotos id={id} outputType={type}/>;
            case "FAVORITE" : return <MyFavorite getID={this.getID} isOpen = {true}/>;
            case "BENEFIT" : 
                return <MyPageBenefit 
                    profile={this.state.profile}
                    />;
            case "SETTINGS" : 
                return <MyInformation 
                    profile={this.state.profile} 
                    getInfo={this.getInfo}
                    />;
            default : ;
        }
    }
    // 메뉴바 버튼을 눌렀을 때 state의 값을 버튼의 innerText로 바꾸고 버튼의 이펙트 효과를 만들기 위해 클릭안한 버튼을 제외한 클릭된 버튼의 className을 "MyPage-Menu-Selected" 으로 설정.
    MenuOnClick = (e) => {
        if(e.target.className==="MyPage-Menu-Selected"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = null;
                return null;
            })
            e.target.className="MyPage-Menu-Selected";
            this.setState({
                selectedMenu : e.target.innerText
            })
        }
        return null;
    }
    render() {
        const {profile} = this.state;
        return (
            <div className="MyPage">
                <div className="MyPage-MyFilm">
                    <MyProfile profile={profile}/>
                </div>
                <div className="MyPage-MenuBar">
                    <MyPageMenuBar MenuOnClick={this.MenuOnClick}/>
                </div>
                <div className = "MyPage-Photos">
                    {this._SelectMenu()}
                </div>
                
            </div>
        );
    }
}

export default withRouter(MyPage);