import React from "react";
import "./HomepageLineChart.css";
import * as echarts from "echarts";
import { useEffect } from "react";
import { post_code_legend } from "../../data/HomepageLineChartData";
import { line_chart_series } from "../../data/HomepageLineChartData";

export default function HomepageLineChart() {
  useEffect(() => {
    const dom = document.getElementById("container");
    const myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    const option = {
      title: {
        text: "Postcode:",
        left: "35%",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        type: "scroll",
        data: post_code_legend,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        name: "Year",
        nameTextStyle: {
          fontSize: 20,
          padding: -4,
        },
        nameLocation: "center",
        nameGap: 30,
        type: "category",
        boundaryGap: false,
        data: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          margin: 50,
          formatter: "A$ {value}",
          showMinLabel: false,
        },
      },
      series: line_chart_series,
    };

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    window.addEventListener("resize", myChart.resize);

    return () => {
      window.removeEventListener("resize", myChart.resize);
      myChart.dispose();
    };
  }, []);

  return (
    <div id="line_chart">
      <h1 id="chartHeading">Average house prices in NSW</h1>
      <div id="container"></div>
    </div>
  );
}
