import React, { SyntheticEvent } from "react";
import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate }: Props): JSX.Element => {
  return (
    <div className="card">
      <img
        // src="https://images.unsplash.com/photo-1588998675190-62f07565f45f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODA0fHxib2F0fGVufDB8fDB8fHww"
        alt="image"
      />
      <div className="details">
        <h2>
          {searchResult.name} <br /> ( {searchResult.symbol} )
        </h2>
        <p>${searchResult.currency}</p>
      </div>
      <p className="infor">
        {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>       */}
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio 
        symbol={searchResult.symbol}
        onPortfolioCreate={onPortfolioCreate}/>
    </div>
  );
};

export default Card;
