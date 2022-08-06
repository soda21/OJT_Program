import { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import React from "react";
import Waterfall from "../Chart/ChartComponents/Waterfall";
import BarChartComponent from "../Chart/ChartComponents/BarChartComponent";

const Home = (userLoginInfo) => {
  const [nameSearch, setNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [phoneNSearch, setphoneNSearch] = useState("");
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
      collection(db, "user"),
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
console.log(data)
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
    sortByName("name");
    // エラーがでるのでボタン押すメソッドをdependencyに
  }, [nameSort]);
  useEffect(() => {
    sortByName("email");
  }, [orderName["email"]]);
  useEffect(() => {
    sortByName("phone");
  }, [orderName["phone"]]);

  // 並び替えメソッド　sortTargetにname,email,phoneが渡される
  const sortByName = (sortTarget) => {
    console.log("初回3回再レンダリング？・・・", orderName);
    // useStateのorderNameのブーリアン値trueだったら(sortTargetはname,email,phone)
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
        item.name.includes(nameSearch) &&
        item.email.includes(emailSearch) &&
        item.phone.includes(phoneNSearch)
    );
  };
  // 削除-------------------------------------------------------------------------
  const handleDelete = async (id) => {
    if (window.confirm("本当に削除しますか")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div>
        <hr />
        {/* 更新履歴------------------------------------------------------- */}
        <div className="manual">
          <h3>更新履歴</h3>
          <p>
            新規ユーザーの追加、新規ユーザーのメールとパスワードでログイン可能
          </p>
          <p>USER情報の削除、更新</p>
          <p>右上のLOGOUTを押すとLogINページへ</p>
          <p>
            8/1右上Navbar、KPI_MONITORINGリンク作成。グラフのたたき台。月別ユーザー数推移など今後使っていく。
          </p>
          <p>8/3並び替え、要改善、contextAPIかReduxでGlobalに値に管理させる</p>
          <p>8/3ダミー値での表を作成</p>
          <p>
            8/4検索(名前、Email、電話番号で＆検索可能)、今後contextAPIかReduxにリファクタリング予定{" "}
          </p>
          <p>
            8/5並び替え。(名前、Email、電話番号で並び替え可能)、今後contextAPIかReduxにリファクタリング予定{" "}
          </p>
          <hr />
          {/* 検索・並び替え------------------------------------------------------- */}
          <h2>検索</h2>
          <div className="seachbox">
            <span className="searchfield">
              <label htmlFor="name">名前</label>
              <input
                className="search"
                placeholder="検索する名前を入力してください..."
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </span>
            <span className="searchfield">
              <label htmlFor="email">Email</label>
              <input
                className="search"
                placeholder="検索するemailを入力してください..."
                onChange={(e) => setEmailSearch(e.target.value)}
              />
            </span>
            <span className="searchfield">
              <label htmlFor="phone">電話番号</label>
              <input
                className="search"
                placeholder="検索する電話番号を入力してください..."
                onChange={(e) => setphoneNSearch(e.target.value)}
              />
            </span>
          </div>
          <div className="orderbox">
            <h2>並び替え</h2>
            <span className="searchfield">
              <button className="order_btn" onClick={nameSort}>
                名前
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
                Email
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
                Phone
              </button>
            </span>
          </div>
          <hr />
          {/* Chart------------------------------------------------------- */}
          <div className="graphcontainer">
           
            <div className="simpoleBarChart"> <BarChartComponent /> </div>
          </div>

          {/* UserList------------------------------------------------------- */}
          <hr />
          <h2> 登録User一覧</h2>
          <Link to="/adduser" className="topbarIconContainer">
            <button className="useradd">新規ユーザーの追加</button>
          </Link>

          <div className="tablewrapper"></div>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>名前</th>
                  <th>Email</th>
                  <th>電話番号</th>
                  {/* <th>password</th> */}
                  <th>削除</th>
                  <th>更新</th>
                </tr>
                {search(data).map((user) => (
                  <tr key={user.name}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td> {user.phone}</td>
                    {/* <td> {user.password}</td> */}
                    <td>
                      <div
                        className="deleteButton"
                        onClick={() => handleDelete(user.id)}
                      >
                        削除
                      </div>
                    </td>
                    <td>
                      {/* emailを渡すときは上のようにする今回は使わなかった・・・ */}
                      {/* <Link to={`/user/${user.id}`} state={{ email:`${user.email}`}} style={{ textDecoration: "none" }}> */}
                      <Link
                        to={`/user/${user.id}`}
                        state={{ email: `${user.email}` }}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="viewButton">更新</div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
