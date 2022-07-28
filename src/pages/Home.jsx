import { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
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

  console.log(data);
  return (
    <div>
      <div className="container">
        <hr />
        <p>ヘッダータブのuserAddで新規追加できます！！</p>
        <p>登録するとこのリストが更新され作成したUSERでログインできます</p>
        <p>右上のLOGOUTを押すとLogOutされtopページへ飛びます！！</p>
        <hr />
        <h1> 登録User一覧</h1>

        {data.map((user) => (
          <div key={user.name}>
            <div>名前:  {user.name}</div>
            <div>email : {user.email}</div>
            <div> 電話番号:  {user.phone}</div>
            <div> password:  {user.password}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
