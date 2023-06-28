import axios from 'axios';
const Base = process.env.REACT_APP_BASE_URL;

function getFailedTrx(info) {
  return axios.post(`${Base}/checkout/stripe/failed-transactions?${info}`);
}
function getTrxs(info) {
  return axios.post(`${Base}/checkout/stripe/combine-export`,info);
}
function getAllTrxs(info) {
  return axios.post(`${Base}/checkout/stripe/multi-combine-order-export`,info);
}
function getMultiProducts(info) {
  return axios.post(`${Base}/checkout/stripe/multi-combine-products-export`,info);
}
function getMultiQurbanProducts(info) {
  return axios.post(`${Base}/checkout/reports/multi-combine-qurban-products-export`,info);
}
function sendReceipt(info) {
  return axios.post(`${Base}/checkout/stripe/send-receipt`,info);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFailedTrx,
  getTrxs,
  sendReceipt,
  getAllTrxs,
  getMultiProducts,
  getMultiQurbanProducts,
};
