Hello Nehal Ahmad,

Thank you very much for completing the frontend challenge. We appreciate you taking your time to complete it. We have reviewed your submission. Please find below our comments.

## What we liked
- Functions are well commented.
- Autocomplete is implemented (would be nicer if country restriction or map bounds is applied though).
- Simple user interface.
- Responsive.
- API key, address, and path are in `.env` file.
- Clear and concise setup guide.

## What could be improved
- ⚠️ API usage is not in accordance with the documentation, instead of using `origin` and `destination` parameters as required, `from` and `to` are used.
- ⚠️ It is good that retries are attempted when backend is busy (returns `in progress`), also good that the number of attempts is limited. But, there are some issues with the implementation of `handleDirectionResponse`:
  - If the backend is still busy after `NUMBER_ATTEMPTS` attempts, the application may stuck in loading state;
  - The retry count is not reset after backend returns success or failure, so the retry attempts would become lower every time the backend returns `in progress`, until a retry is not attempted at all and the application stuck in loading state.
- ⚠️ Tests are implemented, but they are not configured/written in a proper way, e.g.:
  - All snapshots are empty;
  - For all tests in `PathFinderAPI.test.js`, if we shuffle around the mock responses between different test cases, the tests still pass;
  - Testing `mockCallback` in `ButtonContainer.test.js` is not useful.
- Git is used but only a single commit was made. Commits could be more atomic with descriptive messages.
- While the README is concise, some formatting would be nice.
- There is an invalid CSS in `ErrorBoundary.css`:
  - `errorDetails` appears to be a class name, but referenced here as id;
  - `whitespace` should be `white-space`;
  - the value should be `pre-wrap` (without double quotes).
- String ref is a legacy API and it will likely be removed in a future release because of some issues. The React team advises against using it. Please refer to [React docs](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) for more details and recommendations.
- Many components have incomplete or no PropTypes validation.
- `enzyme` would be better as `devDependencies`.
- Just `react-bootstrap` should be enough, it should not be necessary to also install `bootstrap`.

## Result
After reviewing your submission, we regret to inform you that we are not moving forward at this time.
