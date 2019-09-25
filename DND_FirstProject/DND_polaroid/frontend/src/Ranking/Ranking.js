import React from 'react';
import RankingLike from './RankingLike';
import "./Ranking.css";
import RankingFollow from './RankingFollow';


const Ranking = ({title, allFollowRanking, monthLikeRanking, weekLikeRanking}) => {
    return (
        <div className = "Ranking-Main">
            <div className = "Ranking-Area">
                <RankingLike  title={title} monthLikeRanking={monthLikeRanking} weekLikeRanking={weekLikeRanking}/>
            </div>
            
            <div className = "Ranking-Area">
                <RankingFollow title={title} allFollowRanking={allFollowRanking} />
            </div>
           
        </div>
    );
};


export default Ranking;