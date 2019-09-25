import React, { Component } from 'react';
import './DeleteImage.css';

class DeleteImage extends Component{
    render(){
        return(
            <React.Fragment>
            {
                this.props.isOpen ?
                <React.Fragment>
                    <div className="DeleteImage-Modal-Overlay" onClick={this.props.close} />
                    <div className="DeleteImage-Modal">
                        <h3 className="DeleteImage-Title">삭제하기</h3>
                        <div className="DeleteImage-Content">
                            삭제하시면 복구하실 수 없습니다. 삭제하시겠습니까?
                        </div>
                        <div className="DeleteImage-Button-Wrap">
                            <button className="DeleteImage-Button-DeleteImage" onClick={this.props.close}>삭제</button>
                            <button className="DeleteImage-Button-Cancel" onClick={this.props.close}>취소</button>
                        </div>
                    </div>
                </React.Fragment>

                :
                null
            }
        </React.Fragment>
        )
    }
}

export default DeleteImage;