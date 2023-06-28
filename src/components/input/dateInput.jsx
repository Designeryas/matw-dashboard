import moment from "moment";
import React, { useState, useEffect } from "react";

const DateInput = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const {
    title,
    placeholder,
    value,
    className,
    onSearch,
    min,
  } = props;
  const [inputValue, setInputValue] = useState('');
  var tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */

  // const handleClearSearch = () => {
  //   setInputValue('');
  //   onSearch('');
  // }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    value && setInputValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  useEffect(() => {
    // console.log("min date", min, inputValue)
    var a = moment(min);
    var b = moment(inputValue);
    // console.log("difference", a.diff(b, 'days'));
    if(title === 'To') {
      if(a.diff(b, 'days') > 0) {
        setInputValue(min);
        onSearch(min)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min])
  /* -------------------------------------------------------------------------- */
  return (
    <div className={`flex flex-col justify-start items-start ${className}`}>
      <label className="text-sm text-stone-400" htmlFor={title}>{title}</label>
      <div className="flex border border-stone-300 rounded text-stone-400 items-center px-2 w-full">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer transition-all duration-150 hover:text-[#49acea]" onClick={() => onSearch(inputValue)}>
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg> */}
        <input
          name={title}
          type='date'
          // max={title === 'From' ? new Date().toISOString().split('T')[0] : tomorrowDate.toISOString().split('T')[0]}
          min={min}
          value={inputValue}
          className='focus:outline-none border-0 text-sm h-[40px] text-stone-600 w-full'
          placeholder={placeholder}
          onChange={e => {
            console.log("to date", e.target.value)
            setInputValue(e.target.value !== '' ? e.target.value : title === 'From' ? '2023-03-15' : tomorrowDate.toISOString().split('T')[0]);
            onSearch(e.target.value !== '' ? e.target.value : title === 'From' ? '2023-03-15' : tomorrowDate.toISOString().split('T')[0])
          }}
        />
        {/* <div className="flex items-center justify-center w-5 h-5">
          {inputValue !== '' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer transition-all duration-300 hover:text-[#db346e] hover:rotate-90" onClick={() => handleClearSearch()}>
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>}
        </div> */}
      </div>
    </div>
  );
};

export default DateInput;
