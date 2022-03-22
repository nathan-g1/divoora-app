import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import Lasagne from '../images/lasagne.jpeg';
import Stake from '../images/stake.jpeg';
import Pizza from '../images/pizza.jpeg';
import Pasta from '../images/pasta.jpeg';
import Restaurant from '../images/restaurant.jpeg';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { getDishesByRestaurantId } from '../network/calls';
import { useLocation } from 'react-router-dom';


export const getImage = (name: string) => {
  switch (name) {
    case 'Lasagne':
      return Lasagne;
    case 'Stake':
      return Stake;
    case 'Pizza':
      return Pizza;
    case 'Pasta':
      return Pasta;
    default:
      return Lasagne;
  }
}

interface Item {
  restaurantData?: Props;
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
  };
}
interface Dish {
  name: string;
  description: string;
  price: number;
  restaurantId: string;
}

const DetailsPage: React.FC = (props) => {
  const location = useLocation();
  console.log(location.state);
  // @ts-ignore
  const { restaurantData } = location.state;
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const getDishes = async (id?: string) => {
      if (!id) return;
      const dishes = await getDishesByRestaurantId(id);
      setDishes(dishes);
    };

    // Get dishes of the selected restaurant
    console.log(dishes);
    getDishes(restaurantData?.id);
  }, [setDishes]);

  return (
    <div className="bg-secondary">
      <Nav />
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <div className="bg-white p-3 rounded-[3px] mb-5">
              <ul className="p-[30px]">
                <li className="flex flex-nowrap justify-between cursor-pointer p-3 overflow-x-auto">
                  <p className="font-normal leading-5 px-3 bg-divoora text-white text-sm rounded-full">Risotto</p>
                  <p className="font-normal leading-5 px-3 bg-divoora text-white text-sm rounded-full">Pizza</p>
                  <p className="font-normal leading-5 px-3 bg-divoora text-white text-sm rounded-full">Gnocchi</p>
                  <p className="font-normal leading-5 px-3 bg-divoora text-white text-sm rounded-full">Ham</p>
                </li>
              </ul>
              <div className="flex flex-col justify-center p-[30px]">
                <p className="text-primary text-center font-bold ml-5">
                  💵 {restaurantData?.priceRange}
                </p>
                <p className="text-primary text-center font-bold ml-5 mt-3.5">
                📍 {`Lat: ${restaurantData?.location.latitude} Long: ${restaurantData?.location.longitude}`}
                </p>
                <p className="text-primary text-center text-8xl font-bold mt-3.5">{restaurantData?.rating}</p>
                <p className="text-primary self-center text-4xl font-bold mt-3.5">
                  <ReactStars value={restaurantData?.rating} count={5} size={32} color2={'#ffd700'} />
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-2 ...">
            <div className="leading-[30px]">
              <div className="bg-white p-3 rounded-[3px] mb-5">
                <p className="text-xl font-bold	leading-[30px] ml-5 pb-1">{restaurantData?.name} </p>
                <p className="text-card font-bold ml-5">{restaurantData?.description}</p>
                <div className="rounded-md bg-red">
                  <img className="max-w-lg px-3 rounded-md" src={Restaurant} alt="Stake" />
                </div>
                <p className="text-xl font-bold	leading-[30px] ml-5 pb-1 py-3">Dishes</p>
                <div className="horizontal-scroll">
                  {dishes.map((dish, i) => (
                    <div key={i} className="horizontal-scroll-content pr-3 max-w-sm rounded overflow-hidden shadow-lg">
                      <img className="w-200" src={getImage(dish.name)} alt={dish.name} />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{dish.name}</div>
                        <p className="text-gray-700 text-base">{dish.description}</p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          ${10.4 + i}
                        </span>
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Order</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
