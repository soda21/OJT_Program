import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
// import "./AddUser.css";
import { useParams, useNavigate } from "react-router-dom";

import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore";
const Product = () => {
  const [data, setData] = useState({});

  // フォームの内容を更新する
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocumentRef = doc(db, "product");
      await updateDoc(userDocumentRef, {
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <div className="formInput">
        <div className="Title">
          <h2>商品の登録</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">商品名</label>
          <input
            type="text"
            name="product_name"
            placehoder="name"
            onChange={handleChange}
          />
          <label htmlFor="email">部門</label>
          <input
            type="text"
            name="departent"
            placehoder="departent"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phone">金額</label>
          <input
            type="number"
            name="price"
            placehoder="price"
            onChange={handleChange}
          />

          <br />
          <label htmlFor="password">取引先</label>
          <input
            type="text"
            name="company"
            placehoder="company"
            onChange={handleChange}
          />
          <br />
          <button type="submit">登録する</button>
        </form>
      </div>
    </div>
  );
};
export default Product;
