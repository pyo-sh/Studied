import React, {Component} from 'react';
import NoImage from './NoImage';
import Users from '../Profile/ProfileSmall';
import jwt_decode from 'jwt-decode';
import './ContentTop.css';
import { getAllUser } from './MainFunction';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, addFollow, deleteFollow } from '../Profile/ProfileFunction';
import './NoImage.css'

class SearchUser extends Component {
    state = {
        userid: [],
        searchids: [],
        noUser: false,
        id: "",
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


    componentDidMount(){
        getAllUser().then(res => {
            this.setState({
                userid: res
            })
            console.log(this.state.userid);
            this.idContrast();
        })
    }

    componentDidUpdate(prevProps, prevState) { // 서치 값이 달라지면 다시 contrast 하게
        if(prevProps.id !== this.props.id){
          this.idContrast();
        }
    }

    getID = () => {
        let token = "";
        localStorage.usertoken
          ? (token = localStorage.getItem("usertoken"))
          : (token = sessionStorage.getItem("usertoken"));
        if (token === null) return null;
        const decode = jwt_decode(token);
        const ID = decode.ID;
        return ID;
      };
    
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
    
    handleClick = () => {
        const myID = getMyID();
        const { id, isFollow } = this.state;
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

    idContrast = () =>{
        let { id } = this.props;
        let searchids = this.state.userid.filter(searchid => searchid.ID.includes(id))
        this.setState({
            searchids
        })
        console.log(searchids)
        let userlength = searchids.length
        this.props.getUserCount(userlength)
        if(userlength === 0){
            this.setState({noUser: true})
        }else{
            this.setState({noUser: false})
        }
    } 

    render() {
        let {noUser} = this.state
        
        return ( 
        <>
            {noUser ? 
            
            <NoImage /> 
            
            :

            this.state.searchids.map(ids => <Users targetID = {ids.ID} userID = {this.getID()} isMe = {ids.ID === this.getID()}/>)
                /*console.log(typeof(Object.values(ids).toString()))
                console.log(this.getID())
                console.log(Object.values(ids).toString() === this.getID())*/   
            }
        </> );
    }
}
 
export default SearchUser;