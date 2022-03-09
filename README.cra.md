## Run app

- Apply the relevant env variables in your `.env.local` file

* REACT_APP_URL
* REACT_APP_USERNAME
* REACT_APP_PASSWORD
* REACT_APP_GRANT_TYPE

- `npm i`
- `npm start`

NOTE: The token is saved to local storage. So if it has expired, just comment out the code that checks for local storage momentarily

## Test app

- `npm test`

## Architecture:

- App: contains and handles all the logic of the app
- Pages: contains the two UI screens (although here they act like stateless components)
- Api-calls: separate file that holds the APIs. NOTE: APIs are defined here, but are deconstructed in the files they are called in
- Components: stateless dummy components that make up most of the UI
- Utils: util functions (should been tested)
- Text-keys: Key mapping for some text
- Types: type definition (used `https://quicktype.io/typescript`)
- Assets: icons

## Approach to building the app

I took a top down approach to the project. First I created the env variables and got the APIs working in conjunction with each other before touching any UI elements. I made the decision to get all of the payment information (both transaction & transaction specific) before rendering any UI on the screen. This would make the first initial render take slightly longer but would be more performative than making frequent API calls upon clicking each transaction item.

I looked in to the difference between the two API calls (the payment vs payment specific) and only saw transactions as the standout missing piece. So once I called both API endpoints, I picked off the `transactions` from the second call and merged it to the initial data retrieved. If I have missed a crucial part of the data, I would have followed the same procedure as with transactions.

I then mapped out what UI pieces were scalable across the app and what were page specific giving me a list of components to work with and page specific UI components that would sit in their respective page’s folder.

Although I have a pages folder, I essentially treat `transaction-list.tsx` & `transaction-detail.tsx` as components that accept props from `App.tsx` - which also handles the logic.

With this sketch in mind I wrote my test cases. I first wrote test cases for how the UI would respond if the APIs failed. Then I wrote test cases for how the UI would look dependent on the data being passed through. For example, if there was a refund, I would test for the refund symbol to be rendered and also test that it wasn’t rendered if there was no refund.

By treating the pages as components, testing was easier because I could click on each transaction item, test what was rendered and then click back out to the transaction list.

## Issues with ambiguity / Points of confusion that could have been cleared up with a PM or fellow engineer

- Not sure what would definitely be returned from the initial transaction API call and what would be coming from the payment details call.
  - The only difference I saw was in the `transactions`. I assumed there’d be more given how the task was written but didn’t see anything
- Determining the source of truth for `amounts` (authorised, etc)
- I wasn’t sure what to do with the processor/transaction section given the sporadic data.
  - Does no data mean do not show the section?
  - Do I only show the transaction if the status hasn’t failed?
  - Do I still show the transaction section if only `processorMerchantId` is available but not `processorTransactionId`
- Essentially I wanted to know the conditions in which I show the sections/parts of the section.
- Do I assume that a payment without `threeDSecureAuthentication` is therefore `Not Performed`? Or is this just an issue with the data
- There are a number of other ambiguities but these struck out

## If I had more time, I would have addressed the following:

- I would have implemented filtering!
- Systematically addressed styling with themes. Currently in the project I pass down colours and spacing references. With time I would have used styled component references i.e `theme.spacing` & `theme.colours`
- I didn’t strictly adhere to the design because of time
- I would have addressed the retrieval of the expired token from local storage
- I didn't fully account for what would happen if `payments/{paymentId}` API call would fail. Technically the page is still rendered and `transactions` is conditionally rendered so it’s not a huge problem for this task. Therefore its respective error test is technically a false positive 😥. (The other two apis errors are handled fine)
- I didn’t test the utils! 🤦🏽‍♂️ (time!)
- Implement a loading spinner
- Address the issue of `Date` vs `string` type in relation to the `longDate` utils (I think this has something to do with API (I could be wrong)
- Used a more varied mock data set
- More stricter use of typescript especially when passing properties to objects. For example,`icons[paymentNetwork!]`. Time issue!
- `app-types` can be cleaner
- I convert `test-utils.js` to `tsx` 🤦🏽‍♂️
- Perhaps refactor how I used `flex-item` & `flex-container`
