import React, {Component} from 'react';
import './FollowProfile.css';
import {withRouter} from 'react-router-dom';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, addFollow, deleteFollow, isFollowInfo } from './ProfileFunction';
import { Link } from 'react-router-dom';

// 나인지 아닌지, 팔로우 기능을 추가해줘야 하는지 아닌지. 버튼 추가해주거나 홈페이지로 넘어가주거나,
class FollowProfile extends Component{
    state={
        // 정보를 받은상태인지 확인하는 거
        // informationCheck = comPonentWillMount 에서 받는 follow버튼의 정보가 받아지면 true
        informationCheck: false,
        // informationCheck2 = getInfo 에서 받는 프로필의 정보가 전부 받아지면 true
        informationCheck2: false,
        id: "",
        follow: true,
        isMe: false,
        // true : following, false : follower
        isFollow: false,
        // follow버튼의 출력을 알아내기 위해서 현재 로그인된 아이디를 상대 아이디로 받았다.
        followTargetId: "",
        profile: {
            profileImg: "",
            name: "",
            id: "",
            about: "",
            grade: "일반"
        }
    }
    // isFollowInfo는 targetID와 id를 비교해서 willmount에서 isFollow 값을 바꾼다.
    componentWillMount(){
        const { id, isMe, followTargetId } = this.props;
        isFollowInfo(followTargetId, id).then(res => {
            this.setState({
                isFollow: res,
                informationCheck: true
            });
        })
        this.setState({
            id: id,
            isMe: isMe,
        });
    }
    // state 값의 id가 있으므로, 정보를 불러들이는 getInfo 함수를 통해 정보를 받는다.
    componentDidMount(){
        this.getInfo();
    }

    getInfo = () => {
        const ID = this.state.id;
        getAllInfo(ID).then(res=> {
            this.setState({
                informationCheck2: true,
                profile: {
                    ...this.state.profile,
                    profileImg: res.profileImg,
                    id : ID,
                    name : res.nickname,
                    about : res.introduce,
                    grade : res.grade,
                }
            })
        })
    }

    // 팔로우 기능을 수행하기 위한 onClick함수이다.
    // myID는 getMyID를 통해 가져오며, 유저가 로그인 하지 않았을 경우 null로 가져온다.
    // 하지만 상위 컴포넌트인 FollowPage.js에서 로그인 하지 않았을 경우 isMe=true 값을 통해 follow버튼 실행 X
    handleClick = (e) => {
        const myID = getMyID();
        const { id, isFollow } = this.state;
        if(e.target.nodeName === "BUTTON"){
            if(isFollow){
                deleteFollow( myID, id ).then(_=>{
                    this.setState({
                        isFollow: !isFollow
                    });
                });
            }
            else{
                addFollow( myID, id ).then(_=>{
                    this.setState({
                        isFollow: !isFollow
                    });
                });
            }
        }
        else{
            this.props.history.push(`/${id}`);
        }
    }

    movePage = (e) => {
        e.preventDefault();

        if(e.target.nodeName !== 'BUTTON')
            this.props.history.push(`/${this.state.id}`);
    }

    renderProfile = () => {
        const {informationCheck,informationCheck2} = this.state;
        if(informationCheck && informationCheck2){
            const { id, isMe, isFollow } = this.state;
            const { profileImg, name } = this.state.profile;
            return <div className = "FollowProfile" onClick={this.handleClick}>
                <div className = "FollowProfile-Column">
                    <div className = "FollowProfile-ProfileImage" >
                        <ProfileImage profileImg = {profileImg} alt = {name}/>
                    </div>
                    <div className = "FollowProfile-Info">
                        <span className = "Nickname"> {name} </span>
                        <span className = "Id"> {"@" + id} </span>
                    {isFollow != null &&
                    <div className = "FollowProfile-Follow-Btn">
                        <FollowButton
                            isMe = {isMe}
                            isFollow = {isFollow}
                            handleClick = {this.handleClick}
                            />
                            
                    </div>
                    } </div>
                </div>
            </div>
        }
        else
            return null;
    }

    render(){
        return this.renderProfile();
    }
}

function ProfileImage({profileImg, alt}){
    return (
        <img 
        src={profileImg}
        alt={alt}
        style = {{backgroundImage : `url(https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/User.svg)`}}/>
    );
}

const FollowButton = ({ isMe, isFollow, handleClick}) => {
    if(!isMe)
        return(
            <button className = {isFollow === true ? "Following" : "Follow"} onClick = {handleClick}>
                {isFollow  === true? "Following" : "Follow"}
            </button>
        );
    else
        return null;
}

export default withRouter(FollowProfile);
