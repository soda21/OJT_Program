import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AddUser.css";

import { useNavigate } from "react-router-dom";
// データを追加
//https:firebase.google.com/docs/firestore/manage-data/add-data?hl=ja&authuser=0
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// inputsはformSource.jsからフォームの材料を取得
const AddUser = ({ inputs }) => {
  
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  // console.log(inputs);

  // フォームの文字を保存 ログイン用のデータ
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setdata({ ...data, [id]: value });
  };
  console.log("ログイン用のデータ", data);
 
  const onSubmit = async (e) => {
    e.preventDefault();
      try {
      // 認証用のuserを作成する
      // https://firebase.google.com/docs/auth/web/password-auth?hl=ja
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // フォームを保存する
      await setDoc(doc(db, "user", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      // ルートに戻す
      navigate("/")
      
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data)
  return (
    <div className="wrapper">
      <div className="formInput">
        <div className="Title">
          <h1>ユーザーの追加</h1>
        </div>
        <form onSubmit={onSubmit}>
          {inputs.map((input) => (
            <div key={input.name}>
              <label htmlfor="name">{input.label}</label>
              <input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleInput}
              />
            </div>
          ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
