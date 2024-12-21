Vendor Product Management Frontend

This project is built using React.js, Redux, Material UI, and Axios to manage vendor products through a user-friendly interface. It includes features like adding/editing products, uploading images, searching products, and marking favorites.

Features:

Product Management

-Vendors can add, edit, or delete products.
-Each product includes details such as SKU, quantity, name, description, and images.
-Support for uploading multiple images per product, with the ability to select a main image for the thumbnail.

Favorites Section

-Vendors can mark products as favorites using a star/checkbox/radio button.
-Favorites are saved locally in the browser using local storage.
-Favorite products are synced with the backend via an array of IDs stored in the database.

Search Functionality

-Real-time search bar with suggestions based on user input.
-Suggestions update dynamically as the user types.
-Clicking on a search result redirects to a dedicated search results page.

Responsiveness

-The application is fully responsive and adapts to various screen sizes, providing a seamless user experience on desktops, tablets, and mobile devices.

Pages:

-Main Page: Displays a list of all products with a search bar.
-Product Detail Page: Shows complete details of a specific product, including images.
-Add Product Page: Includes a form to add new products with an option to upload images.
-Edit Product Page: Allows vendors to update existing product information.
-Favorites Page: Lists all marked favorite products.
Search Results Page: Displays results based on search queries.

Tech Stack:

-React.js: For building the user interface.
-Redux: For managing global state, including products, search results, and favorites.
-Material UI: For styling and responsive design.
-Axios: For handling API calls.
-Local Storage: For saving and persisting favorite products.

Setup Instructions:

1. Clone the repository: 
        git clone https://github.com/Venuganth14/code94-frontend.git
2. Navigate to the frontend directory:
         cd frontend
3. Install dependencies:
         npm install
4. Start the application:
          npm start

   The application will be available at http://localhost:3000.

   Responsive Design:

-The application ensures a seamless experience on all devices using Material UI's responsive grid system.
-Layouts adapt to mobile, tablet, and desktop viewports dynamically.

State Management:

-Redux:
   --Manages product data, search results, and favorites.
   --Enhances application scalability and performance.
