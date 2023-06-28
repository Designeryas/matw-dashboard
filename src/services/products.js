import axios from 'axios';
const Base = process.env.REACT_APP_BASE_URL;

function getAllProducts() {
  return axios.get(`${Base}/checkout/stripe/distinct-products`);
}
function getProductsByCategoryName(categoryName) {
  return axios.post(`${Base}/checkout/category/category-products`,{name: categoryName});
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllProducts,
  getProductsByCategoryName
};
