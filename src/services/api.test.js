import { submitDirection, getDirection } from "./api";
import { SUCCESS } from "../config/apiConstants";

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

      it("getting direction", async () => {
        try {
          let directionResponse = await getDirection(tokenResponse.token);

          if (directionResponse.status === SUCCESS) {
            console.log(directionResponse);
          }
        } catch (error) {
          console.log(error.message);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  });
});
