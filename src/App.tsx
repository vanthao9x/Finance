import React, { useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import { searchCompanies } from './api';
import { CompanySearch } from './company';

function App() {
  const [search , setSearch] = useState<string>('');
  const [searchResult , setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError , setServerError] = useState<string>('');

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
};
const handleSearch = async () => {
  const result = await searchCompanies(search);
  if ( typeof result === 'string') {
    setServerError(result);
  } else if (Array.isArray(result)) {
    setSearchResult(result);
  }
  console.log('Kết quả từ API:', result);
};

const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};

const onclick = async(e: React.MouseEvent<HTMLButtonElement>) => {
  handleSearch();
}

  return (
    <div className="App">
      <Search handleKeyDown={handleKeyDown} onclick ={onclick} search ={search} handleChange={handleChange}/>
      <CardList searchResults={searchResult}/>
      {serverError && <p>Unable to connect to API</p>}
    </div>
  );
}

export default App;
