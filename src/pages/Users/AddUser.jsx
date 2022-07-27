import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// import { auth, db, storage } from "../../firebase";
//https:firebase.google.com/docs/auth/web/password-auth
// import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AddUser.css";

// inputsはformSource.jsからフォームの材料を取得
const AddEdit = ({ inputs }) => {
  console.log(inputs);

  const handleInput = () => {};

  const onSubmit = () => {};
  return (
    <div className="wrapper">
      <div className="formInput">
        <div className="Title">
          <h1>新規ユーザーの追加</h1>
        </div>
        <form onSububmit={onSubmit}>
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

export default AddEdit;
