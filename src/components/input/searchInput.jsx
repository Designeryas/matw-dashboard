import React, { useState, useEffect } from "react";

const SearchInput = (props) => {
  /* ----------------------------- Start variables ---------------------------- */
  const {
    title,
    placeholder,
    value,
    className,
    onSearch,
  } = props;
  const [inputValue, setInputValue] = useState('');
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Start methods ----------------------------- */

  const handleClearSearch = () => {
    setInputValue('');
    onSearch('');
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Start hooks ------------------------------ */
  useEffect(() => {
    // console.log("search input",value);
    setInputValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
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
          type='text'
          value={inputValue}
          className='focus:outline-none border-0 px-2 text-sm h-[40px] text-stone-600 w-full'
          placeholder={placeholder}
          onChange={e => {
            setInputValue(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <div className="flex items-center justify-center w-5 h-5">
          {inputValue !== '' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer transition-all duration-300 hover:text-[#db346e] hover:rotate-90" onClick={() => handleClearSearch()}>
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
