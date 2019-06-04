import { submitDirection, getDirection } from "./PathFinderAPI";
import { SUCCESS, FAIL, IN_PROGRESS } from "./../config/ApiConstants";
import { SOMETHING_WRONG } from "../config/AppConstants";

jest.setTimeout(30000); // overcome the default jest timeout which is 5s

describe("SubmitDirection", () => {
  let data;
  beforeEach(() => {
    data = {
      from:
        "Gurgaon - Delhi Expressway, Rajokri Village, Rajokri, New Delhi, Delhi, India",
      to:
        "Saket Metro Station, Mehrauli - Badarpur Road, Saiyad ul Ajaib, Saket, New Delhi, Delhi, India"
    };
  });

  it("getting token", async () => {
    try {
      let tokenResponse = await submitDirection(data);

      let directionResponse = await getDirection(tokenResponse.token);

      if (directionResponse.status === SUCCESS) {
        console.log(directionResponse);
      } else if (directionResponse.status === FAIL) {
        console.log(directionResponse.error);
      } else if (directionResponse.status === IN_PROGRESS) {
        console.log("trying to fetch directions again...");
      } else {
        throw new Error(SOMETHING_WRONG);
      }
    } catch (error) {
      console.log(error.message);
    }
  });
});
