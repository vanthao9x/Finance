import React from 'react'

type Props = {}

const Search: React.FC = (props: Props): JSX.Element => {
    const [search , setSearch] = React.useState<string>('');

    const onclick = (err:any) => {
        setSearch(err.target.value);
        console.log(err);
    };
  return (
    <div>
        <input type="text" value={search} onChange={(err) => onclick(err)} />
        <button type="submit" onClick={() => console.log(search)}>Search</button>
    </div>
  )
}

export default Search;