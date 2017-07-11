# SPA on React, NodeJS and Express

#### 1. Install instruction

install Node.js from https://nodejs.org/en/download/

Check if node is installed
```
node -v
8.1.1

npm -v
5.0.3
```

#### 1. Run instruction
1. Clone this repo
2. `cd portfolio`
3. `npm install`
4. `npm run server`
5. `npm run webpack-devserver`
6. Open http://localhost:8090 in browser

## Project structure ##
	./ 
		server/app.js - this is all server code
		client/* - this is all client code
		    components - all components
			api        - ajax requests
			constants  - some event constants for flux store 
			dispatcher - flux dispatcher
			stores     - flux stores
			actions    - component actions wich used flux and ajax requests
			main.js    - Used reactDOM to render App.jsx in index.html
		public/ - there is static page which is a start point for webpack-devserver
            build/ - here webpack put bundle.js		
		portfolio.json
		.eslintrc.json - list of rules, used popular airbnb style
		.webpack.config.js - configuration for webpack to make bundle.js

## Components ##
	App.jsx - all starts from here. There is **NavBar**, **Portfolio** and **Dashboard** components.
	NavBar.jsx - change views **Portfolio** and **Dashboard**
	Portfolio.jsx - there is all **modal widows** and **PortfolioTable**
	modalUpdatePortfolio/ - folder with modal update components
		ModalWindowUpdate/ - this is modal window component which have **UpdatePortfolioForm**
	PortfolioTable/ - components which connected to PortfolioTable
		PortfolioTable.jsx - list of portfolios with Details, Update and Delete button
		Portfolio.jsx      - each row of portfolio list
	Dashboard/ - all components which connected to dashboard like charts
	FormElements/ - this is all formsy input elements for percentage and description and others.
	