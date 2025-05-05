import React from "react";

interface Props {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  handleSearchChange,
  onSearchSubmit,
  search,
  handleKeyDown
}: Props): JSX.Element => {
  return (
    <>
    <form onSubmit={onSearchSubmit}>
      <input value={search} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
    </form>
    </>
  );
};

export default Search;
