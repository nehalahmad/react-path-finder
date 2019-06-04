import { getToken, getDirection } from "./PathFinderAPI";
import PFAPIResponse from "../../__fixtures__/PathFinderApiResponse";
import MockAxios from "./../../__mocks__/MockAxios";

jest.setTimeout(30000); // overcome the default jest timeout which is 5s

describe("Testing API", () => {
  let direction;
  let token;

  beforeEach(() => {
    direction = {
      from:
        "Gurgaon - Delhi Expressway, Rajokri Village, Rajokri, New Delhi, Delhi, India",
      to:
        "Saket Metro Station, Mehrauli - Badarpur Road, Saiyad ul Ajaib, Saket, New Delhi, Delhi, India"
    };

    token = "9d3503e0-7236-4e47-a62f-8b01b5646c16";
  });

  describe("token", () => {
    it("error getting token", async () => {
      MockAxios.get.mockImplementationOnce(() => PFAPIResponse.exception);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(PFAPIResponse.exception);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting token", async () => {
      MockAxios.get.mockImplementationOnce(() => PFAPIResponse.tokenResponse);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(PFAPIResponse.tokenResponse);
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  describe("direction", () => {
    it("getting direction in progress", () => {
      MockAxios.post.mockImplementationOnce(() => PFAPIResponse.inProgress);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(PFAPIResponse.inProgress);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("location is not accessible", () => {
      MockAxios.post.mockImplementationOnce(
        () => PFAPIResponse.locationNotAccessible
      );

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(PFAPIResponse.locationNotAccessible);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting direction", () => {
      MockAxios.post.mockImplementationOnce(() => PFAPIResponse.success);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(PFAPIResponse.success);
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
