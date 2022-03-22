import React, { useEffect } from 'react';
import Nav from '../components/nav';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { queryAtom } from '../App';
import { filterDishes, filterRestaurants, getAllDishes, getAllRestaurants } from '../network/calls';
import { getDistance, nFormatter } from '../utils/utils';
import ItemRestaurant from '../components/searchItemRestaurant';
import ItemDish from '../components/searchItemDish';

const resultRepo = atom({
  key: 'reporesult',
  default: [],
})
const resultUser = atom({
  key: 'usersresult',
  default: [],
})

export const viewAtom = atom({
  key: 'view',
  default: 'restaurant',
});

const ResultPage = () => {
  const query = useRecoilValue(queryAtom);
  const [dishesData, setDishesData] = useRecoilState(resultUser);
  const [restaurantData, setRestaurantData] = useRecoilState(resultRepo);
  const [view, setView] = useRecoilState(viewAtom);
  const userLocation = {
    latitude: -37.8136,
    longitude: 144.9631,
  };

  useEffect(() => {
    const searchReposAndUsers = async (searchQuery: string) => {
      // Searches for restaurants with the query
      let restaurantData = searchQuery ? await filterRestaurants(searchQuery) : await getAllRestaurants();
      // Sort by distance
      // @ts-ignore
      restaurantData = restaurantData.sort((a, b) => {
        const aDistance = getDistance(a.location.latitude, userLocation.latitude, a.location.longitude, userLocation.longitude);
        const bDistance = getDistance(b.location.latitude, userLocation.latitude, b.location.longitude, userLocation.longitude);
        return aDistance - bDistance;
      });

      setRestaurantData(restaurantData);

      // Searches for dishes with the query
      const dishesData = searchQuery ? await filterDishes(searchQuery) : await getAllDishes();
      setDishesData(dishesData);
    };

    searchReposAndUsers(query);
  }, [query, setRestaurantData, setDishesData]);

  const showResultsCount = () => {
    switch (view) {
      case 'restaurant':
        return <>{nFormatter(restaurantData.length, 1)}{' '}{'Restaurants near you'}</>;
      case 'dishes':
        return <>{nFormatter(dishesData.length, 1)}{' '}{'Dishes'}</>;
      default:
        return null;
    }
  }

  const showResults = () => {
    switch (view) {
      case 'restaurant':
        return <>{restaurantData?.map((item, i) => (<ItemRestaurant key={i} item={item} />))}</>;
      case 'dishes':
        return <>{dishesData?.map((item, i) => (<ItemDish key={i} item={item} />))}</>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary">
      <Nav />
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <div className="bg-white p-3 rounded-[3px] mb-5">
              <ul className="p-[30px]">
                <li
                  className={`flex justify-between cursor-pointer	 ${view === 'restaurant' ? 'bg-active' : ''} p-3`}
                  onClick={(e) => setView('restaurant')}
                >
                  <p className="font-normal leading-5 text-primary text-sm">Restaurants</p>
                  <p className="font-normal leading-5 px-3 bg-badge text-primary text-sm rounded-full">
                    {nFormatter(restaurantData?.length, 1)}
                  </p>
                </li>
                <li
                  className={`flex justify-between cursor-pointer	 ${view === 'dishes' ? 'bg-active' : ''} p-3`}
                  onClick={(e) => setView('dishes')}
                >
                  <p className="font-normal leading-5 text-primary text-sm">Dishes</p>
                  <p className="font-normal leading-5 px-3 bg-badge text-primary text-sm rounded-full">
                    {nFormatter(dishesData?.length, 1)}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-2 ...">
            <p className="text-xl font-bold	leading-[30px] py-3">
              {showResultsCount()}
            </p>
            {showResults()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
