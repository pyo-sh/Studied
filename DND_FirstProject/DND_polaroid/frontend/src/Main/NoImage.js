import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './NoImage.css'
class NoImage extends Component {
    render(){
        return(
            <div className = "NoImage-Background">
                <div className = "NoImage-Content">
                    <Icon name = "search" size='massive'/>
                    <div className = "NoImage-Search">검색 결과가 없습니다.</div>
                </div>
            </div>
        )
    }
}

export default NoImage;