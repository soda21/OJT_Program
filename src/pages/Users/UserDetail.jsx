import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AddUser.css";
// import { useLocation } from "react-router-dom";
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

  const detailUserId = useParams();

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

  const handleUpdate = async (e) => {
    e.preventDefault();

   
  };

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
            // onChange={(e) => setFormValue(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placehoder="email"
            onChange={handleChange}
            value={data.email}
            // onChange={(e) => setFormValue(e.target.value)}
          />
          <br />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            placehoder="password"
            onChange={handleChange}
            value={data.password}
            // onChange={(e) => setFormValue(e.target.value)}
          />
          <br />
          <button type="submit">update</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
