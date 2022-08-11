import { useEffect, useState } from "react";
import "../Home.css";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import React from "react";
// import Waterfall from "../Chart/ChartComponents/Waterfall";

const Home = (userLoginInfo) => {
  const [clientNameSearch, setclientNameSearch] = useState("");
  const [orderNameSearch, setOrderNameSearch] = useState("");
  const [clientSearch, setClient] = useState("");
  const [data, setData] = useState([]);
  // 並び替えをするためusestate　並び替えボタンを押すとboolean値が反転する
  const [orderName, setOrderName] = useState({
    name: true,
    email: true,
    phone: true,
  });

  //  firebaseからデータを取得--------------------------------------------------------
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  console.log(data);
  // 並び替え---------------------------------------------------------------------------

  // 並び替えボタンを押す------------------------------------------
  const nameSort = (prev) => {
    // 並び替えボタンを押すとnameプロパティがtrue、false反転する
    setOrderName({ name: !orderName.name, ...prev });
  };

  // --------------------------------------------------------------
  // useStateで並び替え管理、並び替えボタンを押したらboolean値反転
  // 反転したらuseeffectで並び替えメソッド発火させる
  useEffect(() => {
    sortByName("product_name");
    // エラーがでるのでボタン押すメソッドをdependencyに
  }, [nameSort]);
  useEffect(() => {
    sortByName("product_name");
  }, [orderName["product_name"]]);
  useEffect(() => {
    sortByName("phone");
  }, [orderName["product_name"]]);

  // 並び替えメソッド　sortTargetにname,email,phoneが渡される
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
        item.product_name?.includes(clientNameSearch) &&
        item.company?.includes(orderNameSearch) &&
        item.departent?.includes(clientSearch)
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
                onChange={(e) => setclientNameSearch(e.target.value)}
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
            <span className="searchfield">
              <label htmlFor="Order_recipient">受注先部門</label>
              <input
                className="search"
                placeholder="検索する受注先を入力..."
                onChange={(e) => setClient(e.target.value)}
              />
            </span>
          </div>
        </div>
        <hr />
        <div className="orderContainer">
          <div className="orderByName">
            <h2>並び替え</h2>
            <span className="searchfield">
              <button className="order_btn" onClick={nameSort}>
                取引先
              </button>
            </span>
            <span className="searchfield">
              <button
                className="order_btn"
                onClick={(prev) => {
                  // 並び替えボタンを押すとemailプロパティがtrue、false反転する
                  setOrderName({ email: !orderName.email, ...prev });
                }}
              >
                商品名
              </button>
            </span>
            <span className="searchfield">
              <button
                className="order_btn"
                onClick={(prev) => {
                  // 並び替えボタンを押すとphoneプロパティがtrue、false反転する
                  setOrderName({ phone: !orderName.phone, ...prev });
                }}
              >
                受注先部門
              </button>
            </span>
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
              <th>受注先部音</th>
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
