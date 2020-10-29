const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const router = require('./src/routers/routes');
app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
