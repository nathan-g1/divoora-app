import React from 'react';
import Lasagne from '../images/lasagne.jpeg';
import Stake from '../images/stake.jpeg';
import Pizza from '../images/pizza.jpeg';
import Pasta from '../images/pasta.jpeg';
import { getImage } from '../views/detailsPage';

interface Item {
  item: Props;
}

export interface Props {
  key: number;
  name: string;
  description: string;
  login: string;
}

const ItemDish: React.FC<Item> = ({ item: Item }) => {
  const { key, name, description } = Item;


  return (
    <div key={key} className="bg-white p-3 rounded-[3px] mb-5">
      <p className="text-xl font-bold leading-[30px] ml-5 pb-1 inline">{name} </p>
      <div className='px-3'>
        <div className='flex'>
          <img className='rounded-full w-20 h-auto' src={getImage(name)} />
          <p className="text-card px-3 item-center">{description ?? ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDish;
