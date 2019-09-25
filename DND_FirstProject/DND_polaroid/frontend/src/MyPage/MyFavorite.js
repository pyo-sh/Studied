import React, { Component } from 'react';
import { getAllFavorite, delFavImg } from './MyPageFunction';
import './MyFavorite.css';
import MyPagePhotos from './MyPagePhotos';
import { getFolder, addFolder, delFavFolder } from '../Image/ImageFunction';

class MyFavorite extends Component {
    state = {
        ID:'',
        // favorite에 관한 데이터를 받을 때의 전체 데이터.
        favoriteFolder: [],
        // 현재 출력하고 있는 폴더
        nowPage: 0,
        // 현재 사람의 폴더 리스트 ( 현재 사람의 폴더번호 리스트. )
        folder: [],
        folderLength: 0,

        input: "",
        clickAddFolder: false,
        folderCheck : false
    }
    // 지금 자신의 아이디를 가져온 뒤, favorite 폴더를 불러온다.
    componentWillMount() {
        const ID = this.props.getID();
        this.setState({
            ID: ID
        });
        this.getFolderList(ID);
    }

    // 현재 사람의 폴더가 있는지 없는지 검사, 있으면 setState해서 폴더를 세팅시킨다.
    getFolderList = (ID) => {
        let folder = [];
        getFolder(ID).then(res => {
            if(res.length !== 0){
                folder = res
            }
            else{
                this.setState({
                    nowPage: 0
                });
            }
            this.setState({
                folder: folder,
                folderLength: folder.length,
            });
            if(folder.length !== 0){
                this.setFolderList(ID);
            }
        });
    }
    // 폴더 리스트를 가져오는 함수.
    setFolderList = (ID) => {
        getAllFavorite(ID).then(res=>{
            this.setState({
                favoriteFolder : res,
                nowPage: 1,
                renderCheck: false
            })
        });
    }

    // 폴더를 클릭 했을 때 발생하는 이벤트.
    favOnClick = (e) => {       
        if(e.target.className==="MyFavorite-Selected-Button"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = "MyFavorite-Unselected-Button";
                return null;
            })
            e.target.className="MyFavorite-Selected-Button";
            console.log(e.target.innerText);
            this.setState({
                nowPage: parseInt(e.target.innerText)
            });
            this.menuOnClick();
        }
    }
    // 폴더를 나열하게 해주는 버튼을 클릭하면 나오는 것.
    menuOnClick = (e) => {
        const { folderCheck } = this.state;
        if(folderCheck){
            this.setState({
                folderCheck: false
            })
        }
        else{
            this.setState({
                folderCheck: true
            })
        }
    }
    // 현재 폴더 삭제 버튼을 눌렀을 때
    menuDeleteOnClick = () => {
        const { folder, nowPage, ID } = this.state;
        delFavFolder(folder[nowPage-1].favFolderNum);
        this.getFolderList(ID);
        alert("현재 폴더를 삭제합니다.")
    }
    // 현재 폴더 삭제 버튼 나오게 하기
    renderMenuDeleteBtn = () => {
        return <button
            className="MyFavorite-Folder-Delete"
            onClick={this.menuDeleteOnClick}>
            현재 폴더 삭제</button>
    }

    // 현재 폴더의 안에있는 사진을 삭제하게 하기
    photoDeleteOnClick = (e) => {
        const {ID, folder, nowPage} = this.state;
        const imgID = parseInt(e.target.parentNode.children[1].children[0].alt);
        const favFolderNum = folder[nowPage-1].favFolderNum;
        delFavImg(favFolderNum, imgID).then(_ => {
            this.getFolderList(ID);
        })
    }

    // 폴더 추가 input 변경 감지
    inputOnChange = e => {
        this.setState({
          input: e.target.value
        });
    };
    //폴더 추가 확인 버튼을 눌렀을 때
    onClickConfirm = () => {
        this.closeNewFolder();
        const { input, ID } = this.state;
        const folderName = input;
        const info = {
            ID,
            folderName
        };
        if(folderName.trim() === ""){
            alert("공백 금지!")
        } 
        else{
            addFolder(info).then(res => {
                this.getFolderList(ID);
            });
        }
    };
    
    //폴더 추가 눌렀을때 상태
    openNewFolder = () => {
      this.setState({ clickAddFolder: true });
    };
    //폴더 추가 취소 상태
    closeNewFolder = () => {
      this.setState({
        clickAddFolder: false,
        input : ''
      });
    };

    // 폴더 추가를 나타내는 input
    _changeNewFolder = () => {
        return (
          <AddNewFolder
            value={this.state.input}
            onChange={this.inputOnChange}
            onClickConfirm={this.onClickConfirm}
            closeNewFolder={this.closeNewFolder}
          />
        );
    };
    //폴더 추가를 나타내는 div
    originNewFolder = () => {
      return (
        <button 
            className = "MyFavorite-Folder-AddBefore" 
            onClick={this.openNewFolder}>
            폴더 추가</button>
      );
    };
    
    _renderButton = (folder) => {
        let buttonDiv = '';
        if(folder !== null){
            buttonDiv = folder.map((res, index) => {
                if(index === 0){
                    return <button
                        className="MyFavorite-Selected-Button"
                        key={index+1}
                        onClick={this.favOnClick}   
                        >{index+1}. {res.favFolderName}</button>
                }
                return <button
                    className="MyFavorite-Unselected-Button"
                    key={index+1}
                    onClick={this.favOnClick}
                    >{index+1}. {res.favFolderName}</button>
            })
        }
        return <React.Fragment>
            <button className="MyFavorite-Fake-Button" onClick={this.menuOnClick}/>
            <div
                className={this.state.folderCheck ? "MyFavorite-Folder-Open":"MyFavorite-Folder-Close"}
                id="MyFavorite-Folders">
                {buttonDiv}</div>
        </React.Fragment>
    }


    _renderFolder = (favoriteFolder, nowPage) => {
        const { ID, folder } = this.state;
        let photoList = [];
        if(folder !== null) {
            favoriteFolder.map((res, index) => {
                if(folder[nowPage-1].favFolderNum === res.favFolderNum){
                    if(res.imgID !== null){
                        const list = {
                            favFolderNum: res.favFolderNum,
                            imgID: res.imgID,
                            imgUrl: res.imgUrl
                        }
                        photoList = photoList.concat(list);
                    }
                }
                return null;
            })
        }
        return (
            <div className="MyFavorite-Files">
                <MyPagePhotos 
                    id={ID}
                    outputType={"FAVORITE"}
                    photoList={photoList}
                    listLength={photoList.length}
                    photoDeleteOnClick={this.photoDeleteOnClick}/>
            </div>
        );
    }

    render() {
        const { favoriteFolder, nowPage, folder, folderLength, clickAddFolder } = this.state;
        return (
            <React.Fragment>
                <div className="MyFavorite-Buttons">
                    {this._renderButton(folder)}
                </div>
                <div className="MyFavorite-Window">
                    <div className="MyFavorite-Window-Buttons">
                        {clickAddFolder
                        ? this._changeNewFolder()
                        : this.originNewFolder()
                        }
                        {folderLength !== 0
                        ? this.renderMenuDeleteBtn()
                        : null
                        }
                    </div>
                    <div className="MyFavorite-FolderControl">
                    </div>
                    {this._renderFolder(favoriteFolder, nowPage)}
                </div>
            </React.Fragment>
        );
    }
}

const AddNewFolder = ({value, onChange, onClickConfirm, closeNewFolder}) => {
    return(
        <div>
            <form className="MyFavorite-Add-Folder">
                <input 
                    type="text"
                    placeholder="폴더 이름 입력" 
                    className="MyFavorit-New-Folder"
                    value={value}
                    onChange={onChange}
                />
                <div className="MyFavorite-Confirm-Area">
                    <button className="MyFavorite-Confirm" onClick={onClickConfirm}>확인</button>
                    <button className="MyFavorite-Cancel" onClick={closeNewFolder}>취소</button>
                </div>     
            </form>
        </div>
    )
} 

export default MyFavorite;
