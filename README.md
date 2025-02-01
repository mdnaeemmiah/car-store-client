# Car Store Frontend

This is the frontend of the Car Store application, built with React.js, TypeScript, and Ant Design. The project provides users with a modern and responsive interface to browse, purchase, and manage their car-related products.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Ant Design (AntD)**: A design system and React UI library that provides pre-built components.
- **Redux Toolkit**: For state management.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN**: Used for creating UI components such as the cart modal.
- **React Router**: For routing between pages.
- **Sonner**: For notifications.

## Features

- **Responsive UI**: The app is designed to be mobile-first and responsive across all screen sizes.
- **Product Catalog**: Users can browse through all available car-related products.
- **Shopping Cart**: Users can add items to their cart, update quantities, and remove items.
- **Order Placement**: Users can place an order for the products in their cart.
- **User Authentication**: Secure login and logout functionality with a personalized dashboard.
- **User Profile**: Allows users to view their personal information and manage their profile.

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/car-store-frontend.git
    cd car-store-frontend
    ```

2. **Install dependencies**:
    Ensure that you have [Node.js](https://nodejs.org) installed. Then run:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

    This will start the development server and open the app in your browser at `http://localhost:3000`.

## Project Structure

- **`src`**: The source folder for all React components and pages.
  - **`components`**: Contains reusable UI components like buttons, headers, and the cart system.
  - **`pages`**: Contains all the pages for the application such as Home, Products, About, and Dashboard.
  - **`redux`**: Contains the Redux slices and hooks for managing application state.
  - **`assets`**: Static assets like images, fonts, and icons.

## Usage

- **Home Page**: Displays featured products and allows users to navigate through different categories.
- **Products Page**: Lists all products available in the store.
- **About Us Page**: Information about the store and its services.
- **User Authentication**: Allows users to sign in and out. After login, users are redirected to their personal dashboard.

## Deployment

To deploy the project, follow these steps:

1. **Build the project**:
    ```bash
    npm run build
    ```

2. **Deploy to your chosen hosting platform** (e.g., Vercel, Netlify, GitHub Pages).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request to merge your changes into the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Ant Design** for providing a great component library.
- **React** for building a powerful front-end framework.
- **Tailwind CSS** for making styling easy and efficient.
