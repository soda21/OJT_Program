// ※検証用、、、実際のデータで動きを確認するためのシート　後で消す

var items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

// 名前順にソート
const c = items.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }

  // names must be equal
  return 0;
});

// const c =items.sort();
items;

const arrA = [1, 2, 3, 4, 5];
const arrB = [6, 7, 8, 9, 10];
const arrDuplicated = [1, 2, 3, 3, 2, 2, 5];

const dataList = [
  { id: 1, name: "Sapporo" },
  { id: 2, name: "Tokyo" },
  { id: 3, name: "Osaka" },
];
// ルール
// もとの配列は非破壊であること

{
  // 要素を末端に追加

  const element = 0; // 追加したい要素
  const arrNext = [...arrA, element];

  console.log(arrNext);
}

{
  // 要素を先頭に追加

  const element = 0; // 追加したい要素
  const arrNext = [element, ...arrA];

  console.log(arrNext);
}

{
  // 要素の削除（削除したい番号を指定）
  const indexDelete = 0; // 削除したい配列番号
  const arrNext = arrA.filter((_, index) => index !== indexDelete);

  console.log(arrNext);
}

{
  // 配列の順番を逆転

  const arrNext = [...arrA].reverse();

  console.log("もとの配列", arrA);
  console.log("反転配列", arrNext);
}

{
  // 配列の結合
  // const arrNext = array.concat(arrayB);

  const arrNext = [...arrA, ...arrB];

  console.log("もとの配列", arrA);
  console.log(arrNext);
}

{
  // 並び替え（数値配列の昇順）

  const arrNext = [...arrA].sort();

  console.log("並び替え（数値配列の昇順）", arrNext);
}

{
  // 並び替え（数値配列の降順）

  const arrNext = [...arrA].sort((a, b) => b - a);

  console.log("並び替え（数値配列の降順）", arrNext);
}

{
  // 並び替え（IDの昇順）

  const arrNext = [...dataList].sort((a, b) => a.id - b.id);

  console.log("並び替え（IDの昇順）", arrNext);
}

{
  // 並び替え（IDの降順）

  const arrNext = [...dataList].sort((a, b) => b.id - a.id);

  console.log("並び替え（IDの降順）", arrNext);
}

{
  // 並び替え（文字列）
  const arrStr = ["A", "C", "B"];
  const arrNext = [...arrStr].sort((a, b) => a.localeCompare(b));

  console.log("並び替え（文字列の降順）", arrNext);
}

{
  // 新しい要素でうめる

  const arrNext = new Array(10).fill("A");

  console.log("埋めた配列", arrNext);
}

{
  // 含まれているかどうか調べる

  const targetValue = 0; // 条件とする値
  const isHit = arrA.includes(targetValue);

  console.log(isHit);
}

{
  // 要素が1つでも条件に合致するかを調べる

  const targetId = 0; // 条件とするID値
  const isHit = dataList.some((item) => item.id === targetId);

  console.log(isHit);
}

{
  // すべて条件に合致するかを調べる

  const targetId = 0; // 条件とするID値
  const isEvery = dataList.every((item) => item.id === targetId);

  console.log("すべて条件に合致するかを調べる", isEvery);
}

{
  // 条件に合致する要素を調べる

  const targetId = 0; // 条件とするID値
  const item = dataList.find((item) => item.id === targetId);

  console.log(item);
}
{
  // 重複を除いた配列を得る
  // const arrNext = arrayC.filter((x, i, self) => self.indexOf(x) === i);

  const arrNext = Array.from(new Set(arrDuplicated));

  console.log("重複を除いた配列", arrNext);
  console.log("もとの配列", arrDuplicated);
}
// {
//   // 配列のシャッフル
//   // const arrNext = array.sort(() => Math.random() - 0.5);
//   // console.log("シャッフル後の配列", arrNext);
// }

{
  // 数値配列の合計値

  const sum = arrA.reduce((sum, element) => sum + element, 0);

  console.log(sum);
}

{
  // 数値配列の平均値

  const sum = arrA.reduce((sum, element) => sum + element, 0);
  const average = sum / arrA.length;

  console.log(average);
}

{
  // 数値配列で中の値を加工

  const arrNext = arrA.map((item) => item * 2);

  console.log(arrNext);
}

{
  // 配列のシャローコピー

  const arrNext = [...dataList];

  console.log("シャローコピーした配列", arrNext);
}
{
  // 配列のディープコピー

  const arrNext = JSON.parse(JSON.stringify(dataList));

  console.log("ディープクローンした配列", arrNext);
}
{
  // 重複する要素を検出

  const duplicatedValues = [...new Set(arrA)].filter((item) =>
    arrDuplicated.includes(item)
  );

  console.log("重複する要素を検出", duplicatedValues); // [2, 4, 6]
}

// フィルターした商品
// useEffect(() => {
//   setorderData(
//     data.filter((item) =>
//       // Object.entries() を使ってObject → 配列変換
//       // Array.includes配列に特定の要素が含まれるか
//       Object.entries(search).every(([key, value]) =>
//         item[key].includes(value)
//       )
//     )
//   );
// }, [data, orderData, search]);
// useEffect(() => {
//   if (sort === "newest") {
//     setorderData((prev) =>
//       [...prev].sort((a, b) => a.createdAt - b.createdAt)
//     );
//   } else if (sort === "asc") {
//     setorderData((prev) =>
//       [...prev].sort((a, b) => a.price - b.price)
//     );
//   } else {
//     setorderData((prev) =>
//       [...prev].sort((a, b) => b.price - a.price)
//     );
//   }
// }, [sort]);
