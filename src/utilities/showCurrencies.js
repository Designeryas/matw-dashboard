import getSymbolFromCurrency from 'currency-symbol-map';
const ShowCurrencies = (currency,_price,showAbbr = true) => {
  let tempCurrency = currency && currency.toUpperCase();
//   console.log("currency",currency,_price)
  let price = _price;
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  if(price && (Number(price) % 1 !== 0)) {
    price = Number(price).toLocaleString('en', options);
  }
  switch (tempCurrency) {
      case 'USD':
          return <>${price ? price.toLocaleString() : 0}</>
      case 'AUD':
          return <>${price ? price.toLocaleString() : 0}{showAbbr && <small className='ml-1'>{tempCurrency}</small>}</>
      case 'CAD':
          return <>${price ? price.toLocaleString() : 0}{showAbbr && <small className='ml-1'>{tempCurrency}</small>}</>
      case 'GBP':
          return <>{getSymbolFromCurrency(tempCurrency.toLowerCase())}{price ? price.toLocaleString() : 0}</>
      case 'EUR':
          return <>{getSymbolFromCurrency(tempCurrency.toLowerCase())}{price ? price.toLocaleString() : 0}</>
      case 'SGD':
          return <>${price ? price.toLocaleString() : 0}{showAbbr && <small className='ml-1'>{tempCurrency}</small>}</>
      case 'MYR':
          return <>{price ? price.toLocaleString() : 0}{showAbbr && <small className='ml-1'>{tempCurrency}</small>}</>
      default:
          return <>${price ? price.toLocaleString() : 0}</>
  }
};

export default ShowCurrencies;