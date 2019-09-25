import React, {Component} from 'react';
import Image from './Image';
import ImageInfo from './ImageInfo';

class ImageScreen extends Component {
  state = { 
    payment : false
  }

  onClick = () =>{
    this.setState({
      payment : !this.state.payment
    })
  }
  
  render(){
    return (
      <div className="Content">
        <div className = "Content-Left" id = "imageLeft">
          <Image 
            // id = "1"
            // tags = {this.state.image[0].tags} 
            // type = {this.state.image[0].type} 
            // uploadDate = {this.state.image[0].uploadDate} 
            // downloade = {this.state.image[0].downloade} 
            // kategorie = {this.state.image[0].kategorie} 
            // like = {this.state.image[0].like} 
            // isLike = {this.state.image[0].isLike} 
            // view = {this.state.image[0].view} 
            // size = {this.state.image[0].size}
            // key = {this.state.image[0].id} 
            />
        </div>
        <div className = "Content-Right" id = "imageRight">
          <ImageInfo 
            // registrant = {this.state.image[0].registrant}
            // paid = {this.state.image[0].paid}
            // type = {this.state.image[0].type}
            // size = {this.state.image[0].size}
            // uploadDate = {this.state.image[0].uploadDate}
            // download = {this.state.image[0].download}
            // kategorie = {this.state.image[0].kategorie}
            // tags = {this.state.image[0].tags}
          //  }/>
           payment= {this.state.payment}
            handlePayment={this.onClick}
            />
        </div>
      </div>
    );
  }
}

export default ImageScreen;
