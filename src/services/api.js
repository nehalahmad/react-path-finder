import axios from 'axios';

import { ROUTE_API, BASE_URL } from "./../config/apiConstant";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

export const submitDirection = async data => {
    return instance.post(ROUTE_API, data).then(result => {
        if (result && result.data && result.data.token) {
            return result.data.token;
        } else {
            throw new Error("Locations couldn't authorized!");
        }
    });
}

export const getDirection = async token => {
    return instance.get(`${ROUTE_API}/${token}`);
}