import './MyProfile.css';
import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import MyProfileGrade from './MyProfileGrade';
import FollowBtn from '../Profile/FollowBtn';
import MyFilmBtn from './MyFilmBtn';

class MyProfile extends Component { // 보유 필름을 내가 추가해봤음.
    state = {
            profileImg: "",
            name: "",
            id: "",
            about: "",
            following: 0,
            follower: 0,
            grade: "일반",
            // 마이프로필인지 다른사람프로필인지 확인하는 boolean
            checkProfile: true
    }
    
    // 처음 실행하기 전 Props를 State로 설정.
    componentWillMount(){
        this._dataSet(this.props.profile);
    }

    // Props가 바뀔때마다 state를 업데이트 해준다.
    componentWillReceiveProps(nextProps){
        this._dataSet(nextProps.profile);
    }

    // 프로파일의 정보를 최신화 시키는 함수
    _dataSet = (data) => {
        const {profileImg, name, id, about, following, follower, grade, checkProfile} = data;
        this.setState({
            profileImg,
            name,
            id,
            about,
            following,
            follower,
            grade,
            checkProfile // 출력되는 프로파일이 MyProfile이면 true, 다른사람 Profile이면 false로 등급 확인
        })
    }

    render() {
        const { profileImg, name, id, about, following, follower, grade, checkProfile } = this.state;
        return (
                <Profile 
                    profileImg={profileImg}
                    name={name}
                    id={id}
                    about={about}
                    following={following}
                    follower={follower}
                    grade={grade}
                    // film={this.state.film}
                    // onClickFollowing={this.props.onClickFollowing}
                    // onClickFollower={this.props.onClickFollower}
                    checkProfile={checkProfile}
                    />
        );
    }
}

class Profile extends Component {
    state = {

    }
    componentDidMount(){
        const props = this.props
        this.setState({
            props
        })
    }
    componentWillReceiveProps(nextProps) {
        const props = nextProps;
        this.setState({
            props
        })
    }
    render(){
        const {profileImg, name, id, about, following, follower, grade, checkProfile} = this.props;
        return(
            <div className="MyProfile">
            <div className="MyProfile-Status">
                <ProfilePhoto profileImg = {profileImg}/>
                <MyProfileGrade name = {name} grade = {grade} checkProfile={checkProfile}/>
            </div>
            <div className="MyProfile-Columns">
                <div className="MyProfile-Private">
                    <strong className="MyProfile-Name">{name}</strong>
                    <span className="MyProfile-Id">@{id}</span>
                </div>
                <div className="MyProfile-About">
                    <LinesEllipsis
                        text={about}
                        maxLine='4'
                        ellipsis=' ...'
                        trimRight
                        basedOn='letters'
                        />
                </div>
                <div className = "MyProfile-Service">
                    <div className="MyProfile-Service-Column">
                        <FollowBtn targetID={id} followNum={following} isFollow={true}/>
                        <FollowBtn targetID={id} followNum={follower} isFollow={false}/>
                    </div>
                    <MyFilmBtn className="MyPage-MyFilmBtn"/>
                </div>
            </div>
        </div>
        )
    }
}
// const Profile = ({profileImg, name, id, about, following, follower, grade, checkProfile}) => {
//     return(
//         <div className="MyProfile">
//             <div className="MyProfile-Status">
//                 <ProfilePhoto profileImg = {profileImg}/>
//                 <MyProfileGrade name = {name} grade = {grade} checkProfile={checkProfile}/>
//             </div>
//             <div className="MyProfile-Columns">
//                 <div className="MyProfile-Private">
//                     <strong className="MyProfile-Name">{name}</strong>
//                     <span className="MyProfile-Id">@{id}</span>
//                 </div>
//                 <div className="MyProfile-About">
//                     <LinesEllipsis
//                         text={about}
//                         maxLine='5'
//                         ellipsis=' ...'
//                         trimRight
//                         basedOn='letters'
//                         />
//                 </div>
//                 <div className="MyProfile-Service">
//                     <FollowBtn targetID={id} followNum={following} isFollow={true}/>
//                     <FollowBtn targetID={id} followNum={follower} isFollow={false}/>
//                 </div>
//             </div>
//         </div>
//     )
// }
 
// const ProfilePhoto = ({profileImg}) => {
//     return(
//         <img className="MyProfile-Photo" src={profileImg} alt="Profile"/>
//     )
// }
class ProfilePhoto extends Component {
    state = {
        profileImg : '',
        visible : false
    }

    componentDidMount(){
        const {profileImg} = this.props
        this.setState({
            profileImg
        })
    }
    componentWillReceiveProps(nextProps) {
        const { profileImg } = nextProps
        setTimeout( () => {
            this.setState({
                profileImg,
                visible : true
            })
        }, 1000)
    }
    render(){
        const { profileImg } = this.state;
        return(
            <img className="MyProfile-Photo" src={profileImg} style = {{backgroundImage : `url(https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/User.svg)`}} alt=''/>
        )
    }
}

export default MyProfile;