import React from 'react';
import './RankingLike.css';
import {Link} from 'react-router-dom';

const RankingFollowAll = ({allFollowRanking}) => {
    return(
        <ol className = "Ranking-Box-Text">
          {allFollowRanking.map((user, index) => {
              return (
                <Link to = {`/${user.userId}`} key={user.userId}>
                    <li className="Ranking-Box-Ranking">
                        <img src = {user.userProfileImg}  alt = ''/> 
                        <div className = "Ranking-Id">{user.userNickname}</div>
                   </li>
                </Link>
                );
            }
            )}
        </ol>
    )
}
export default RankingFollowAll;