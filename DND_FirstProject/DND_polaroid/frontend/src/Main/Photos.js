import React, { Component } from 'react';
import NoImage from './NoImage';
import './Photos.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { CSSGrid, measureItems, makeResponsive,layout } from 'react-stonecutter';
import { withRouter } from 'react-router-dom';
import { upImageView } from './MainFunction'
import { getLikeDailyRanking, getLikeWeekRanking, getLikeMonthRanking } from '../Ranking/RakingFunction';

class Photos extends Component {
    
  state = {
        images: [],
        searchimages: [],
        categoryimages: [],
        noImage: false, //true일 경우 이미지 없음
        count: 30, //한번에 사진 30개씩 부름
        start: 0,
        isMore : true,
        outputType : 'home'
    };

    componentDidMount() {
      const { count, start } = this.state;
      if(this.props.location.pathname.includes("category")){
          this.setState({
            outputType : "category"
          })
          axios.get(`/api/images/getAllImagesCategory?start=${start}&count=100`).then(res=>{
            this.setState({images : res.data});
            if(this.props.search){
              this.searchContrast();
            }
            if(this.props.category){
              this.cateContrast();
            }
          })
      }else if(this.props.location.pathname.includes("search")){
        this.setState({
          outputType: "search"
        })
        axios.get(`/api/images/getAllImagesCategory?start=${start}&count=100`).then(res=>{
          this.setState({images : res.data});
          if(this.props.search){
            this.searchContrast();
          }
          if(this.props.category){
            this.cateContrast();
          }
        })
      }
      else {
        this.setState({
        outputType : "home"
      })
      axios.get(`/api/images/getAllImagesCategory?start=${start}&count=${count}`).then(res=>{
        this.setState({images : res.data});
        if(this.props.search){
          this.searchContrast();
        }
        if(this.props.category){
          this.cateContrast();
        }
      })
    }
      
     
   
    }

    componentDidUpdate(prevProps, prevState) { // 서치 값이 달라지면 다시 contrast 하게
      if(prevProps.outputType !== this.props.outputType) {
        this.setState({
          outputType : this.props.outputType
        })
      }
      if(prevProps.search !== this.props.search){
        this.searchContrast();
      } else if(prevProps.category !== this.props.category){
        let { category } = this.props;
        if(category === "daily"){
          this.rankingContrast(category);
        }
        else if(category === "weekly") {
          this.rankingContrast(category);
        }
        else if(category === "monthly") {
          this.rankingContrast(category);
        }
        else {
          this.cateContrast();
        }
      }
    }

    fetchImages = () => {
      const count = this.state.count,
            start = count + this.state.start;
      this.setState({ start: start });
      
      axios.get(`/api/images/getAllImagesCategory?start=${start}&count=${count}`)
      .then(res=>{
        this.setState({ images: this.state.images.concat(res.data)}) // 이즈 모얼인가 뭐 해줘야함.
      })
      //  axios.post(`/api/file/photos`,{count,start})
      //   .then(response => {
         
      //   })
      .catch(err => console.error(err))
     }

     searchContrast = () => {
      let { search } = this.props;
      console.log(this.state.images)
      let searchimages = this.state.images.filter(searchimage => {
          let temp = searchimage.tag.split(',');
          return temp.includes(search)
      })
      this.setState({
          searchimages
      })
      console.log(searchimages)
      let legnth = searchimages.length
      this.props.getPhotoCount(legnth)
      if(legnth === 0){
        this.setState({noImage: true})
      }else{
        this.setState({noImage: false})
      }
    }

    /*noImages = () => {
      if(this.state.legnth === 0){
        this.setState({noImage: !this.state.noImage})
      }
      return this.state.noImage;
      
    }*/
    // getLikeDailyRanking, getLikeWeekRanking, getLikeMonthRanking

    rankingContrast = (rankType) => { // 랭크 타입에 따라 바꾸는 categoryimages
      if(rankType === "daily"){
        getLikeDailyRanking().then(res => {
          this.setState({
            categoryimages : res
          })
        })
      }else if(rankType === "weekly"){
        getLikeWeekRanking().then(res => {
          this.setState({
            categoryimages : res
          })
        })
      }else {
        getLikeMonthRanking().then(res => {
          this.setState({
            categoryimages : res
          })
        })
      }

    }
    cateContrast = () => {
      let { category } = this.props;
      let categoryimages = this.state.images.filter(categoryimage => categoryimage.category.includes(category))
      this.setState({
          categoryimages
      })
    }
    
    onClick = (imgID) => {
      upImageView(imgID)
    }
   
    render() {

      const Grid = makeResponsive(measureItems(CSSGrid, {measureImages :  true }), {maxWidth: 1006 });

      const {outputType, noImage} = this.state
     
        return (
            <div className = "Photos">   {noImage ? <NoImage /> :
            <InfiniteScroll dataLength = {this.state.images.length} next = {this.fetchImages} hasMore = {this.state.isMore} >
                    <Grid className = "Photos-Grid" component="ul" columnWidth={330} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                    {outputType === "home" ?  
                        this.state.images.map((image) => (
                              <li key = {image.imgID} >
                                  <Link to = {`/imagepage/${image.imgID}`} onClick={() => this.onClick(image.imgID)}>
                                    <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                                  </Link>
                              </li>
                        ))  :
                        (outputType === "search" ? 
                          //searchI
                        this.state.searchimages.map((image) => (
                          <li key = {image.imgID} >
                              <Link to = {`/imagepage/${image.imgID}`} onClick={() => this.onClick(image.imgID)}>
                                <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                              </Link>
                          </li>
                        )) : 
                        this.state.categoryimages.map((image) => (
                          <li key = {image.imgID} >
                              <Link to = {`/imagepage/${image.imgID}`} onClick={() => this.onClick(image.imgID)}>
                                <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                              </Link>
                          </li>
                        )))}
                      
                    </Grid>
                </InfiniteScroll> }
                
            </div>
        );
      }
    }   
export default withRouter(Photos);
