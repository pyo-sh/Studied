import React, {Component} from 'react';
import Photos from './Photos';
import SideContent from './SideContent';
import './ContentTop.css';


class Category extends Component {


    upperTitle(){
        let title = this.props.match.params.category;
        title = title.replace('-',' ');
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    explanation(){
        let exp = "";
        switch(this.props.match.params.category){
            case "daily" : exp = "오늘 가장 인기 있는 작품"; break;
            case "weekly" : exp = "이번 주 가장 인기 있는 작품"; break;
            case "monthly" : exp = "이번  달 가장 인기 있는 작품"; break;
            case "Wallpaper" : exp = "컴퓨터,모바일 화면을 위한 HD 배경화면"; break;
            case "Nature" : exp = "광할하고 아름다운 지구의 자연환경"; break;
            case "Fashion" : exp = "자신의 개성을 추구하는 사람들의 스타일"; break;
            case "Illustration" : exp = "인터넷상의 작은 미술관"; break;
            case "Art-Works" : exp = "현실과 가상의 만남"; break;
            case "People" : exp = "초상화부터 사람들의 일상까지"; break;
            case "Patterns" : exp = "고품질의 다양한 텍스쳐"; break;
            case "Architecture" : exp = "전 세계의 건축물에 대한 새로운 감상"; break;
            case "Business" : exp = "사회인들의 치열함"; break;
            case "Animals" : exp = "자연계의 아룸다운 야생동물"; break;
            case "Travel" : exp = "설레는 여행의 순간"; break;
            case "Food" : exp = "가장 행복한 순간"; break;
            default : break;
        }
        return exp;
    }

    render(){
        return (
            <div className = "Content-Top">
                <div className = "Content-Top-Information">
                    <div className = "Title">{this.upperTitle()}</div>
                    <p className = "Explanation">{this.explanation()}</p>
                </div>
                <div className = "Content" id = "content-top-category">
                    <div className = "Content-Left"><Photos category = {this.props.match.params.category} /></div>
                    <div className = "Content-Right"> <SideContent category = {this.props.match.params.category}/> </div>
                </div>
            </div>
        )
    }
}

export default Category;