import React, { Component } from 'react';
import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

class BenefitChart extends Component {
  state = {
    Axis: {
      x: {
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
      columns: [],
      names: {},
      axes: {},
      types: {},
      colors: {}
    }
  };
  ChartInstance;

  getRef = ChartInstance => {
    this.ChartInstance = ChartInstance;
  };

  _dataSet = value => {
    let columns = "";
    let names = {};
    let axes = {};
    let types = {};
    let colors = {};
    columns = [["x"], ["data1"], ["data2"], ["data3"]];
    value.forEach(data => {
      columns[0].push(data.Month + "-01");
      columns[1].push(data.imgCount ? data.imgCount : 0);
      columns[2].push(data.downCount ? data.downCount : 0);
      columns[3].push(data.sumFilm ? data.sumFilm : 0);
    });
    names = {
      data1: "업로드 사진",
      data2: "다운로드",
      data3: "월수익"
    };
    axes = {
      data1: "y",
      data2: "y",
      data3: "y2"
    };
    types = {
      data1 : "bar",
      data2 : "bar",
      data3 : "area-spline"
    };
    colors = {
      data1: "rgb(166, 237, 210)",
      data2: "rgb(82, 185, 195)",
      data3: "rgb(237, 141, 110)"
    };
    this.setState({
      ...this.state.Axis,
      Data: {
        ...this.state.Data,
        names,
        columns,
        axes,
        types,
        colors
      }
    });
  };
  componentDidMount() {
    this._dataSet(this.props.Data);
  }

  render() {
    return (
      <BillboardChart
        data={this.state.Data}
        axis={this.state.Axis}
        style={{ width: "900px" }}
        ref={this.getRef}
      />
    );
  }
}

export default BenefitChart;