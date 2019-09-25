import './FollowBtn.css';
import React, { Component } from 'react';
import FollowPage from './FollowPage';

class FollowBtn extends Component {
    state={
        targetID: "",
        isFollowOpen: false,
        // (버튼의 상태가)true : following, false : follower
        isFollow: true,
        followNum: 0
    }

    componentWillMount(){
        const { targetID, followNum, isFollow} = this.props;
        this.setState({
            targetID: targetID,
            isFollow: isFollow,
            followNum: followNum
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.props.targetID !== nextProps.targetID)
            this.setState({
                targetID: nextProps.targetID
            });
        this._setFollowNum(nextProps.followNum);
    }
    
    _setFollowNum = (data) => {
        const followNum= data;
        this.setState({
            followNum: followNum
        });
    }

    openFollow = () => {
        this.setState({isFollowOpen: true});
    }
    closeFollow = () => {
        this.setState({isFollowOpen: false});
    }
    followOnClick = (e) => {
        this.state.isFollowOpen ? this.closeFollow() : this.openFollow();
    }
    render() {
        const { targetID, isFollowOpen, isFollow, followNum } = this.state;
        return (
            <React.Fragment>
                <FollowButton 
                    followNum={followNum}
                    followType={isFollow}
                    followOnClick={this.followOnClick}
                    />
                {
                    isFollowOpen ?
                    <React.Fragment>
                        <div className="FollowBtn-Modal-Overlay" onClick={this.closeFollow} />
                        <div className="FollowBtn-Modal">
                            <FollowPage 
                                targetID={targetID} 
                                isFollow={isFollow}
                                />
                        </div>
                    </React.Fragment>
                    :
                    null
                }
            </React.Fragment>
        );
    }
}

const FollowButton = ({ followType, followNum, followOnClick }) => {
    if(followType){
        return <button className="FollowBtn-Following" onClick={followOnClick}>
                {followNum} 팔로잉 
            </button>
    }
    else{
        return <button className="FollowBtn-Follower" onClick={followOnClick}>
                {followNum} 팔로워 
            </button>
    }
}

export default FollowBtn;