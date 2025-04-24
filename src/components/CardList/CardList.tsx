import React from 'react'
import Card from '../Card/Card'

type Props = {}

const CardList: React.FC = (props: Props): JSX.Element => {
  return (
    <>
        <Card companyName='Apple' tiker='AAPL' price={110}/>
        <Card companyName='Google' tiker='GOOGL' price={200}/>
        <Card companyName='Microsoft' tiker='MSFT' price={300}/>
    </>
  )
}

export default CardList