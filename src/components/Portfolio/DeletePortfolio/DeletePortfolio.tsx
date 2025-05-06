import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete : (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfolio = ({onPortfolioDelete, portfolioValue}: Props) => {
  return (
    <form action="" onSubmit={onPortfolioDelete}>
        <input hidden={true} type="submit" value={portfolioValue}/>
        <button>X</button>
    </form>
  )
}

export default DeletePortfolio