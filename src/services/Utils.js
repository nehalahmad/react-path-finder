/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
/**
 * services/Utils.js
 * @description: Counter function to get new value of count
 */
const counter = () => {
  let counter = 0;
  return {
    increment: () => (counter += 1),
    decrement: () => (counter -= 1),
    reset: () => (counter = 0)
  };
};
export const countFn = counter();
