import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AddUser.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
// データを追加
//https:firebase.google.com/docs/firestore/manage-data/add-data?hl=ja&authuser=0
import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const UserDetail = () => {
  const [data, setData] = useState({});
  // const { state } = useLocation();
  const detailUserId = useParams();
  // console.log(state.email);
  // console.log(detailedId.id);

  useEffect(() => {
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

  console.log(data);

  const handleUpdate=()=>{

  }

  return (
    <div className="wrapper">
      <div className="formInput">
        <div className="Title">
          <h2>ユーザーの更新</h2>
        </div>
        <form onSubmit={handleUpdate}>
        <label htmlfor="name">名前</label>
          <input
            type="name"
            placehoder="name"
            // onChange={(e) => setname(e.target.value)}
            value={data.name}
          />
        <label htmlfor="name">Email</label>
          <input
            type="email"
            placehoder="email"
            // onChange={(e) => setEmail(e.target.value)}
            value={data.email}
          />
          <br />
          <label htmlfor="name">password</label>
          <input
            type="password"
            placehoder="password"
            // onChange={(e) => setPassword(e.target.value)}
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
