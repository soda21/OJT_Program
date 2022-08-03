import React from "react";
import SimpleLineChart from "./ChartComponents/SimpleLineChart";
import Waterfall from "./ChartComponents/Waterfall";
import SimpleBarChart from "./ChartComponents/SimpleBarChart";
import LineBarAreaComposedChart from "./ChartComponents/LineBarAreaComposedChart";
import ScatterChartWithLabels from "./ChartComponents/ScatterChartWithLabels";
import PieChartWithCustomizedLabel from "./ChartComponents/PieChartWithCustomizedLabel";
import SimpleRadarChart from "./ChartComponents/SimpleRadarChart";
import StackedAreaChart from "./ChartComponents/StackedAreaChart";
import BarChartComponent from "./ChartComponents/BarChartComponent";
// https://recharts.org/en-US/api
// npm install rechart --force
// npm audit fix --force
export const Chart = () => {
  return (
    <div className="container">
      <h1>KPIモニタリング</h1>
      <p>何を集計するか。。。考え中、</p>
      <ul type="circle">
        <li>
          <p>
            案：広告に関する集計、出稿する側の立場とする。
            広告対効果をモニタリング
          </p>
          <p>
            どのサイトに出稿するのが効果でるのか？出稿しているサイト別に
            クリック数と購入につながった数を集計
          </p>
        </li>
        <li>案：月別の受注数と受注確定見込み</li>
        <li>案：国内売上と海外売上の比率</li>
        <li>案：予算と実績の比較、企業の着地見込みなど</li>
        <li>案：受注と利益率のリスト化</li>
        <li>案：受注利益率を企業別または商品別にスキャッターチャート</li>
        <li>案：契約数と解約数</li>
        <li>案：事業部と受注数</li>

      </ul>
      <p>
        User以外に入力する対象を決めてグラフで集計する(かなりアルゴリズム難しい??)
      </p>
      <p>
        下記表からいくつか選択し改良する。動的にFIREBASEから値を取得できるようにする
        ※現在はダミーデータ
      </p>
      <hr />
      <div className="barchartwithminheight">
        <h2>SimpleLineChart</h2>
        <SimpleLineChart />
      </div>
      <hr />
      <div className="barchartwithminheight">
        <h2>WaterfallChart</h2>
        <Waterfall />
      </div>
      <hr />
      {/* <div className="barchartwithminheight">
        <h2>barchartwithminheight </h2>
        <SimpleBarChart />
      </div> */}
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
      <hr />
      <div className="LineBarAreaComposedChart">
        <h2>BarChartComponent </h2>
        <BarChartComponent />
      </div>
    </div>
  );
};
