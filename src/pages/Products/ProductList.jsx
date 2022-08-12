import { useEffect, useState } from "react";
import "../Home.css";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import React from "react";
// import Waterfall from "../Chart/ChartComponents/Waterfall";

const Home = (userLoginInfo) => {
  const [orderNameSearch, setOrderNameSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [clientSales, setClientSalesSearch] = useState("");
  const [data, setData] = useState([]);
  // 並び替えをするためusestate　並び替えボタンを押すとboolean値が反転する
  const [orderName, setOrderName] = useState([]);
  const [totalMaximum, setTotalMaximum] = useState("");
  const [MonthlySales, setMonthlySales] = useState();
  //  firebaseからデータを取得--------------------------------------------------------

  useEffect(() => {
    let ignore = false;

    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (!ignore) {
          setData(list);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      ignore = true;
      unsub();
    };
  }, []);

  console.log(data);

  //  グラフ用--------------------------------------------------------


  useEffect(() => {
    // const newData=[...expenses,...chartDataPoints]
    let chartDataPoints = [
      { Date: "2022-01", price: 0 },
      { Date: "2022-02", price: 0 },
      { Date: "2022-03", price: 0 },
      { Date: "2022-04", price: 0 },
      { Date: "2022-05", price: 0 },
      { Date: "2022-06", price: 0 },
      { Date: "2022-07", price: 0 },
      { Date: "2022-08", price: 0 },
      { Date: "2022-09", price: 0 },
      { Date: "2022-10", price: 0 },
      { Date: "2022-11", price: 0 },
      { Date: "2022-12", price: 0 },
    ];
    // for (const expense of expenses) {
    const calculateMonth = () =>
      data.map((expense, index) => {

        chartDataPoints[Number(expense.sale_date.slice(5, 7)) - 1].price +=
          Number(expense.price);
      });
    console.log(chartDataPoints);

    setMonthlySales(chartDataPoints);
    console.log(MonthlySales);
    const dataPointValues = MonthlySales?.map((dataPoint) => dataPoint.price);
    console.log(dataPointValues);
      
    // setTotalMaximum(Math.max(...dataPointValues));
    return () => {
      calculateMonth();
    };
    // console.log(totalMaximum);
  }, []);
  // console.log(MonthlySales);
  // 並び替え---------------------------------------------------------------------------

  // useStateで並び替え管理、並び替えボタンを押したらboolean値反転
  // 反転したらuseeffectで並び替えメソッド発火させる
  useEffect(() => {
    sortByName("product_name");
  }, [orderName.product_name]);
  useEffect(() => {
    sortByName("sale_date");
  }, [orderName.sale_date]);
  useEffect(() => {
    sortByName("company");
  }, [orderName.company]);
  useEffect(() => {
    sortByName("price");
  }, [orderName.price]);

  // 並び替えメソッド　sortTargetにproduct_name,sale_date,companyが渡される
  const sortByName = (sortTarget) => {
    if (orderName[sortTarget]) {
      data.sort((a, b) => {
        // 並び替え
        return b[sortTarget].localeCompare(a[sortTarget]);
      });
    }
    if (orderName[sortTarget] === false) {
      data.sort((a, b) => {
        return a[sortTarget].localeCompare(b[sortTarget]);
      });
    }
  };

  // 検索---------------------------------------------------------------------------
  const search = (data) => {
    return data.filter(
      (item) =>
        item.product_name?.includes(orderNameSearch) &&
        item.company?.includes(clientSearch) &&
        item.price?.includes(clientSales)
    );
  };
  // 削除-------------------------------------------------------------------------
  const handleDelete = async (id) => {
    if (window.confirm("本当に削除しますか")) {
      try {
        await deleteDoc(doc(db, "product", id));
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(orderName.product_name);
  // console.log(orderName.sale_date);
  // console.log(orderName.company);
  // console.log(orderName.price);
  return (
    <div>
      <hr />
      <hr />
      {/* 検索・並び替え------------------------------------------------------- */}
      <div className="optionContainer">
        <div className="title_Name">
          <h1>受注情報</h1>
        </div>
        <hr />
        <div className="SearchContainer">
          <h2>検索</h2>
          <div className="seachbox">
            <span className="searchfield">
              <label htmlFor="supplier">取引先</label>
              <input
                className="search"
                placeholder="検索する名前を入力..."
                onChange={(e) => setClientSearch(e.target.value)}
              />
            </span>
            <span className="searchfield">
              <label htmlFor="commodity">商品名</label>
              <input
                className="search"
                placeholder="検索する商品名を入力"
                onChange={(e) => setOrderNameSearch(e.target.value)}
              />
            </span>
            {/* <span className="searchfield">
              <label htmlFor="Order_recipient">受注先部門</label>
              <input
                className="search"
                placeholder="検索する受注先を入力..."
                onChange={(e) => setClientSearch(e.target.value)}
              />
            </span> */}
            <span className="searchfield">
              <label htmlFor="Order_recipient">金額</label>
              <input
                className="search"
                placeholder="検索する受注先を入力..."
                onChange={(e) => setClientSalesSearch(e.target.value)}
              />
            </span>
          </div>
        </div>
        <hr />
        <div className="orderContainer">
          <div className="orderByName">
            <h2>並び替え</h2>
            <span className="searchfield">
              <button
                className="order_btn"
                onClick={(prev) => {
                  // 並び替えボタンを押すとtrue、false反転する
                  console.log(prev);
                  setOrderName({
                    product_name: !orderName.product_name,
                    ...prev,
                  });
                }}
              >
                商品名
              </button>
            </span>
            <span className="searchfield">
              <button
                className="order_btn"
                onClick={(prev) => {
                  // 並び替えボタンを押すとtrue、false反転する
                  setOrderName({ company: !orderName.company, ...prev });
                }}
              >
                受注先
              </button>
            </span>
            <span className="searchfield">
              <button
                className="order_btn"
                onClick={(prev) => {
                  // 並び替えボタンを押すとtrue、false反転する
                  setOrderName({ sale_date: !orderName.sale_date, ...prev });
                }}
              >
                納品日
              </button>
            </span>
            <span className="searchfield">
              <button
                className="order_btn"
                onClick={(prev) => {
                  // 並び替えボタンを押すとphoneプロパティがtrue、false反転する
                  setOrderName({ price: !orderName.price, ...prev });
                }}
              >
                金額
              </button>
            </span>
            <span>最大売上高{totalMaximum}</span>
            <table>
              <tbody>
                <tr>
                  <th>月</th>
                  <th>売上</th>
                </tr>
                {MonthlySales?.map((sales) => (
                  <tr key={sales?.Date}>
                    <td> {sales?.Date}</td>
                    <td> {sales?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr />
      {/* Chart------------------------------------------------------- */}
      {/* <div className="graphcontainer">
           
            <div className="simpoleBarChart"> <BarChartComponent /> </div>
          </div> */}

      {/* UserList------------------------------------------------------- */}
      <hr />
      <div className="inputContainer">
        <h2> 受注商品の登録</h2>
        <Link to="/product" className="topbarIconContainer">
          <button className="useradd">受注商品の登録</button>
        </Link>
      </div>
      <div className="tablewrapper"></div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>納品日</th>
              <th>商品名</th>
              <th>受注先企業</th>
              <th>受注部門</th>
              <th>金額</th>

              {/* <th>password</th> */}
              <th>詳細画面</th>
              <th>削除</th>
            </tr>
            {search(data)?.map((user) => (
              <tr key={user?.product_name}>
                <td> {user?.sale_date}</td>
                <td> {user?.product_name}</td>
                <td>{user?.company}</td>
                <td>{user?.departent}</td>

                <td> {user?.price}</td>
                {/* <td> {user.password}</td> */}
                <td>
                  <Link
                    to={`/product/${user.id}`}
                    // state={{ email: `${user.id}` }}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="viewButton">詳細画面</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(user.id)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
