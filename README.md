# Apply Tracker

Apply Tracker is a web application that allows users to keep track of their job applications. Users can add, edit, and delete job applications, as well as view statistics about their applications.

## Technologies
- React
- Node.js
- Express
- MySQL
- JWT

## Features
- Add, edit, and delete job applications
- View statistics about job applications
- User authentication
- Responsive design

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