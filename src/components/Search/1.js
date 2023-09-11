// const params = {
//   min_price: "300000",
//   max_price: "500000",
//   min_area: "600",
//   max_area: "700",
//   post_code: "2500",
//   min_transactions: "2",
//   max_transactions: "5",
// };
// fetch(
//   "https://www.huanself.top/propertyData/propertyList?" +
//     new URLSearchParams(params)
// )
//   .then((response) => response.json())
//   .then((json) => console.log(json));

const filterParams = {
  min_price: null,
  max_price: null,
  min_area: null,
  max_area: null,
  post_code: "2500",
  min_transactions: null,
  max_transactions: null,
};
