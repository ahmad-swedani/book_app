'use strict'
require('dotenv').config();

/* this is librarys*/
////////////////////////////////////
/*express  */
const express = require('express');

/* who can touch my server */
const cors = require('cors');

/* superagent */
const superagent = require('superagent');

////////////////////////////////////

const PORT = process.env.PORT || 3030;

const appserver = express();











app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });







