import React from 'react';
import './RankingLike.css';
import {Link} from 'react-router-dom';

const RankingLikeWeek = ({weekLikeRanking}) => {
    return(
        <ol className = "Ranking-Box-Text">
            {weekLikeRanking.map((data, index) =>{
                return (
                    <Link to = {`/imagepage/${data.imgID}`}  key={data.imgID}>
                        <li className="Ranking-Box-Ranking">
                            <img src = {`https://poloapp.s3.ap-northeast-2.amazonaws.com/image/${data.imgID}`}  alt = ''/> 
                            <div className = "Ranking-Id">{'@' + data.userID}</div>
                       </li>
                    </Link>
                    );
                }
            )}
        </ol>
    )
}

export default RankingLikeWeek;