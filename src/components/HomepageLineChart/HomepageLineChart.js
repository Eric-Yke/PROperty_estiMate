import React from "react";
import "./HomepageLineChart.css";
import * as echarts from "echarts";
import { useEffect } from "react";

export default function HomepageLineChart() {
  useEffect(() => {
    const params = {
      base_year: 2022,
      range_years: 8,
      postcodes: "2500,2145,2170,2148,2760,2153,2250",
    };

    fetch(
      "https://www.huanself.top/info/AveragePrice?" +
        new URLSearchParams(params)
    )
      .then((response) => response.json())
      .then((data) => {
        const post_code_legend = [
          ...new Set(data.map((item) => item.post_code)),
        ];

        const line_chart_series = data.reduce((acc, item) => {
          const { post_code, average_price } = item;

          const existingSeries = acc.find(
            (series) => series.name === post_code
          );
          if (existingSeries) {
            existingSeries.data.push(parseFloat(average_price));
          } else {
            acc.push({
              name: post_code,
              type: "line",
              data: [parseFloat(average_price)],
            });
          }

          return acc;
        }, []);

        //
        const dom = document.getElementById("container");

        const myChart = echarts.init(dom, null, {
          renderer: "canvas",
          useDirtyRect: false,
        });

        const option = {
          title: {
            text: "",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            type: "scroll",
            width: "1000px",
            data: post_code_legend,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
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
      });
  }, []);

  return (
    <div id="line_chart">
      <h1 id="chartHeading">Average house prices in NSW</h1>
      <h2 id="chartHeading">Postcode</h2>
      <div id="container"></div>
    </div>
  );
}
