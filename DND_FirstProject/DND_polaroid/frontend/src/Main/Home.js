import React, { Component } from 'react';
import MainBanner from './MainBanner';
import Photos from './Photos';
import SideContent from './SideContent';
import './Home.css';

class Home extends Component {
    state = {
        // tag : ["하늘", "동물", "배경"],
        ranking : [],
    }

    render() {
        // const { tag } = this.state;
        return (
            <div >
                <MainBanner />
                <div className="Content">
                    <div className = "Content-Left"><Photos /></div>
                    <div className = "Content-Right"> <SideContent/></div>
                </div>
            </div>
        );
    }
}

export default Home;