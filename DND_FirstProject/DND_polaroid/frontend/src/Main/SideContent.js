import React, { Component } from 'react';
import Ranking from '../Ranking/Ranking';
import { getRanking, getLikeMonthRanking, getLikeWeekRanking} from '../Ranking/RakingFunction';
class SideContent extends Component {
    state ={
        allFollowRanking : [],
        monthLikeRanking : [],
        weekLikeRanking : [],
    }
    componentDidMount(){
        getRanking()
        .then(res => {
            this.setState({
                allFollowRanking: res
            })
        })
        getLikeMonthRanking().then(res=> {
            this.setState({
                monthLikeRanking : res
            })
        })
        getLikeWeekRanking().then(res=> {
            this.setState({
                weekLikeRanking : res
            })
        })
    }
    render() {
        const { allFollowRanking , monthLikeRanking, weekLikeRanking } = this.state;
        return (
            <div className = "Side-Content">
                <Ranking title="Ranking" allFollowRanking={allFollowRanking} monthLikeRanking={monthLikeRanking} weekLikeRanking={weekLikeRanking}/>
            </div>
        );
    }
}

export default SideContent;