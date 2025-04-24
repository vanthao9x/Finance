import React from 'react';
import './Card.css';

interface Props {
  companyName: string;
  tiker: string;
  price: number;
};

const Card : React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className='card'>
      <img src="https://images.unsplash.com/photo-1588998675190-62f07565f45f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODA0fHxib2F0fGVufDB8fDB8fHww" 
          alt="image" />
      <div className='details'>
        <h2>{props.companyName} ( {props.tiker} )</h2>
        <p>${props.price}</p>
      </div>
      <p className="infor">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>      
    </div>
  )
};

export default Card;