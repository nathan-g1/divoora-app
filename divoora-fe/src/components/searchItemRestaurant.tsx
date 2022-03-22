import React from 'react';
import { useNavigate } from 'react-router-dom';
import { nFormatter } from '../utils/utils';

interface Item {
  item: Props;
}

export interface Props {
  key: number;
  id: string;
  name: string;
  description: string;
  rating: number;
  priceRange: string;
  location: {
    latitude: number;
    longitude: number;
  }
}

const ItemRestaurant: React.FC<Item> = ({ item }) => {

  const navigate = useNavigate();

  const showDetails = (id: string) => {
    const restaurantData = item;
    navigate('/detail', { state: { restaurantData } });
  }
  
  const { key, id, name, description, rating, priceRange, location } = item;
  // check if description is too long
  const descriptionText = (description && description.length > 200) ? `${description.slice(0, 200)}...` : description;
  return (
    <div key={key} onClick={() => showDetails(id)} className="bg-white cursor-pointer p-3 rounded-[3px] mb-5">
      <p className="text-xl font-bold	leading-[30px] ml-5 pb-1">{name}</p>
      <p className="text-card ml-5">{descriptionText}</p>
      <p className="text-primary ml-5 mt-3.5">
        {nFormatter(rating, 1)} stars
      </p>
    </div>
  );
};

export default ItemRestaurant;
