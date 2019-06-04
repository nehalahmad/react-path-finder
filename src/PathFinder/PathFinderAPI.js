import axios from "axios";
import { UNAUTHORISED_LOCATIONS } from "./../config/AppConstants";

// general setting for making API calls
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

/**
 * @description: Make API calls to get token
 * @param: Locations object
 */
export const getToken = async data => {
  return instance.post(process.env.REACT_APP_ROUTE_API, data).then(result => {
    if (result && result.data && result.data.token) {
      return result.data.token;
    } else {
      throw new Error(UNAUTHORISED_LOCATIONS);
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
