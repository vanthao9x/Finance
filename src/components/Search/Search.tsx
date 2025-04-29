import React from "react";

interface Props {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  search: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  handleChange,
  onclick,
  search,
  handleKeyDown
}: Props): JSX.Element => {
  return (
    <div>
      <input type="text" value={search} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}/>
      <button type="submit" onClick={(e) => onclick(e)}>
        Search
      </button>
    </div>
  );
};

export default Search;
