<h3 align="center">Angular tree grid portal</h3>
  <p align="center">
    <a href="https://github.com/ganeshmkharvi/angular-tree-grid-portal//issues">Report Bug </a>
    ·
    <a href="https://github.com/ganeshmkharvi/angular-tree-grid-portal//issues">Request Feature</a>

  </p>

<!-- ABOUT THE PROJECT -->

### What's inside this repo?

- Socket.io for real time updates.
- API Clients for retrieving angular tree grid data.
- Production standard structuring of the application.


#### Task description

Created a single webpage of TreeGrid using : https://ej2.syncfusion.com/angular/documentation/treegrid/virtual
and other "Angular TreeGrid" samples. I have used Syncfusion EJ2 Angular TreeGrid (free trial version), but it doesn't support all required features, so, I  have to write custom code! 

Saved all data in JSON file (not database). Initially, the TreeGrid shall have 50K rows (RowID=1,2,3...50K), all users shall edit this single TreeGrid (i.e. JSON file on server). 

All users' row-edits and column-settings are Persistent and Realtime-Sync’d between client sessions, it is achieved using Socket.IO. 

Implemented the following 2 Context Menus on this TreeGrid: (Note: Certain menu item has 🗹 symbol - meaning this item shall function as On/Off switch, while 🗹 or ☐ symbol serves as the On/Off status indicator) 

Context Menu 1 - Right-click (mouse) or long-press (mobile) a "Column Header", to pop-up some menu items: 

FreezeCol ☑: Freeze all left-hand-side (including current) columns, See https://ej2.syncfusion.com/angular/demos/#/bootstrap5/treegrid/frozen-column 
(When turning Freeze On, please switch from Virtual Scroll to Infinite Scroll to avoid a known conflict in library. Freeze Off shall switch back to Virtual Scroll) 

FilterCol ☑: Enable "Filter Bar" in Parent Hierarchy Mode, See https://ej2.syncfusion.com/angular/demos/#/bootstrap5/treegrid/filter

 MultiSort ☑: “Off: No sorting allowed. On: All combination of sorting allowed”, See https://ej2.syncfusion.com/angular/demos/#/bootstrap5/treegrid/sorting 
Context Menu 2 - Rright-click (mouse) or long-press (mobile) a "Row", to pop-up  menu items: 
 DelRow; (Delete Task / Subtask code to call the required apis has been written but calling on click of DelRow is pending. I need to add it to the eventlistener method.)
 
MultiSelect ☑: Enable user to "Multi-select" rows on PC and Mobile, See https://ej2.syncfusion.com/angular/demos/#/bootstrap5/treegrid/selection 


### Built With

- [Angular]() - TypeScript-based free and open-source web application framework.
- [Socket.io]() - Event driven JavaScript library for real time web applications.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps :

### Prerequisites

To run this project, you'll need to have the following installed:

- Node.js : [https://nodejs.org](https://nodejs.org)

- npm :
  ```sh
  npm install npm@latest -g
  ```


### Installation

1. Clone the repo :
   ```sh
   git clone https://github.com/ganeshmkharvi/react-crypto-exchange-rates.git
   ```
2. Install dependencies (use `sudo` if required) :

   ```sh
   npm install
   ```

### Start the App :


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
