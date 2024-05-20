# Card Match Pro
This app aims to match ecommerce listings of Pokemon cards from sites like ebay, against card data from a specified database. 

- Front End: [AWS Amplify](https://main.dkd70x98t1182.amplifyapp.com/) or [Vercel](https://cardmatchpro-ryanlhy.vercel.app/)
- Back End: [PythonAnywhere](https://ryanlhy.pythonanywhere.com/)
- Back End GitHub: [Django Demo](https://github.com/ryanlhy/django-demo)

This app utilizes the ebay API to extract the titles of the Pokemon card listings and then uses a simple algorithm to match and filter the ebay listings with the cards in your database by identifying specific keywords such as the card's name, set number and edition.

![image](https://user-images.githubusercontent.com/103638962/221205493-504c2347-2108-4d89-a2db-98a60a456f41.png)



## Featured Components
![image](https://user-images.githubusercontent.com/103638962/221205025-21ae5a28-dc80-4a5b-adae-c8085753374f.png)

The front End of this app features the Search Bar, Button Tags (for filter), and the Card Components

## Search Bar Component
The searchbar component renders a search input using Material UI's TextField and Autocomplete components. It allows users to search for Pokemon by name and displays search options using Autocomplete.
The component uses Redux to store the selected value of the search query and the corresponding Pokemon object in the store.
The search query is sent to the Backend, cleaned and sent to the Pokemon TCG API/database and results are displayed as search options. The component also handles various events such as when an option is selected, when the input field is changed, and when the search button is clicked.
The component also includes a fade-in and fade-out effect when an option is selected.

## Button Tags Component
The ButtonTags component renders a button with a label that is passed in through props. When clicked, the button toggles between two styles (contained and outlined) and dispatches an action to update the state in the Redux store. The component makes use of the useSelector hook to access the current state of the store, and the useDispatch hook to dispatch actions. The component receives a tag prop, which is used to access a specific value in the state array, to display or remove filtered cards from the search results. The component also includes a CancelIcon, and the Grow component from Material-UI is used to provide a simple animation when the button is added or removed from the screen.

## Card Component
The ActionAreaCard component is a React component that fetches data from an eBay API and displays the data in a collection of CardEbay components. The component includes functionality to filter the displayed cards based on user input and filter criteria. The component also includes loading animations and a modal image zoom feature.

## Back End
Django Framework is used as the backend. It allows the frontend to interact with the database and perform various actions such as retrieving, updating, and deleting data. The algorithm to match cards is implemented in django. The app is built using Python and utilizes the Model-View-Template (MVT) architectural pattern.

The PokemonView and EbayView handle GET requests for data from the Poke API and Ebay API, respectively.

## The Algorithm
The algorithm classifies the cards by taking into account variations of the card's name, such as order and different ways of formatting the number. The algorithm groups different words that could refer to the same card and this way it can identify the card. 

For example, if im looking for the card “1999 Game Charizard-Holo 4/102 PSA 10”, ebay titles containing “1999” & “Game” & “Charizard” & “Holo” & “4/102” & “PSA 10” will have a match. There are also other conditions that will derive a match like, “1st edition”, “4 102”, and  should include typos like “chairzard”, “charzard” (typos not part of algorithm yet). 
There are also a limited number of words that could mean this particular card and they are grouped accordingly. For example, “chairzard”, “charzard” and would be grouped under pokemon name. “4/102”, “4 102”, are groups as set number. “PSA 10” would be a grade condition etc.

With this feature, the app allows users to easily keep track of their collection, find specific cards they're looking for and make sure they don't miss an opportunity to acquire a rare card.

## Database
This database uses PostgreSQL and deployed with AWS [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/). The database is accessed to extract a list of card attributes for data matching with listing titles. For example, assessing a list of grading companies, and the grades that will be given, and comparing it with ebay listing titles to determine if it's a match.
![image](https://user-images.githubusercontent.com/103638962/221206010-00dce045-2625-4670-97ab-b9cc7d08def8.png)

## Other Practical Applications
This app is not only useful for collectors, but also for ecommerce companies that sell Pokemon cards. The feature that matches ecommerce listings to your database can also be used by these companies to identify competitor products and pricing, helping them stay competitive in the market. With this feature, ecommerce companies can easily compare their product offerings with those of their competitors and adjust their prices and inventory accordingly. This can help them increase their sales, improve customer satisfaction and boost their business 

## 🥞 Stack
This project uses the following libraries and services:
- Framework - [Create React App](https://create-react-app.dev) with React Router
- UI Kit - [Material UI](https://material-ui.com)
- Authentication - [Firebase Auth](https://firebase.google.com/products/auth)
- Payments - [Stripe](https://stripe.com)
- Backend - Django, Python
- Database - PostgreSQL
- Front End Hosting - AWS Amplify & Vercel
- Back End Hosting - PythonAnywhere
- Redux

APIs
- [Ebay API](https://developer.ebay.com/)
- [Poke API](https://pokemontcg.io/)
- [Zard Slabs API](https://zardslabs.com/)
