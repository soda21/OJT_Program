import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
// import "./AddUser.css";
import { useParams, useNavigate } from "react-router-dom";
import { serverTimestamp, setDoc, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore";
const Product = () => {
  const [data, setData] = useState({});
    const navigate = useNavigate();

  // フォームの内容を更新する
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocumentRef = collection(db, "product");
      const documentRef = await addDoc(userDocumentRef, {
        ...data,
        timeStamp: serverTimestamp(),
      });
      console.log(documentRef);
        // ルートに戻す
        navigate("/productlist")
    } catch (err) {
      console.log(err);
    }
  };
console.log(data)

  return (
    <div className="wrapper">
      <div className="formInput">
        <div className="Title">
          <h2>商品の登録</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">納品日</label>
          <input
            type="date"
            name="sale_date"
            placehoder="納品日"
            onChange={handleChange}
          />
               <label htmlFor="email">商品名</label>
          <input
            type="text"
            name="product_name"
            placehoder="product_name"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">販売元部門</label>
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
