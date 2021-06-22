import React from 'react';
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
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  return (
    <div className="searchbar">
      <SearchIcon />
      <input
        placeholder="Search"
        className="searchbar__input"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default Searchbar;
