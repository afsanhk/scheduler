# Interview Scheduler
Scheduler is a single page React App which allows you to book appointments. 

Built upon an existing back-end provided by LHL during the Web Deb Bootcamp to practice React. 

This is deployed at: https://pensive-chandrasekhar-078fa9.netlify.app/ using a heroku hosted postgres-API and CircleCI. 

The deployed app does not integrate websockets but websockets were implemented in another branch (stretch/websockets).

<sub><sup> ** Note: Please give the app some time to initially load data as heroku will shut off the API after 30 minutes of inactivity. ** </sup></sub>


## Major Learnings

1. Creating React components, passing props and hooks (useState, useEffect, useReducer).
2. Managing state and using custom hooks to render components and create controlled forms.
3. Axios requests and web sockets (not in production -- branch: stretch/websockets).
4. Immutable patterns, conditional rendering and managing DOM events.
5. Testing with Storybook (components), Jest (unit, integration) and Cypress (End to End).

## Final Product
### Add, edit or delete an interview
![Functionality](https://media0.giphy.com/media/7CM2xLpSiEyxBpuxsE/giphy.gif?cid=790b7611581c38031676d760992b2ee2e37fcaf842daaad3&rid=giphy.gif&ct=g)

### Form validation
![Form Validation](https://media1.giphy.com/media/pzoAIfkdIvKjd7EuJ9/giphy.gif?cid=790b761195729ef50f296705b6c68f315a96c85eddc65ff7&rid=giphy.gif&ct=g)

### Save/Delete errors
![Error](https://media4.giphy.com/media/ZrgFcwYnOyVVp9HDy1/giphy.gif?cid=790b7611c30be1315b5c4e091a7eb2b14810f2b4afc05f1b&rid=giphy.gif&ct=g)

### Day List
![Day List](https://github.com/afsanhk/scheduler/blob/master/docs/Day%20List.png?raw=true)

### Websockets
No Websockets

![No WebSox](https://media0.giphy.com/media/ESNLvs2C7kXUV3SzUx/giphy.gif?cid=790b76116d762f69007a08263af1e3b292e849afa5aac0cf&rid=giphy.gif&ct=g)

Adding With Websockets

![WebSoxAdd](https://media4.giphy.com/media/1ZsyED6RzyGalPNwIK/giphy.gif?cid=790b761160f64233e9060af4e922a0eb31c8b98ac2122f33&rid=giphy.gif&ct=g)

Editing With Websockets

![WebSoxEdit](https://media4.giphy.com/media/VqgnFW88GWDWiV7CC1/giphy.gif?cid=790b761143fe47a6fdd42f740771c9d6ef74b9ac1129b47b&rid=giphy.gif&ct=g)

Deleting With Websockets

![WebSoxDelete](https://media2.giphy.com/media/Ip2W39FZwr7yq4xKtX/giphy.gif?cid=790b7611374b15329a862b11f81288667dcdc3c60f12225a&rid=giphy.gif&ct=g)


## Setup

Install dependencies with `npm install`.

Note: If you are not running the deployed version, you will also need to fork the scheduler-api repo and run the DB server alongside the React app. 

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
