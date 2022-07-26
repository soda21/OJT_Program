import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc ,onSnapshot} from "firebase/firestore";


const Datatable = () => {
  const [data, setData] = useState([]);
  // // firebaseからデータを取得する
  useEffect(() => {
    //   const fetchData = async () => {
    //     let list = [];
    //     try {
    //       const querySnapshot = await getDocs(collection(db, "users"));
    //       querySnapshot.forEach((doc) => {
    //         // firebaseのデータを保存するデータ形式に注意
    //         list.push({ id: doc.id, ...doc.data() });
    //       });
    //       setData(list);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //     console.log(list);
    //   };
    //   fetchData();
    // LISTEN (REALTIME)DB側でデータ削除されてもリアルタイムで反映させる
    const unsub = onSnapshot(
      collection(db, "users"),
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
    try {
      console.log(id)
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        ユーザーを追加
        <Link to="/users/new" className="link">
          新規登録
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
