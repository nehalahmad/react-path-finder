import axios from "axios";

// general setting for making API calls
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

/**
 * @description: Make API calls to get token
 * @param: Locations object
 */
export const submitDirection = async data => {
  return instance.post(process.env.REACT_APP_ROUTE_API, data).then(result => {
    if (result && result.data && result.data.token) {
      return result.data.token;
    } else {
      throw new Error("Locations couldn't authorized!");
    }
  });
};

/**
 * 
 * @param {*} token 
 */
export const getDirection = async token => {
  return instance.get(`${process.env.REACT_APP_ROUTE_API}/${token}`);
};
