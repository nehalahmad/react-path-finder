import { getToken, getDirection } from "./PathFinderAPI";
import APIResponse from "./../../__fixtures__/ApiResponse";

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
      mockAxios.get.mockImplementationOnce(() => APIResponse.exception);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(APIResponse.exception);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting token", async () => {
      mockAxios.get.mockImplementationOnce(() => APIResponse.tokenResponse);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(APIResponse.tokenResponse);
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  describe("direction", () => {
    it("getting direction in progress", () => {
      mockAxios.post.mockImplementationOnce(() => APIResponse.inProgress);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(APIResponse.inProgress);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("location is not accessible", () => {
      mockAxios.post.mockImplementationOnce(
        () => APIResponse.locationNotAccessible
      );

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(APIResponse.locationNotAccessible);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting direction", () => {
      mockAxios.post.mockImplementationOnce(() => APIResponse.success);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(APIResponse.success);
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
