import axios from 'axios';
const Base = process.env.REACT_APP_BASE_URL;

function monthlyTotalReport() {
  return axios.post(`${Base}/checkout/reports/monthly-transaction-total`,{status:'Paid'});
}
function monthlyPaymentMethodReport() {
  return axios.post(`${Base}/checkout/reports/monthly-transaction-count`);
}
function monthlyCurrenciesReport() {
  return axios.post(`${Base}/checkout/reports/monthly-currency-count`);
}
function monthlySubscriptionTypeReport() {
  return axios.post(`${Base}/checkout/reports/monthly-subscription-type-count`);
}
function monthlyHostTypeReport() {
  return axios.post(`${Base}/checkout/reports/monthly-host-type-count`);
}
function monthlyProductPurchaseReport(product_id) {
  return axios.post(`${Base}/checkout/reports/monthly-product-purchase-count`,product_id);
}
function dailyQurbanProductsPurchaseReport(info) {
  return axios.post(`${Base}/checkout/reports/daily-qurban-product-purchase-count`,info);
}
function dailyQurbanProductsTransactionTotalReport(info) {
  return axios.post(`${Base}/checkout/reports/qurban-product-transaction-total`,info);
  // return axios.post(`${Base}/checkout/reports/daily-qurban-product-transaction-total`);
}
function zohoReport(info) {
  return axios.post(`${Base}/checkout/zoho/multi-combine-export`,info);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  monthlyTotalReport,
  monthlyPaymentMethodReport,
  monthlyCurrenciesReport,
  monthlySubscriptionTypeReport,
  monthlyHostTypeReport,
  monthlyProductPurchaseReport,
  dailyQurbanProductsPurchaseReport,
  dailyQurbanProductsTransactionTotalReport,
  zohoReport,
};
