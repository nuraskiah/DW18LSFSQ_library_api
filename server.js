const express = require('express');
const app = express();
const PORT = 5000;
require('dotenv').config();

app.use(express.json());

const router = require('./src/routers/routes');
app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
