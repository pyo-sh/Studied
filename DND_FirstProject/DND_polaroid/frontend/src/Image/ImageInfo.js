import React, { Component } from "react";
import "./ImageInfo.css";
import Payment from "./Payment";
import { getFilm, minusFilm } from "./ImageFunction";
import jwt_decode from "jwt-decode";
import { withRouter } from 'react-router-dom';
import AWS from 'aws-sdk';
import {awsconfig} from '../Upload/awsconfig';
import {getImageInfo, getDownCount, plusDownUser, isDownImage } from './ImageFunction';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, addFollow, deleteFollow, isFollowInfo } from '../Profile/ProfileFunction';

const s3 = new AWS.S3({accessKeyId:awsconfig.accessKeyId, secretAccessKey : awsconfig.secretAccessKey});
AWS.config.update({region: awsconfig.region})

class ImageInfo extends Component {
  state = {
    // informationCheck = componentWillMount, 사진의 주인 프로파일이 다 받아졌을 때 true
    informationCheck: false,
    // informationCheck2 = componentWillMount, 지금 로그인된 사람의 정보가 받아졌을 때 true
    informationCheck2: false,
    img : {},
    imgID : '',
    imgName : '',
    imgType : '',
    imgUrl : '',
    category : '',
    tag : [],
    distribute : '',
    price : '',
    downCount : 0,
    commercialAvailable: '',
    copyrightNotice : '',
    noChange : '',
    visibility : 0,
    imgHeight : 0,
    imgWidth : '',
    userID : '',
    uploadDate : '',
    film : 0,
    userProfile: {},
    // 현재 로그인이 안됐으면 myID 아래의 thisID 가 null
    myID: {},
    isDown : '',
  };

  componentWillMount() {
    const imgID = this.props.match.params.id
    getImageInfo(imgID).then(result => {
      const { imgID, imgName, imgType, imgUrl, category, tag, distribute, price, 
        commercialAvailable, copyrightNotice, noChange, 
        imgWidth,imgHeight,
        visibility, uploadDate, userID}
      = result;
      getDownCount(imgID).then(result => {
        let { downCount } = result[0];
        let uploadDate2 = uploadDate.split('T')[0];
        let tag2 = tag.split(' ');
        this.setState({
          imgID,
          imgName,
          imgType,
          imgUrl,
          category,
          tag : tag2,
          distribute,
          price,
          commercialAvailable,
          copyrightNotice,
          noChange,
          imgWidth,
          imgHeight,
          downCount,
          visibility,
          uploadDate : uploadDate2,
          userID
       })
      })
      // 사진의 주인인 userID를 받아서 정보를 받아오는 함수.
      getAllInfo(userID).then(result => {
        this.setState({
          informationCheck: true,
          userProfile: {
            id: result.ID,
            name: result.nickname,
            profileImg: result.profileImg
          }
        })
      })
      
      // 나의 아이디를 토큰으로 받는다. 토큰이 null이면 id도 null
      const myID = getMyID();
      if(myID === userID || myID === null)
        this.setState({
          informationCheck2: true,
          myID: {
            thisID: myID,
            isMe: true,
            isFollow: false
          }
        });
      else
        isFollowInfo(myID, userID).then(result => {
          this.setState({
            informationCheck2: true,
            myID: {
              thisID: myID,
              isMe: false,
              isFollow: result
            }
          });
        })
        isDownImage(imgID, myID).then(res=>{
          this.setState({
            isDown : res
          })
        })
    })
  }

  getID = () => { // ID 불러오기
    let token = "";
    localStorage.usertoken
      ? (token = localStorage.getItem("usertoken"))
      : (token = sessionStorage.getItem("usertoken"));
    const decode = jwt_decode(token);
    const ID = decode.ID;
    return ID;
  }
  _getFilm = () => { // 필름 가져오기
    const ID = this.getID();
    getFilm(ID).then(film => {
      this.setState({
        film
      });
    });
  };
  _minusFilm = price => { // 필름 마이너스
    const ID = this.getID();
    const filmNum = price;
    const info = {
      ID,
      filmNum
    };
    minusFilm(info);
  };

  downloadClick = (price) => {  // S3로부터 다운로드 받게함. 그리고 imgDownloads 테이블에 추가해서 카운트가 하나 늘어나게함.
    let {imgID, imgName, imgUrl} = this.state;
    let urlArray = imgUrl.split("/")
    let bucket = urlArray[2]
    let realBucket = bucket.split('.');
    realBucket = realBucket[0];
    // let Key = urlArray[4];
    let Key = `${urlArray[3]}/${urlArray[4]}`;
    let params = {Bucket: realBucket, Key: Key}
    s3.getObject(params, (err, data) => {
      console.log(data);
      console.log(err);
      let blob=new Blob([data.Body], {type: data.ContentType});
      let link=document.createElement('a');
      const url=window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download',`${imgName}.${data.ContentType}`);
      document.body.appendChild(link);
      link.click();
      const userID = this.getID();
      plusDownUser(imgID, userID, price);
    })}

  onClick = () => {
    if(localStorage.usertoken || sessionStorage.usertoken){
      this._getFilm(); // 토큰이 더 적으면 충전 하게 만들어야함(충전 하는 곳으로 가시겠습니까 정도?) 토큰이 같거나 더 많을 때 다운로드 받을 수 있게
      this.props.handlePayment();
        if(this.state.distribute === "free"){
          this.downloadClick(0);
          alert('다운로드 되었습니다');
        }
    }
    else {
      alert('로그인을 해주세요');
    }
  };

  followOnClick = (e) => {
    const { myID, userID } = this.state;
    if(myID.isFollow){
        deleteFollow( myID.thisID, userID ).then(_=>{
            this.setState({
              myID:{
                ...this.state.myID,
                isFollow: !myID.isFollow
              }
            });
        });
    }
    else{
        addFollow( myID.thisID, userID ).then(_=>{
            this.setState({
              myID:{
                ...this.state.myID,
                isFollow: !myID.isFollow
              }
            });
        });
    }
  }

  renderImageInfo = () => {
    const { informationCheck, informationCheck2 } = this.state;
    if(informationCheck && informationCheck2){
      const {
        // 안쓰는 state 값들 주석 처리 합니다.
        // imgID,
        // imgName,
        imgType,
        // imgUrl,
        category,
        tag,
        distribute,
        price,
        commercialAvailable,
        copyrightNotice,
        noChange,
        // visibility,
        // userID,
        downCount,
        imgWidth,
        imgHeight,
        uploadDate,
   // 페이먼트, 필름
        film,
        userProfile,
        myID
      } = this.state;
      const { payment } = this.props;
      console.log(tag)
      return (
        <div className="ImageInfo">
          <Registrant userProfile={userProfile} myID={myID} followOnClick={this.followOnClick}/>
          <div className="ImageInfo-Column Download">
            <button className={distribute === "free" ?  "Free": "Premium" } onClick={this.onClick}>
              {" "}
              {distribute === "free" ?  "Free Download": "Premium Download"}{" "}
            </button>
          </div>
          {(payment && (distribute !== "free"))? (
            <Payment
              film={film}
              price={price}
              handlePayment={this.props.handlePayment}
              downloadClick={this.downloadClick}
              _minusFilm={this._minusFilm}
              isDown = {this.state.isDown}
              commercialAvailable = {commercialAvailable}
              copyrightNotice = {copyrightNotice}
              noChange = {noChange}
            />
          ) : null}
          <div className="ImageInfo-Column">
            <table className="ImagInfo-Detail">
              <tbody>
                <tr>
                  <td>이미지 타입</td>
                  <td>{imgType}</td>
                </tr>
                <tr>
                  <td>사이즈</td> {/* 사이즈 추가, 업로드 날짜 추가 다운로드 추가 */}
                  <td>{imgWidth+" x "+imgHeight}</td>
                </tr>
                <tr>
                  <td> 업로드 날짜 </td>
                  <td>{uploadDate}</td>
                </tr>
                <tr>
                  <td> 다운로드 </td>
                  <td>{downCount}</td>
                </tr>
                <tr>
                  <td> 카테고리 </td>
                  <td>{category}</td>
                </tr>
                <tr>
                  <td> 태그 </td>
                  {/* <td>{tags.map(tag => ` ${tag}`)}</td> */}
                  <td>{tag}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
     
    }
    else{
      return <React.Fragment></React.Fragment>;
    }
  }
  render(){
    return this.renderImageInfo();
  }
}

function Registrant({ userProfile, myID, followOnClick }) {
  const { profileImg, id, name } = userProfile;
  const { isMe, isFollow } = myID;
  return (
    <div className="ImageInfo-Column Registrant">
      <div className="Registrant-Image">
        <img
          src={profileImg}
          alt={name}
        />
      </div>
      <div className="Registrant-Info">
        <span className="Nickname"> {name} </span>
        <span className="Id"> {"@" + id} </span>
      </div>
      {isMe 
        ?
        null
        :
        <div className="Follow-Btn">
          <button 
            className={isFollow ? "Following" : "Follow"}
            onClick={followOnClick}>
            {isFollow ? "Following" : "Follow"}
          </button>
        </div>
      }
    </div>
  );
}
export default withRouter(ImageInfo);
