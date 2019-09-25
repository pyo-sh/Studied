import { editMyPage } from './MyPageFunction';
import './MyProfileEdit.css';
import React, { Component } from 'react';
import axios from 'axios';
import MyWithdrawal from './MyWithdrawal';
import { ResetPwd } from '../Login/UserFunctions';
import { withRouter } from 'react-router-dom';

// /* 현재 작업해야 할 것
//     내 정보란
//         ㅁㄴㄻㄴㄻㄴㄹㄹㅇ 하기
//     쪽지 ??
// 비밀번호 치고 들어가야?
//     계정보호 ??
//     회원정보 변경
//     회원탈퇴
// */

class MyProfileEdit extends Component {
  state = {
    // props로 받아와서 state 업데이트 하고 그거를 db에 보내고~
    //닉넴이랑 어바웃을 state에 업데이트 한다음에 그거를 db로 보내서 db를 업데이트하고
    // props로 받아온 editOnClick 과 getInfo를 실행시켜서 MyPage의 스테이트 값들을 업데이트 시킴
    id: "",
    name: "",
    about: "",
    imgResult: null,
    img: null,
    imgType: "",
    isOpen : false,
    pw: "",
    pwCheck: "",
    pwCheckBoolean: ""
  };

  updateProfileImg =  () => {
    // 유저 정보에 프로필 사진을 업데이트 시킬꺼임 써브밋을 누르면 같이 들어가야 되니깐
    // 프롭스에서 받아와서.. 해야될거같다.
    const { id, img, imgType } = this.state;
    const imageData = {
      id,
      img,
      imgType
    };
    axios.post("/api/upload/profileUpdate", { imageData }).then(res => {
      let returnData = res.data.data.returnData;
      let signedRequest = returnData.signedRequest;
      let imgUrl = returnData.url;
      this.setState({ imgUrl });
      let options = {
        headers: {
          "Content-Type": imgType
        }
      };
         axios
        .put(signedRequest, img, options)
        .then(results => {
          if(results){
            this.setState({ success: true });
            this.props.getInfo();
          }
        })
        .catch(err => {
          alert("ERROR" + JSON.stringify(err));
        });
    });
  };

  handleFileChange = e => {
    // 파일을 올리면 미리보기 되게 만드는 함수
    e.preventDefault();
    let reader = new FileReader();
    let img = e.target.files[0];
    let imgParts = img.name.split(".");
    let imgType = imgParts[1];
    reader.onload = () => {
      this.setState({
        img,
        imgType,
        imgResult: reader.result
      });
    };
    reader.readAsDataURL(img);
  };

  componentDidMount() {
    // 처음 input 상자에 적히게 하기 위함.
    this.setState({
      id: this.props.profile.id,
      name: this.props.profile.name,
      about: this.props.profile.about
    });
  }
  
  // 없어도 될듯
  // componentDidUpdate(prevProps, prevState) {
  //     if(prevProps.profile.about !== this.props.profile.about){
  //         const { id, name, about } = this.props.profile;
  //         this.setState({
  //             id, name, about
  //         })
  //     }
  // }
  
  onSubmit = e => {
    e.preventDefault();
    const { id, name, about, img, pw, pwCheck } = this.state;
    //   console.log(id, name, about);
    const user = {
      id,
      name,
      about
    };
    editMyPage(user)
      .then(res => {
        // 에딧 페이지 후
        alert('수정이 성공적으로 완료되었습니다!');
        this.props.getInfo();
        return res;
      })
      .catch(err => console.error(err));
    if(img){  // 이미지 있을때만 변경 할 수 있게.
      this.updateProfileImg();
    }
    if(pw.trim() !== ""){
      if(pw === pwCheck){
        const user = {id, name, about },
              userPw = {userID: id,PASSWORD: pw};

        editMyPage(user)
          .then(res => {
            // 에딧 페이지 후
            this.props.getInfo();
            return res;
          })
          .catch(err => console.error(err));

        if(img){  // 이미지 있을때만 변경 할 수 있게.
          this.updateProfileImg();
        }
        ResetPwd(userPw).then(_=> {
          this.setState({
            pw: "",
            pwCheck: "",
            pwCheckBoolean: true
          });
           alert('비밀번호가 성공적으로 변경되었습니다!');
        })
      }

      else{
        this.setState({
          pwCheckBoolean: false
        })
      }
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClickOpenDrawal = () => {
    this.setState({
      isOpen : true
     })
  }
  
  onClickCloseDrawal = () => {
    this.setState({
      isOpen : false
     })
  }
  _renderPage = () => {
    if(this.state.isOpen){
      return <MyWithdrawal id = {this.state.id} onClickCloseDrawal = {this.onClickCloseDrawal}/>
    }
    else {
      return <MPE
        onSubmit = {this.onSubmit}
        profile = {this.props.profile}
        imgResult = {this.state.imgResult}
        img = {this.state.img}
        handleFileChange = {this.handleFileChange}
        onChange = {this.onChange}
        name = {this.state.name}
        about = {this.state.about}
        onClickOpenDrawal = {this.onClickOpenDrawal}
        pwCheckBoolean = {this.state.pwCheckBoolean}
        />
    }
  }
  render() {
    return (<>
      {this._renderPage()}
      </>
    );
  }
}

const MPE = ({ onSubmit, profile, imgResult, img, handleFileChange, onChange, name, about, onClickOpenDrawal, pw, pwCheck, pwCheckBoolean }) =>{
  return(
    <div className="MyProfile-Edit">
      <form onSubmit={onSubmit}>
        <div className="MyProfile-Edit-Secend">
          <MPEditPhoto
            profileImg={profile.profileImg}
            imgResult={imgResult}
            img={img}
            handleFileChange={handleFileChange}
          />
        </div>
        <div className="MyProfile-Edit-Secend">
          <div className="MPEdit-Title">닉네임</div>
          <MPEditInput name="name" onChange={onChange} value={name} />
        </div>
        <div className="MyProfile-Edit-Secend">
          <div className="MPEdit-Title">설명</div>
            <MPEditTextarea
              name="about"
              onChange={onChange}
              value={about}
            />
          </div>
        <div className="MyProfile-Edit-Secend2">
          <button className="MyProfile-Open-Btn" onClick = {onClickOpenDrawal}> 회원탈퇴 </button>
          <button type="submit" className="MyProfile-Edit-Btn"> 수정 </button>
        </div>
      </form>
      <div className = "MyProfile-Edit-Box">
      <div className="MyProfile-Edit-Secend">
        <div className="MPEdit-Title">비밀번호</div>
        <div className="MPEdit-Cell2">
          <input 
            className="MPEdit-TdCell-Input"
            name = "pw"
            onChange = {onChange}
            type="password"
            value={pw}></input>
        </div>
      </div>
      <div className="MyProfile-Edit-Secend">
        <div className="MPEdit-Title" id = "pwCheck">비밀번호 <br/>확인</div>
        <div className="MPEdit-Cell2">
          <input 
            className="MPEdit-TdCell-Input"
            name = "pwCheck"
            onChange = {onChange}
            type="password"
            value={pwCheck}></input>
        </div>
      </div>
        <div className="MyProfile-Edit-Secend3">
          <MyInformationIncorrect failedPW={pwCheckBoolean}/>
        </div>
        </div>
      </div>
    
  );
}

const MyInformationIncorrect = ({failedPW}) => {
  if(failedPW === false)
      return <div className="MyInformation-Pw-Incorrect">비밀번호를 다시 입력하세요!</div>
  else
      return <div className="MyInformation-Pw-Incorrect"></div>
}

class MPEditPhoto extends Component {
  state ={
    img : null,
    imgResult : null
  }
  componentDidMount(){
      this.setState({
          img : this.props.img,
          imgResult : this.props.imgResult
      })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
        this.setState({
            img : this.props.img,
            imgResult : this.props.imgResult
        })
    }
  }

  render() {
    return(
      <div className="MPEdit-Cell">
      {/* <img className="MPEdit-Photo" src={photo} alt="Profile" /> */}
        {this.state.imgResult ? 
        <img className="MPEdit-Photo" src={this.state.imgResult} style = {{backgroundImage : `url(https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/User.svg)`}} alt='' /> :      
        <img className="MPEdit-Photo" src={this.props.profileImg} style = {{backgroundImage : `url(https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/User.svg)`}} alt=''/> }

        <div className="MPEdit-Photo-Edit">
          <label for="imgFile">파일 등록</label> 
          <input id="imgFile" type="file" name="img" onChange = {this.props.handleFileChange} />{" "}
          {/*파일 업로드 프리뷰 나오게 만들고 그걸 넣음.*/}
        </div>
      </div>)
  }
}

const MPEditInput = ({name, onChange, value}) => {
    return(
        <div className = "MPEdit-Cell2">
            <input 
            className = "MPEdit-TdCell-Input"
            name = {name}
            onChange = {onChange} 
            value = {value}></input>
        </div>
    );
};

const MPEditTextarea = ({name, onChange, value}) => {
    return(
        <div className="MPEdit-Cell">
            <textarea 
            cols="40" 
            rows="5" 
            className = "MPEdit-TdCell-Textarea"
            name = {name}
            onChange = {onChange} 
            value = {value}/>
        </div>
    );
};

export default withRouter(MyProfileEdit);