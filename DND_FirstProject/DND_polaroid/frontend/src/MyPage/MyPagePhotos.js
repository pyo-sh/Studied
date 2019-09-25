import React, { Component } from 'react';
import './MyPagePhotos.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { CSSGrid, measureItems, makeResponsive,layout } from 'react-stonecutter';
import { getMyDownImg, getMyLikeImg, getAllUploadImg } from './MyPageFunction';
import {Icon} from 'semantic-ui-react';

// 남은거 : 즐겨찾기 url 데이터베이스에서 처리하면
// MyFavorite에서 url과 imgNum만 따로 배열로 추출해낸 뒤
// 이 페이지에 Props로 id, outputType="FAVORITE", 배열, deleteonClick...(미완성 MyFavorite)을 주고
// setFavorite를 props를 이용해 알맞게 바꾼뒤 settingsUpdate에 알맞게 넣고
// 그냥 출력되게함. 출력부분은 제가 건들겠습니다..
class MyPagePhotos extends Component {
    state = {
        images: [],
        countImages: [],
        start: 0,
        count: 30, //한번에 사진 30개씩 부름
        isMore : true,
        outputType : "home"
      };

    componentDidMount(){
        const { id, outputType } = this.props;
        this.settingsUpdate(id, outputType);
    }
    componentDidUpdate(prevProps, prevState) {
        const { id, outputType, listLength } = this.props;
        if(prevProps.outputType !== outputType) {
            this.setState({
                outputType : "home"
            });
            this.settingsUpdate(id, outputType);
        }
        else if(listLength !== prevProps.listLength || prevProps.id !== id){
            this.settingsUpdate(id, outputType);
        }
    }

    // set 관련 함수 = 모든 데이터가 들어오지 않았을 때, 처음 데이터 세팅
    settingsUpdate = ( id, outputType ) => {
        switch(outputType){
            case "UPLOAD" : this.setUpload(id, outputType);
                return ;
            case "DOWNLOADED" : this.setDownloaded(id, outputType);
                return ;
            case "LIKED" : this.setLiked(id, outputType);
                return ;
            case "FAVORITE" : this.setFavorite(outputType);
                return ;
            case "OTHERUPLOAD" : this.setUpload(id, outputType);
                return ;
            default: return null;
        }
    }
    setUpload = (id, outputType) => {
        let isMore = true;
        getAllUploadImg(id).then(res => {
            if(res.length <= 30)
                isMore = false;
            this.setState({
                images: res,
                countImages: res.slice(0,30),
                start: 30,
                isMore : isMore,
                outputType : outputType
            });
        });
    }
    setDownloaded = (id, outputType) => {
        let isMore = true;
        getMyDownImg(id).then(res => {
            if(res.length <= 30)
                isMore = false;
            this.setState({
                images: res,
                countImages: res.slice(0,30),
                start: 30,
                isMore : isMore,
                outputType : outputType
            });
        });
    }
    setLiked = (id, outputType) => {
        let isMore = true;
        getMyLikeImg(id).then(res => {
            if(res.length <= 30)
                isMore = false;
            this.setState({
                images: res,
                countImages: res.slice(0,30),
                start: 30,
                isMore : isMore,
                outputType : outputType
            });
        });
    }
    setFavorite = (outputType) => {
        const { photoList } = this.props;
        let isMore = true;
        if(photoList.length <= 30)
            isMore = false;
        this.setState({
            images: photoList,
            countImages: photoList.slice(0,30),
            start: 30,
            isMore : isMore,
            outputType : outputType
        });
    }

    fetchImages = () => {
        let { images, countImages, start, count, isMore } = this.state;
        if(images.length === countImages.length){
            isMore = false;
        }
        else{
            countImages = countImages.concat(images.slice(start, start+count));
        }
        this.setState({
            countImages: countImages,
            start: start + count,
            isMore: isMore
        })
    }

    renderGrid = () => {
        const { countImages, isMore, outputType } = this.state;
        const Grid = makeResponsive(measureItems(CSSGrid, {measureImages :  true}), {
            maxWidth: 1006
        });
        if(outputType === "UPLOAD" || outputType === "DOWNLOADED" || outputType === "LIKED" || outputType === "OTHERUPLOAD")
            return <InfiniteScroll dataLength = {countImages.length} next = {this.fetchImages} hasMore = {isMore}>
                <Grid className = "MyPagePhotos-Grid" component="ul" columnWidth={330} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                    {countImages.map((image) => (
                        <li key = {image.imgID}>
                            <Link to = {`/imagepage/${image.imgID}`}>
                                <img className = "MyPagePhotos-photo" src={image.imgUrl} alt="이미지"/>
                            </Link>
                        </li>
                    ))}
                </Grid>
            </InfiniteScroll>
        else if(outputType === "FAVORITE")
            return <InfiniteScroll dataLength = {countImages.length} next = {this.fetchImages} hasMore = {isMore}>
                <Grid className = "MyPagePhotos-Grid" component="ul" columnWidth={330} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                    {countImages.map((image) => (
                        <li key = {image.imgID}>
                            <div className="MyPagePhotos-Grid-Delete">
                                <Icon className = "MyPagePhotos-Grid-Delete-Btn" name = "x" onClick={this.props.photoDeleteOnClick} />
                                <Link to = {`/imagepage/${image.imgID}`}>
                                    <img className = "MyPagePhotos-photo" src={image.imgUrl} alt={image.imgID}/>
                                </Link>
                            </div>
                        </li>
                    ))}
                </Grid>
            </InfiniteScroll>
        else
            return null;
    }
   
    render() {
        return <div className = "MyPagePhotos">
                {this.renderGrid()}
            </div>
    }
  }

export default MyPagePhotos;
