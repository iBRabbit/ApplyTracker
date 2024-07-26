const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json());
app.use(cors()); // cors untuk mengizinkan akses dari luar

const db = require('./models');
const port = process.env.PORT || 3000;

const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const applicationsRouter = require('./routes/Applications');
app.use("/applications", applicationsRouter);

const statusesRouter = require('./routes/Statuses');
app.use("/statuses", statusesRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.clear();
        console.log(`Server is running on port ${port}`);
        console.log(`http://localhost:${port}`)
        console.log(`Last reloaded at ${new Date()}`)
    });
});