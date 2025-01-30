# BMW Home Assignment

This project involves the creation of a versatile DataGrid component and a backend service to support it. The DataGrid is designed to display structured data with N columns and includes the multiple features

## FrontEnd

### Approach & Technical choice

#### UI Library:

In this project, I’ve integrated AG Grid for efficient and customizable data grid functionality, allowing for dynamic data display and interaction. For building a modern and responsive user interface, Material UI components have been utilized, ensuring a polished and consistent look across the application.

To simplify theme management and facilitate easy color customization, SCSS has been used, providing a flexible way to manage and update the color scheme throughout the project.

#### UI Animation:

For UI animation have use majorly AOS (Animate on scroll library) and some animation are on @keyframes

#### State Management:

In this project we mainly don't need to maintain states but for the sake of scalability and to avoid from prop drilling , I have used redux-toolkit.

#### Folder Structure

I follow a complete saturated system for organizing the folder structure, ensuring everything is easily accessible and logically grouped. Below is the folder structure for your reference:

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜BMWBuilding.png
 ┣ 📂components
 ┃ ┣ 📂AGGrid
 ┃ ┃ ┣ 📜AGDataGrid.js
 ┃ ┃ ┗ 📜AgGrid.css
 ┃ ┣ 📂Button
 ┃ ┃ ┣ 📜Button.css
 ┃ ┃ ┗ 📜Button.js
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜header.css
 ┃ ┃ ┗ 📜Header.js
 ┃ ┣ 📂Loader
 ┃ ┃ ┣ 📜Loader.css
 ┃ ┃ ┗ 📜Loader.js
 ┃ ┣ 📂Sidebar
 ┃ ┃ ┣ 📜SideBar.css
 ┃ ┃ ┗ 📜SideBar.js
 ┃ ┣ 📂TextInput
 ┃ ┃ ┗ 📜TextInput.js
 ┃ ┗ 📜FilterData.js
 ┣ 📂redux
 ┃ ┣ 📜slices.js
 ┃ ┗ 📜store.js
 ┣ 📂routes
 ┃ ┣ 📂About
 ┃ ┃ ┣ 📜About.css
 ┃ ┃ ┗ 📜About.js
 ┃ ┣ 📂BMWProductDetails
 ┃ ┃ ┣ 📜bmw-style.css
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Contact
 ┃ ┃ ┣ 📜Contact.css
 ┃ ┃ ┗ 📜Contact.js
 ┃ ┣ 📂HomePage
 ┃ ┃ ┣ 📜HomePg.css
 ┃ ┃ ┗ 📜HomePg.js
 ┃ ┗ 📂MainPage
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜MainPage.css
 ┣ 📂Theme
 ┃ ┗ 📜color.scss
 ┣ 📂Utils
 ┃ ┗ 📜constants.js
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜reportWebVitals.js
```

**/components**: This folder contains all the reusable components that make up the UI elements of the project.

**/reducers**: This folder houses all the reducers, which are consumed by the context for dispatching actions across the application.

**/routes**: All the page components for different routes and pages are organized here for easy navigation.

**/theme**: This folder stores the color palettes, making it easy to manage and apply a consistent theme throughout the project.

**/utils**: Contains constants, utility functions, and helper methods to promote reusability and maintainable code across the application.

## Backend

The project has been designed with scalability in mind, ensuring that it can be easily extended and maintained as it grows. The backend is built using Express and Node.js, providing a robust and efficient server-side architecture. For data storage and management, MongoDB is used as the database, offering flexibility and performance for handling large amounts of data.

### Deployment

To Run this project run

```bash
  npm run dev
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

for Backend

`PORT=3000`

`MONGO_CONNECTION_STRING="mongodb+srv://raffaykhan65:Zoro4250@bmwcluster.w2oot.mongodb.net/BMW_TEST?retryWrites=true&w=majority&appName=bmwCluster"`
for Front End
`REACT_APP_BASE_URL="http://localhost:3000/"`

### Folder Structure (Backend)

```
📦backend
 ┣ 📂BMW_Models
 ┃ ┗ 📜bmw.models.js
 ┣ 📂constants
 ┃ ┗ 📜index.js
 ┣ 📂Routes
 ┃ ┗ 📜routes.js
 ┣ 📂utils
 ┃ ┗ 📜response.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜connect.js
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

**/routes**: This folder contains all the API routes, handling the server-side logic and interactions with the client. Each route is defined to ensure modularity and scalability as the project grows.

**/constants**: This folder exports essential constants such as HTTP methods, API endpoints, versioning, success messages, and error messages. By centralizing these values, it becomes easier to maintain and reuse them across the project, ensuring consistency and reducing duplication

## Tech Stack

**Client:** React, Redux, Material UI, Ag Grid

**Server:** Node, Express

**Databse:** MongoDB

## Authors

- [Raffay Khan](https://github.com/rk-maker)
