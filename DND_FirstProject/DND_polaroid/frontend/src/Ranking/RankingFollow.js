import React from 'react';
import RankingFollowAll from './RankingFollowAll';
import './RankingFollow.css';

    
const RankingFollow = ({allFollowRanking}) => {
    //<ol> 부터 DB에서 좋아요 많은 것부터 받아와 순서대로 출력
    return(
        <div className = "Ranking-Box">
            <div className = "Ranking-Title">
                총 팔로워 랭킹
            </div>
            
            <div className="Ranking-Box-Like">
                <RankingFollowAll allFollowRanking={allFollowRanking} />
            </div>     
        </div>
    )
}

export default RankingFollow;