import { SOMETHING_WRONG } from "../src/config/AppConstants";

const token = "9d3503e0-7236-4e47-a62f-8b01b5646c16";

const APIResponse = {
  exception: Promise.resolve(new Error(SOMETHING_WRONG)),
  tokenResponse: Promise.resolve({
    token
  }),
  inProgress: Promise.resolve({
    status: "in progress"
  }),
  locationNotAccessible: Promise.resolve({
    status: "failure",
    error: "Location not accessible by car"
  }),
  success: Promise.resolve({
    status: "success",
    path: [
      ["22.372081", "114.107877"],
      ["22.326442", "114.167811"],
      ["22.284419", "114.159510"]
    ],
    total_distance: 20000,
    total_time: 1800
  })
};

export default APIResponse;
