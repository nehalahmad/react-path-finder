/**
 * services/Utils.js
 * @description: Counter function to get new value of count
 */
const counter = () => {
  let counter = 1;
  return {
    increment: () => counter++,
    decrement: () => --counter,
    reset: () => (counter = 0)
  };
};
export let countFn = counter();
