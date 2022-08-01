import React from "react";
import SimpleLineChart from "./ChartComponents/SimpleLineChart";
import Waterfall from "./ChartComponents/Waterfall";
import SimpleBarChart from "./ChartComponents/SimpleBarChart";
import LineBarAreaComposedChart from "./ChartComponents/LineBarAreaComposedChart";
import ScatterChartWithLabels from "./ChartComponents/ScatterChartWithLabels";
import PieChartWithCustomizedLabel from "./ChartComponents/PieChartWithCustomizedLabel";
import SimpleRadarChart from "./ChartComponents/SimpleRadarChart";
import StackedAreaChart from "./ChartComponents/StackedAreaChart";

// https://recharts.org/en-US/api
// npm install rechart --force
// npm audit fix --force
export const Chart = () => {
  return (
    <div className="container">
      <h1>KPIモニタリング</h1>
      <p>まだ何を集計するか。。。考え中、</p>
      <ul type="circle">
        <li>
          案１：広告に関する集計、出稿する側の立場とする。費用とどのサイトがクリックしてくれて購入してくれたか
        </li>
        <li>案２：月別の受注数と受注確定見込みランキング</li>
        <li>案３：予算と企業の着地見込みなど</li>
      </ul>
      <p>
        User以外に入力する対象を決めてグラフで集計する(かなりアルゴリズム難しいと思われる)
      </p>
      <p>
        下記表からいくつか選択し改良する。動的にFIREBASEから値を取得できるようにする
        ※現在に入っている数値は直で入れているもの
      </p>
      <hr />
      <div className="SimpleLineChart">
        <h2>SimpleLineChart</h2>
        <SimpleLineChart />
      </div>
      <hr />
      <div className="Waterfall">
        <h2>WaterfallChart今期受注見通</h2>
        <Waterfall />
      </div>
      <hr />
      <div className="barchartwithminheight">
        <h2>barchartwithminheight サイト別広告クリック数</h2>
        <SimpleBarChart />
      </div>
      <hr />
      <div className="LineBarAreaComposedChart">
        <h2>LineBarAreaComposedChart </h2>
        <LineBarAreaComposedChart />
      </div>
      <hr />
      <div className="LineBarAreaComposedChart">
        <h2>ScatterChartWithLabels </h2>
        <ScatterChartWithLabels />
      </div>
      <hr />
      <div className="LineBarAreaComposedChart">
        <h2>PieChartWithCustomizedLabel </h2>
        <PieChartWithCustomizedLabel />
      </div>
      <hr />
      <div className="LineBarAreaComposedChart">
        <h2>SimpleRadarChart </h2>
        <SimpleRadarChart />
      </div>
      <hr />
      <div className="LineBarAreaComposedChart">
        <h2>StackedAreaChart </h2>
        <StackedAreaChart />
      </div>
    </div>
  );
};
