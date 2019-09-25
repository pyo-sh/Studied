import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './Image.css';
import {Icon} from 'semantic-ui-react';
import Mark from './Mark';
import Declaration from './Declaration';
import DeleteImage from './DeleteImage';
import { withRouter, Link } from 'react-router-dom';
import { getLikeCount , imgLikeUp, imgLikeDown, isGetLike, isFav, delMyImg } from './ImageFunction';
import { getImageInfo } from './ImageFunction';
// import { getAllInfo } from '../MyPage/MyPageFunction';
import jwt_decode from 'jwt-decode';

class Image extends Component {
  state = {   
    visible: false };

  componentWillMount() {
    const imgID = this.props.match.params.id;
    const loginID = this.getID();
    getImageInfo(imgID).then(result => {
      const { imgWidth, imgHeight, view, userID } = result;
      this.setState({
        imgID,
        imgWidth,
        imgHeight,
        visible: true,
        userID,//사진 올린 유저 ID
        view, 
        loginID     //현재 로그인 유저 ID
      });
     
      this.img.src = `https://poloapp.s3.ap-northeast-2.amazonaws.com/image/${imgID}`;

      if (this.state.imgHeight / this.state.imgWidth >= 0.75)
        this.img.style.cssText = "max-height : 100%; width : auto !important;";
      else
        this.img.style.cssText = "max-width : 100%; height : auto !important;";
    });
  }

  pushMypage = () => {
      this.props.history.push('/mypage');
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

  render() {
    const { userID, imgID, imgWidth, imgHeight, view, loginID } = this.state;
    return (
      <div className="Image-Page">
        <div className="Image-Page-Column">
          <div className="Image-Page-MainImage-Column">
            <img
              className="Image-Page-MainImage"
              ref={c => {
                this.img = c;
              }}
              onLoad={this.onload}
              alt={imgID}
            />
            {this.state.visible && (
              <div className="Watermark">
                <div
                  className="Watermark-Logo"
                  style={{
                    backgroundImage: `url(https://poloapp.s3.ap-northeast-2.amazonaws.com/logo/Logo_white.svg)`
                  }}
                />
                <div className="Watermark-Text">Polaroid</div>
              </div>
            )}
          </div>
        </div>
        <ImageUseInformation userID={userID}  loginID={loginID} imgID={imgID} imgHeight={imgHeight} imgWidth={imgWidth} pushMypage={this.pushMypage} view={view} />
                {/*<p className="Relatied-Title Image-Page-Column"> Related Image</p>*/}
        {/*<RelationImage id = {id}/>*/}
      </div>
    );
  }
}

class ImageUseInformation extends Component {
    
    //Mark가 들어간건 즐겨찾기
    //Dec가 들어간건 신고창
    //Like가 들어간건 좋아요

    state = {
        imgID : "",
        userID : "",
        loginID : "",
        isMarkPopUpOpen: false,
        isMarkClick: false,
        isDecPopUpOpen: false,
        isDelPopUpOpen: false,
        isLikeClick: false,
        like: 0,
        userProfile: {}
    }

    /*componentWillMount(){
        const imgID = this.props.match.params.id
        getImageInfo(imgID).then(result => {
        const {userID} = result;
        
    }*/
    
    componentWillReceiveProps(nextProps) {
        const {imgID, userID, loginID } = nextProps;
        this.setState({
            imgID ,
            userID,
            loginID
        })

        isGetLike(imgID, loginID).then(res => {
            this.setState({
                isLikeClick : res
            })
        });
        isFav(imgID, loginID).then(res => {
            this.setState({
                isMarkClick : res
            })
        });
        getLikeCount(imgID).then(res => {
            if(res){
               this.setState({
                   like: res.data[0].likeCount   //한 번 누르면 증가
               })
            }
       })
    }

    openMarkPopUp = () => {
        this.setState({
            isMarkPopUpOpen: true
        })
    }

    closeMarkPopUp = () => {
        this.setState({
            isMarkPopUpOpen: false,
            isMarkClick: false
        })
    }

    confirmMarkPopUp = () => {
        this.setState({
            isMarkPopUpOpen: false
        })
    }

    openDecPopUp = () => {
        this.setState({
            isDecPopUpOpen: true
        })
    }

    closeDecPopUp = () => {
        this.setState({
            isDecPopUpOpen: false
        })
    }

    openDelPopUp = () => {
        this.setState({
            isDelPopUpOpen: true
        })
    }

    closeDelPopUp = () => { // 이거 누르면 삭제 돼야 함.
        const { imgID } = this.state;
        delMyImg(imgID);
        this.setState({
            isDelPopUpOpen: false
        })
        this.props.pushMypage();
    }

    clickMark = () =>{
        this.setState({
            isMarkClick: true
        })
    }

    reclickMark = () => {
        this.setState({
            isMarkClick: false,
            isMarkPopUpOpen: false
        })
    }

    clickLike = () =>{ // 좋아요 되게 만들어야함.
        const { loginID, imgID } = this.state;
        imgLikeUp(imgID, loginID).then(res => {
            getLikeCount(imgID).then(res => {
                this.setState({
                    isLikeClick: true,
                    like: res.data[0].likeCount   //한 번 누르면 증가
                })
            })
        })
      
    }

    reclickLike = () => {  // 좋아요 사라지게 만들어야함.
        const { loginID, imgID } = this.state;
        imgLikeDown(imgID, loginID).then(res => {
            getLikeCount(imgID).then(res => {
                this.setState({
                    isLikeClick: false,
                    like: res.data[0].likeCount    //한 번 누르면 감소
                })
            })
        })
    }

    deleteOn = () =>{
        return(
        <div className = "Image-UseInforfmation-Item" onClick={this.onClickDelete}>
        <Icon className = "Icon-Trash" name = "trash"/>
        <DeleteImage isOpen={this.state.isDelPopUpOpen} close={this.closeDelPopUp} />
        </div>
        )
    }

    onClickDeclaration = () => {
        this.state.isDecPopUpOpen ? this.closeDecPopUp() : this.openDecPopUp()
    }

    onClickDelete = () => {
        this.state.isDelPopUpOpen ? this.closeDelPopUp() : this.openDelPopUp()
    }

    onClickMark = () => {
        this.state.isMarkPopUpOpen ? this.closeMarkPopUp() : this.openMarkPopUp()
        this.state.isMarkClick ? this.reclickMark() : this.clickMark()
    }

    onClickLike = () => {
        this.state.isLikeClick ? this.reclickLike() : this.clickLike()
    }

    render(){
        const {userID, loginID} = this.state
        let markname = this.state.isMarkClick ? "star" : "star outline"
        let likename = this.state.isLikeClick ? "heart" : "heart outline"
        let _delete = (loginID === userID) ? this.deleteOn() : "" //userID와 loginID가 같으면 삭제 버튼 나오게
        const { imgWidth, imgHeight} = this.props;
        return(
            <div className = "Image-Page-Column">
            <p> {imgWidth +" x "+ imgHeight} </p>
            <div className = "Image-UseInforfmation">
                <div className = "Image-UseInforfmation-Item" onClick={this.onClickDelete}>
                    {_delete}
                </div>
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Declaration" name = "warning circle" onClick={this.onClickDeclaration}/>
                    <Declaration isOpen={this.state.isDecPopUpOpen} close={this.closeDecPopUp} />
                </div>
                <div className = "Image-UseInforfmation-Item">
                    {
                        ((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) 
                        
                        ? 
                        <>
                        <Link to = "/user/login" alt="test"><Icon className = "Icon-Mark" name = {markname} onClick = {this.onClickMark}/></Link>
                        </>
                        : 
                        
                        <Icon className = "Icon-Mark" name = {markname} onClick = {this.onClickMark}/> 
                    }
                        <Mark isOpen={this.state.isMarkPopUpOpen} close={this.closeMarkPopUp} confirm={this.confirmMarkPopUp}/>
                </div>
                <div className = "Image-UseInforfmation-Item"> {/* 좋아요 버튼  */}
                {
                     ((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) 
                        
                     ? 
                     <>
                     <Link className = "Unlike-Link" to = "/user/login" alt="test"><Icon className = "Icon-Like" name = {likename} onClick={this.onClickLike}/>{this.state.like}</Link>
                     </>
                     :
                     <>
                     <Icon className = "Icon-Like" name = {likename} onClick={this.onClickLike}/>
                     {this.state.like}
                     </>
                }
                   
                </div>
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Icon-View " name = "eye"/>
                    {this.props.view}
                </div>
                
            </div>
            </div>
        )
    }
}


// class RelationImage extends Component{
//     state = {
//         image : [{
//             id : "0",
//             tags : ["풍경", "하늘", "푸른"]
//         },{
//             id : "1",
//             tags: ["풍경", "푸른", "태그"]
//         },{
//             id : "2",
//             tags : ["야자수", "푸", "밝은"]
//         },{
//             id : "3",
//             tags : ["풍경", "태", "밝은"]
//         },{
//             id : "4",
//             tags : ["풍경", "태그", "밝은"]
//         }]
//     }

//     searchImage(){
//         const relation = [];
//         this.state.image.some((image) => {
//             let n;
//             if(1 !== image.id){
//                 n = 0;
//                 this.state.image[this.props.id].tags.forEach((tag) => {
//                     if(image.tags.indexOf(tag) !== -1)
//                         n++;
//                 })
//             }
//             if(n >= 1){
//                 relation.push(image);
//             }// 일단은 이렇게!!!!!!! 백엔드에 따라 달라질 것, 동일 카테고리 내에서만 찾는 게 나을듯 
//             if (relation.length === 3) return true; //break
//             else return false; // 계속!
//         })
//         return relation;
//     }


//     render_Image(){
        
//        const relation = this.searchImage().map((image) => {
//             return (
//                 <div className = "Image-Relation" style = {{ backgroundImage : `url(${im[image.id]})`}}/>
//             )
//        })
//        return relation;
//     }

//     render(){
//        
//        return( 
//            <div className = "Image-Page-Column">
//                {this.render_Image()}
//            </div>
//        );
//    }
//}


export default withRouter(Image);