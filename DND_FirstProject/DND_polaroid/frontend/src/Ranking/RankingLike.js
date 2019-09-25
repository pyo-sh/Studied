import React, { Component } from 'react';
import RankingLikeWeek from './RankingLikeWeek';
import RankingLikeMonth from './RankingLikeMonth';
import './RankingLike.css';

class RankingLike extends Component{
    
    state ={
        week: false
    }

    onMouseOver = (e) =>{
        this.setState ({
            week: !this.state.week
        })
    }
    

    render(){
        const opacityHalf = {
            opacity: 0.5,
            background: 'rgb(200, 200, 200)'
        }

        const opacityFull = {
            opacity: 1,
            background: 'white'
        }

        let opacityWeekStyle = this.state.week ? opacityFull : opacityHalf
        let opacityMonthStyle = this.state.week ? opacityHalf : opacityFull
        const { monthLikeRanking, weekLikeRanking } = this.props;
        // DB에서 좋아요 많은 것부터 받아와 순서대로 출력
        return(
            <div className = "Ranking-Box">
                <div className = "Ranking-Title">인기 작품</div>
                <div className="Ranking-Box-Like">
                    <div className = "Ranking-Box-Menu">
                        <div onMouseOver={this.onMouseOver} className = "Ranking-Box-Left" style={opacityWeekStyle}>
                            주간
                        </div>
                        <div onMouseOver={this.onMouseOver} className = "Ranking-Box-Right" style={opacityMonthStyle}>
                            월간
                        </div>
                    </div>  
                
                    {this.state.week ? <RankingLikeWeek weekLikeRanking ={weekLikeRanking}/> : <RankingLikeMonth monthLikeRanking = {monthLikeRanking} /> }
                    
                </div>     
            </div>
        )
    }
}
export default RankingLike;