export const githubApi = 'https://api.github.com/graphql';
export const testServerApi = 'https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth';
export const divooraApi = 'http://localhost:3001'

/**
 * Restaurant Search
 * @param {Object}  restaurantName   The name of the restaurant
 * @returns                          Promise of restaurant search results
 */
export const filterRestaurants = async (query: string): Promise<any> => {
  const res = await fetch(`${divooraApi}/restaurants/search/${query}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await res.json();
}
/**
 * Gets all Restaurants
 * @returns                          Promise of restaurant search results
 */
export const getAllRestaurants = async (): Promise<any> => {
  const res = await fetch(`${divooraApi}/restaurants`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await res.json();
}

/**
 * Get all dishes by restaurant id
 * @param {string}  restaurantId    The id of the Restaurant
 * @returns                         Promise of dishes search results
 */
export const getDishesByRestaurantId = async (restaurantId: string): Promise<any> => {
  const res = await fetch(`${divooraApi}/dishes/?filter[where][restaurantId]=${restaurantId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await res.json();
}

/**
 * Get all dishes
 * @returns                           Promise of dishes
 */
export const getAllDishes = async (): Promise<any> => {
  const rest = await fetch(`${divooraApi}/dishes`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await rest.json();
}


/**
 * Dish Search
 * @param {stirng}  dishName         The name of the dish
 * @returns                          Promise of restaurant search results
 */
 export const filterDishes = async (dishName: string): Promise<any> => {
  const res = await fetch(`${divooraApi}/dishes/search/${dishName}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await res.json();
}

/**
 * Fetches Github User Info and stores it in localStorage
 * @param {string}  token   The token to search for
 * @returns                 The response from the Github API
 */
export const fetchUserInfo = async (token: string): Promise<any> => {
  const res = await fetch(githubApi, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({
      query: `
        query {
          viewer {
            login
            name
            avatarUrl
          }
        }
      `,
    }),
  });

  const data = await res.json();
  localStorage.setItem('user', JSON.stringify(data.data.viewer));
  return data;
};

/**
 * Fetche access token from server
 * @param {string}  code   The code returned from Github
 * @returns                The response from the server
 */
export const fetchAccessToken = async (code: string | undefined): Promise<any> => {
  if (code === undefined) {
    return;
  }

  const res = await fetch(testServerApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
    }),
  });

  return await res.json();
}
