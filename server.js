if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const sheetsRoute = require('./routes/sheets.route');

app.use(express.json());
app.use(cors());

app.use('/api', sheetsRoute);

app.listen(process.env.PORT, () =>
	console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
);
