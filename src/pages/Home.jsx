import { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import React from "react";

const Home = (userLoginInfo) => {
  const [search, setSearch] = useState("");
  // console.log(userLoginInfo);
  const [data, setData] = useState([]);

  // // firebaseからデータを取得する
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
  console.log(search);
  // console.log(data);
  return (
    <div>
      <div>
        <hr />
        <div className="manual">
          <h3>更新履歴</h3>
          <p>
            新規登録でUSERを新規追加、新規作成したユーザーのメールとパスワード情報を使ってでログイン可能
          </p>
          <p>USER情報の削除、更新ができます。</p>
          <p>右上のLOGOUTを押すとLogOutされtopページへ</p>
          <p>
            8/1右上のKPI_MONITORING作成グラフのたたき台、月別ユーザー数推移など今後使っていきたい
          </p>
          <p>8/2検索作成。要改善、今はまだ名前のみ検索</p>
          <hr />
          {/* 検索------------------------------------------------------- */}
          <div className="seachbox">
            <label htmlfor="name">
              <h1>検索(今現在名前のみ　要改善)</h1>
            </label>
            <input
              className="search"
              placeholder="検索する名前を入力してください..."
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* UserList------------------------------------------------------- */}
            <hr />
            <h1> 登録User一覧</h1>
            <Link to="/adduser" className="topbarIconContainer">
              <button className="useradd">新規ユーザーの追加</button>
            </Link>
          </div>
          <div className="tablewrapper"></div>
          <div>
            <table>
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
                  <tr>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
