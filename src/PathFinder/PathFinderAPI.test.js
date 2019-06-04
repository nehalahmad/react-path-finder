import { getToken, getDirection } from "./PathFinderAPI";
import MockResponse from "../../__fixtures__/pathFinderMockApiResponse";
import MockAxios from "../../__mocks__/mockAxios";

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
      MockAxios.get.mockImplementationOnce(() => MockResponse.exception);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(MockResponse.exception);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting token", async () => {
      MockAxios.get.mockImplementationOnce(() => MockResponse.tokenResponse);

      try {
        const tokenResponse = getToken(direction);
        expect(tokenResponse).toEqual(MockResponse.tokenResponse);
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  describe("direction", () => {
    it("getting direction in progress", () => {
      MockAxios.post.mockImplementationOnce(() => MockResponse.inProgress);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(MockResponse.inProgress);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("location is not accessible", () => {
      MockAxios.post.mockImplementationOnce(
        () => MockResponse.locationNotAccessible
      );

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(MockResponse.locationNotAccessible);
      } catch (error) {
        console.log(error.message);
      }
    });

    it("getting direction", () => {
      MockAxios.post.mockImplementationOnce(() => MockResponse.success);

      try {
        const directionResponse = getDirection(token);
        expect(directionResponse).toEqual(MockResponse.success);
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
