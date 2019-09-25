import React, { Component } from 'react';
import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

class UseChart extends Component {
  state={
    Axis: {
      x:{
          type: "timeseries",
          tick: {
              format: "%Y-%m-%d"
          }
      },
      y: {
        tick: {
          culling: {
            max: 5
          }
        }
      },
      y2: {
        show: true,
        tick: {
          culling: true
        }
      }
    },
    Data: {
      x: "x",
      columns: [
      ],
      names: {
      },
      axes: {
      },
      type: "",
      colors: {
      }
    }
  }
  ChartInstance;

  getRef = (ChartInstance) => {
    this.ChartInstance = ChartInstance
  }

  _dataSet = (value) => {
    let columns = '';
    let names = {};
    let axes = {};
    // let types = {};
    let type = '';
    let colors = {};
      columns = [
        ['x',],
        ['data1',],
        ['data2',]
      ];
      value.forEach((data) => {
        columns[0].push(data.Month+"-01");
        columns[1].push(data.chargeFilm ? data.chargeFilm : 0)
        columns[2].push(data.useFilm ? data.useFilm : 0)
      });
      names = {
        data1: "충전 필름",
        data2: "사용 필름",
      };
      axes= {
        data1: "y",
        data2: "y",
      };
      type ="bar";
      colors= {
        data1: "rgb(166, 237, 210)",
        data2: "rgb(82, 185, 195)",
      }
    this.setState({
      ...this.state.Axis,
      Data:{
        ...this.state.Data,
        names,
        columns,
        axes,
        type,
        colors
      }
    });
  }
  componentDidMount(){
    this._dataSet(this.props.Data);
  }
  
  render() {
    return <BillboardChart 
      data={this.state.Data}
      axis={this.state.Axis}
      style={{width : "900px"}}
      ref = {this.getRef}
      />;
  }
}

export default UseChart;