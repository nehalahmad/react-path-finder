/**
 * @description: Counter function to get new value of count
 */
const counter = () => {
  let counter = 1;
  return () => counter++;
};
export let countFn = counter();