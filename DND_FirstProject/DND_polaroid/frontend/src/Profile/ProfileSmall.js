import React, {Component} from 'react';
import './ProfileSmall.css';
import {withRouter} from 'react-router-dom';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { addFollow, deleteFollow, isFollowInfo,  getUserUpImg } from './ProfileFunction';


// 나인지 아닌지, 팔로우 기능을 추가해줘야 하는지 아닌지. 버튼 추가해주거나 홈페이지로 넘어가주거나,
class ProfileSmall extends Component{
    state={
        // informationCheck = comPonentWillMount 에서 받는 follow버튼의 정보가 받아지면 true
        informationCheck: false,
        // informationCheck2 = getInfo 에서 받는 프로필의 정보가 전부 받아지면 true
        informationCheck2: false,
        userID: "", //내 아이디
        targetID: "",//상대방 아이디
        follow: true,
        isMe: false,
        // true : following, false : follower
        isFollow: true,
        followTargetId: "",
        profile: {
            profileImg: "",
            name: "",
            id: "",
            about: "",
            grade: "일반"
        },
        images : []
    };


    async componentDidMount(){
        const { targetID, isMe, userID } = this.props;
        await isFollowInfo(userID, targetID).then(res => {
            this.setState({
                isFollow: res,
                informationCheck: true,
                userID,
                targetID,
                isMe,
            });
        })
        this.getInfo();
         getUserUpImg(targetID).then(res => {
            this.setState({
                images : res
            })
        })
     }

    async componentDidUpdate(prevProps) {
        if(prevProps.targetID !== this.props.targetID){
            const { targetID, isMe } = this.props;
            await this.setState({
                targetID,
                isMe,
            });
            this.getInfo();
            getUserUpImg(targetID).then(res => {
                this.setState({
                    images : res
                })
            })
        }

    }

    getInfo = () => {
        const ID = this.state.targetID;
        getAllInfo(ID).then(res=> {
            this.setState({
                informationCheck2: true,
                profile: {
                    ...this.state.profile,
                    profileImg: res.profileImg,
                    id: ID,
                    name: res.nickname,
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    handleClick = () => {
        const { targetID, isFollow , userID} = this.state;
        console.log(this.state);
        if(isFollow){
            deleteFollow( userID, targetID ).then(_=>{
                this.setState({
                    isFollow: false
                });
            });
        }
        else{
            addFollow( userID, targetID ).then(_=>{
                this.setState({
                    isFollow: true
                });
            });
        }
    }

    movePage = (e) => {
        e.preventDefault();

        if(e.target.nodeName !== 'BUTTON')
            this.props.history.push(`/${this.state.targetID}`);
    }

    renderProfile = () => {
        // const {informationCheck,informationCheck2} = this.state;
        // if(informationCheck && informationCheck2){
            const { targetID, isMe, isFollow } = this.state;
            const { profileImg, name } = this.state.profile;
            return (
                <div className = "ProfileSmall" onClick = {this.movePage}>
                    <div className = "ProfileSmall-Column">
                        <div className = "ProfileSmall-ProfileImage" onClick = {() => this.props.history.push(`/${targetID}`)}>
                            <ProfileImage profileImg = {profileImg} alt = {name}/>
                        </div>
                        <div className = "ProfileSmall-Info">
                            <span className = "Nickname"> {name} </span>
                            <span className = "Id"> {"@" + targetID} </span>
                            { isFollow != null &&
                            <div className = "ProfileSmall-Follow-Btn">
                                <FollowButton
                                    isMe = {isMe}
                                    isFollow = {isFollow}
                                    handleClick = {this.handleClick}
                                    />
                            </div>
                        }
                        </div>
                    </div>
                    <div className = "ProfileSmall-Column">
                        {this.state.images.map((image, index) => <UserImage image = {image} key = {index}/>)}
                    </div> 
                </div>
            );
        }
    //     else 
    //         return null;
    // }

    render() {
        return this.renderProfile();
    }
}

function ProfileImage({profileImg, alt}){
    return (
        <img src = {profileImg ? profileImg : 'https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/User.svg'} alt = {alt}></img>
    ); // 프로필 사진이 없으면 검게 나오도록, 후에 사진 id로 대체하여 데이터랑 연결될 예정
}

function UserImage({image}){
     return(  // 이미지 아이디받아서 이미지 아이디 따라 나오게 만들어야지.
        <div className = "UserImage" style = {{ backgroundImage : `url(${image.imgUrl})`}} />
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

export default withRouter(ProfileSmall);