# Airwallex - Frontend Code Challenge

## Functionality
This is a simple yet clean homepage that allow users to enter their 1.) name 2.) email to receive email invitations.

## Visual Requirements
* The UI should occupy the full height of the screen.
* Shows a fixed header that is always on top of the window and a footer that is always on the bottom of the window (assuming a
reasonable window height).
* The page content is sandwiched in the middle, containing just a heading, a small piece of text and a button to request an invite.
* A rough mockup of the basic layout is attached. While preserving this layout on desktop, you may style it however you wish, with or
without images.
* The solution must be mobile friendly (users won't need to pinch and zoom on their mobile devices).

## UI Behaviour / Validation
* When the Request Invite button is clicked, a popup shows containing the Full name, Email and Confirm Email input fields.
* The user needs to fill in all three fields to request an invitation.
* Full name needs to be at least 3 characters long, Email needs to be in validation email format and Confirm Email needs to match Email.
* If the user clicks Send and one or more fields do not validate properly, the app should not contact the backend but instead highlight the
invalid field(s).
* If the user clicks Send and all fields validate properly, the app should send the request to the backend server (see specs below) and
inform the user that the request is being sent.
* If the server returns 200 OK, it should switch to another popup, indicating that everything went through OK. This popup can be dismissed
and will simply close - revealing the homepage again.
* The server may return 400 Bad Request, in which case the app should simply display the error message from the server.
* The Send button can be clicked again to re-attempt the submission.

## Installation

npm is used for this project.

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Webpack is used for the building of this project.

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Webpack is used for the building of this project.

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `npm test`

All test code is under directory './src/test'.
* App.test.js
* Content.test.js
* Footer.test.js
* Header.test.js
* InviteModal.test.js
* util.test.js

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

