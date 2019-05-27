const counter = () => {
  let counter = 1;
  return () => counter++;
};
export let countFn = counter();
