import { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = (userLoginInfo) => {
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

  console.log(data);
  return (
    <div>
      <div>
        <hr />
        <div className="manual">
          <p>
            新規登録するとこのリストが更新され作成したUSERでログインできます
          </p>
          <p>右上のLOGOUTを押すとLogOutされtopページへ飛びます</p>
          <hr />
          <h1> 登録User一覧</h1>
          <Link to="/adduser" className="topbarIconContainer">
            <button className="useradd">新規ユーザーの追加</button>
          </Link>
        </div>
        <div className="tablewrapper">
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
              {data.map((user) => (
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
