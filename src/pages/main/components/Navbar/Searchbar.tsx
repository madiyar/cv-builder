import React, { useRef } from 'react';
import { context } from 'utils';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="searchbar__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

interface ContextTypes {
  query:string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
};

const Searchbar:React.FC = () => {
  const { query, setQuery } : ContextTypes  = React.useContext<any>(context);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
  const focusOnInput = () => ref.current && ref.current.focus();

  return (
    <div className="searchbar" onClick={focusOnInput}>
      <SearchIcon />
      <input
        ref={ref}
        value={query}
        onChange={handleChange}
        className="searchbar__input"
        placeholder="Search"
      />
    </div>
  );
};

export default Searchbar;
