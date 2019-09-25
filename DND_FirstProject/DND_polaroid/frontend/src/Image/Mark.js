import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import ChangeNewFolder from "./ChangeNewFolder";
import FolderList from "./FolderList";
import jwt_decode from "jwt-decode";
import "./Mark.css";
import { withRouter } from "react-router-dom";
import { getFolder, addFolder, addPhotoInFolder } from "./ImageFunction";

let selectFolder = "";
let ID = "";
class Mark extends Component {
  id = 1;
  overRide = false;
  state = {
    input: "",
    clickFolder: false,
    clickFolderName: false,
    folder: []
  };

  componentDidMount() {
    this.getAllFolder();
  }
  getAllFolder = () => {
    let token = "";
    localStorage.usertoken
      ? (token = localStorage.getItem("usertoken"))
      : (token = sessionStorage.getItem("usertoken"));
    let decode = "";
    if (token) {
      decode = jwt_decode(token);
      ID = decode.ID;
    }
    getFolder(ID).then(res => {
      const temp = res.map(folder => {
        return { ...folder, checked: false };
      });
      this.setState({
        folder: temp,
        input: ""
      });
    });
  };

  //폴더 추가 눌렀을때 상태
  openNewFolder = () => {
    this.setState({ clickFolderName: true });
  };

  //폴더 추가 취소 상태
  closeNewFolder = () => {
    this.setState({ 
      clickFolderName: false,
      input : ''
    });
  };

  //폴더 추가 취소
  originNewFolder = () => {
    return (
      <div className = "Mark-Title-Display" onClick={this.openNewFolder}>
        폴더 추가
      </div>
    );
  };
  //input박스에 폴더 이름 입력시
  onChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  //폴더 추가 눌렀을때
  _changeNewFolder = () => {
    return (
      <ChangeNewFolder
        value={this.state.input}
        onChange={this.onChange}
        onClickConfirm={this.onClickConfirm}
        closeNewFolder={this.closeNewFolder}
      />
    );
  };
  
  //폴더 추가 확인 버튼을 눌렀을 때
  onClickConfirm = () => {
    this.closeNewFolder();
    const folderName = this.state.input;
    const info = {
      ID,
      folderName
    };
    if(folderName.trim() === ""){
      alert("공백 금지!")
    } 
    else{
      addFolder(info).then(res => {
        this.getAllFolder();
      });
    }
  };

  //만들어진 폴더를 클릭할 때
  onClickFolder = e => {
    this.setState({
      clickFolder: !this.state.clickFolder
    });
  };

  onClickEnd = e => {
    const folderNum = selectFolder;
    const imgID = this.props.match.params.id;
    const info = {
      folderNum,
      imgID
    };
    addPhotoInFolder(info);
    this.props.confirm();
  };

  //폴더 클릭시 체크 표시 나타나게 해줌
  handleToggle = folderNum => {
    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = this.state.folder.findIndex(
      item => item.favFolderNum === folderNum
    );
    const selected = this.state.folder[index]; // 선택한 객체

    //중복 클릭 방지, checked 싹다 false로 바꿈
    const nextFolder = this.state.folder.map(item => ({
      ...item,
      checked: false
    }));

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextFolder[index] = {
      ...selected,
      checked: !selected.checked
    };
    selectFolder = nextFolder[index].favFolderNum;
    this.setState({
      folder: nextFolder
    });
  };

  render() {
    let folderIcon = this.state.clickFolder ? (
      <Icon name="folder open" />
    ) : (
      <Icon name="folder" />
    );

    //폴더 추가 눌렀을 경우...
    let newFolder = this.state.clickFolderName
      ? this._changeNewFolder()
      : this.originNewFolder();

    return (
      <React.Fragment>
        {this.props.isOpen ? (
          <React.Fragment>
            <div className="Mark-Modal-Overlay" onClick={this.props.close} />
            <div className="Mark-Modal">
              <h3 className="Mark-Column">
                <Icon name="plus" onClick = {() => {this.setState({clickFolderName : true})}}/>
                <div className = "Mark-Title">{newFolder}</div>
              </h3>
              <div className="Mark-Content">
                <div>
                  <FolderList
                    folder={this.state.folder}
                    folderIcon={folderIcon}
                    onToggle={this.handleToggle}
                    getAllFolder={this.getAllFolder}
                  />
                </div>
              </div>
              <div className="Mark-Button-Wrap">
                <button className="Mark-Button-Confirm" onClick={this.onClickEnd}>
                  완료
                </button>
                <button className="Mark-Button-Cancel" onClick={this.props.close}>
                  취소
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default withRouter(Mark);
