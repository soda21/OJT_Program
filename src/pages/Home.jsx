import { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import React from "react";
import BarChartComponent from "../Chart/ChartComponents/BarChartComponent";

const Home = (userLoginInfo) => {
  const [search, setSearch] = useState("");
  // console.log(userLoginInfo);
  const [data, setData] = useState([]);
  // 並び替えをするためusestate
  const [orderName, setOrderName] = useState(true);

  //  firebaseからデータを取得-------------------------------------
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "user"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        // 名前で昇順に並び替え

        list = list.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        // mapで展開をするためセットする
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

  // 並び替え-------------------------------------
  useEffect(() => {
    sortByName();
  }, [orderName, []]);

  // 名前で並び替え
  const sortByName = () => {
    // console.log(orderName);
    if (orderName) {
      // console.log("並び替えtrue");
      data.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    if (orderName === false) {
      // console.log("並び替えfalse");
      data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
  };
  // 削除-------------------------------------
  const handleDelete = async (id) => {
    if (window.confirm("本当に削除しますか")) {
      try {
        console.log(id);
        await deleteDoc(doc(db, "users", id));
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };
  // console.log(search);
  // console.log(data);
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
          <p>
            8/2検索(名前のみ)、要改善、contextAPIかReduxでGlobalに管理させる
          </p>
          <p>
            8/3並び替え(名前のみ)、要改善、contextAPIかReduxでGlobalに値に管理させる
          </p>
          <p>8/3ダミー値での表を作成</p>
          <p></p>
          <hr />
          {/* 検索・並び替え------------------------------------------------------- */}
          <h2>並び替え、検索(TODO：名前以外での検索、ソート )</h2>
          <span className="seachbox">
            検索(名前のみ)
            <input
              className="search"
              placeholder="検索する名前を入力してください..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              並び替え(名前のみ)
              <button
                className="order_btn"
                onClick={() => {
                  setOrderName(!orderName);
                }}
              >
                名前で並び替え
              </button>
            </div>
          </span>
          <hr />
          {/* Chart------------------------------------------------------- */}
          <div className="graphcontainer">
            <h2>新規登録ユーザー数(今後、登録User数と連動予定)</h2>
            <div className="simpoleBarChart">
              <BarChartComponent />
            </div>
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
                  <th>email</th>
                  <th>電話番号</th>
                  {/* <th>password</th> */}
                  <th>削除</th>
                  <th>更新</th>
                </tr>
                {data
                  .filter((s) => s.name.includes(search))
                  .map((user) => (
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
