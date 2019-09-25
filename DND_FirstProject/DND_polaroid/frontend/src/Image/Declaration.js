import React, { Component } from 'react';
import './Declaration.css';

class Declaration extends Component{
    render(){
        return(
            <React.Fragment>
            {
                this.props.isOpen ?
                <React.Fragment>
                    <div className="Declaration-Modal-Overlay" onClick={this.props.close} />
                    <div className="Declaration-Modal">
                        <h3 className="Declaration-Title">신고하기</h3>
                        <div className="Declaration-Content">
                            해당 이미지가 저작권을 침해하거나 부적절한 광고, 혹은 음란성의 이미지일 경우 신고가 가능합니다. 신고된 이미지는 폴라로이드 내의 이미지 가이드에 따라 적절하게 조치될 수 있습니다.<br/><br/>
                            신고하시겠습니까?
                        </div>
                        <div className="Declaration-Button-Wrap">
                            <button className="Declaration-Button-Declaration" onClick={this.props.close}>신고</button>
                            <button className="Declaration-Button-Cancel" onClick={this.props.close}>취소</button>
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

export default Declaration;