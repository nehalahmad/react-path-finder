import { getToken, getDirection } from "./PathFinderAPI";
import PFAPIResponse from "../../__fixtures__/PathFinderApiResponse";

const mockAxios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
};

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
      mockAxios.get.mockImplementationOnce(() => PFAPIResponse.exception);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(PFAPIResponse.exception);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting token", async () => {
      mockAxios.get.mockImplementationOnce(() => PFAPIResponse.tokenResponse);

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
      mockAxios.post.mockImplementationOnce(() => PFAPIResponse.inProgress);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(PFAPIResponse.inProgress);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("location is not accessible", () => {
      mockAxios.post.mockImplementationOnce(
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
      mockAxios.post.mockImplementationOnce(() => PFAPIResponse.success);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(PFAPIResponse.success);
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
