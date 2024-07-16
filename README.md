# MERN Auth Template

This repository is a template for a full stack application with authentication. It is a good starting point for any full stack application that requires authentication. It uses the following technologies: 
1. MySQL
2. Express
3. React
4. Node
5. JWT (JSON Web Tokens)

This template is also providing Navigation Bar with links to Home, Login, and Register pages with conditional rendering based on the user's authentication status. This template is designed by react-bootstrap.

## Installation
1. Clone this repository
2. Run `npm install` in the server directory
3. Run `npm install` in the client directory
4. Create a `.env` file in the root directory and add the following variables:
```bash
JWT_SECRET=secret
PORT=port
```
5. You can edit the .env file on client directory to change the port of the client
6. Edit the `config.js` file in the server directory to configure the MySQL database connection

## Usage
1. Run `npm start` in the server directory to start the server
2. Run `npm start` in the client directory to start the client
3. Navigate to `http://localhost:3000` in your browser
