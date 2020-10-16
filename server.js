const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 5000;
require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const router = require('./src/routers/routes');
app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
