import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import "./AddUser.css";
import { useParams, useNavigate } from "react-router-dom";

import {
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

// データを取得する
const UserDetail = () => {
  const [data, setData] = useState({});
  const detailUserId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useeffect");
    const unsub = onSnapshot(
      collection(db, "user"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        // TODO　1件だけ取得する方法がうまくいかないので全部取得してフィルタをかけたので修正が必要・・・
        setData(list.find((person) => person.id === detailUserId.id));
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [detailUserId]);
// データをupdateする
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userDocumentRef = doc(db, "user", detailUserId.id);
      await updateDoc(userDocumentRef, {
        ...data,
      });

      // ルートに戻す
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
// フォームの内容を更新する
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log(data);
  return (
    <div className="wrapper">
      <div className="formInput">
        <div className="Title">
          <h2>ユーザーの更新</h2>
        </div>
        <form onSubmit={handleUpdate}>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            name="name"
            placehoder="name"
            onChange={handleChange}
            value={data.name}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placehoder="email"
            onChange={handleChange}
            value={data.email}
          />
          <br />
          <label htmlFor="phone">電話番号</label>
          <input
            type="text"
            name="phone"
            placehoder="phone"
            onChange={handleChange}
            value={data.phone}
          />
          <br />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            placehoder="password"
            onChange={handleChange}
            value={data.password}
          />
          <br />
          <button type="submit">update</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
