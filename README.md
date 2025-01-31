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

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BASE_URL="http://localhost:3000/"`

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

## Components

**Custom Button**
A reusable button component built with Material-UI's Button component. It supports customization for colors, icons, size, and more.

**Props**

| Prop Name         | Type        | Default                    | Description                                             |
| ----------------- | ----------- | -------------------------- | ------------------------------------------------------- |
| `onClick`         | `function`  | `undefined`                | Function to be executed on button click.                |
| `backgroundColor` | `string`    | `var(--primary-a0)`        | Background color of the button.                         |
| `textColor`       | `string`    | `var(--primary-txt-color)` | Text color of the button.                               |
| `isIcon`          | `boolean`   | `false`                    | Determines if an icon should be displayed.              |
| `icon`            | `ReactNode` | `undefined`                | Icon component to be displayed when `isIcon` is `true`. |
| `children`        | `ReactNode` | `undefined`                | Button text or child components.                        |
| `width`           | `string`    | `auto`                     | Width of the button.                                    |
| `height`          | `string`    | `auto`                     | Height of the button.                                   |
| `disabled`        | `boolean`   | `false`                    | Disables the button when `true`.                        |

**AGDataGrid Component**
The `AGDataGrid` component is a customizable data grid built using the AG-Grid library. It supports dynamic columns, pagination, and actions (view and delete) for each row. It can be used to display tabular data with filtering and pagination features.

**Props**

| Prop Name             | Type                         | Description                                           |
| --------------------- | ---------------------------- | ----------------------------------------------------- |
| `column`              | `Array`                      | An array of column definitions for the grid.          |
| `row`                 | `Array`                      | An array of row data to be displayed in the grid.     |
| `totalPages`          | `number`                     | The total number of pages for pagination.             |
| `currentPage`         | `number`                     | The current page number for pagination.               |
| `onPressPreviousPage` | `function`                   | Callback function for the previous page button click. |
| `onPressNextPage`     | `function`                   | Callback function for the next page button click.     |
| `isPaginated`         | `boolean` (default: `false`) | Whether pagination is enabled or not.                 |

**Header Component**
A navigation header component that includes a logo, navigation links, and social media icons.

**Props**

| Prop Name         | Type       | Default     | Description                                                                 |
| ----------------- | ---------- | ----------- | --------------------------------------------------------------------------- |
| `scrollToSection` | `function` | `undefined` | Function to scroll to a specific section when a navigation link is clicked. |
| `activeSection`   | `string`   | `undefined` | The currently active section, used to highlight the active navigation link. |

**SideBar Component**
A sidebar component for filtering data based on selected columns, criteria, and values.

**Props**

| Prop Name       | Type       | Default     | Description                                     |
| --------------- | ---------- | ----------- | ----------------------------------------------- |
| `column`        | `array`    | `undefined` | Array of column objects used for filtering.     |
| `isOpen`        | `boolean`  | `false`     | Controls whether the sidebar is open or closed. |
| `toggleSideBar` | `function` | `undefined` | Function to toggle the sidebar visibility.      |
| `applyFilter`   | `function` | `undefined` | Function to apply the selected filter criteria. |

**Loader Component**
The `Loader` component displays a full-screen loading spinner when the `loading` state from the Redux store is `true`. It is commonly used to indicate that content is being loaded or an action is being processed in the background.

**StyledInput Component**
The `StyledInput` component is a customizable input field built using Material UI components. It provides an enhanced input field with a label, placeholder, custom styling, and an optional icon at the end of the input.

**Props**

| Prop Name     | Type                             | Description                                                                      |
| ------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `label`       | `string`                         | The label displayed above the input field.                                       |
| `placeholder` | `string`                         | The placeholder text displayed inside the input when empty.                      |
| `type`        | `string` (default: `"text"`)     | The type of input field (e.g., `"text"`, `"password"`).                          |
| `variant`     | `string` (default: `"outlined"`) | The variant of the input field (e.g., `"outlined"`, `"filled"`).                 |
| `value`       | `any`                            | The value of the input field.                                                    |
| `onChange`    | `function`                       | Function to handle changes to the input value.                                   |
| `onKeyDown`   | `function`                       | Function to handle key press events inside the input.                            |
| `onIconClick` | `function`                       | Function to handle the click event of the icon.                                  |
| `icon`        | `ReactNode` (optional)           | The icon to be displayed at the end of the input field (e.g., `<SearchIcon />`). |

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
