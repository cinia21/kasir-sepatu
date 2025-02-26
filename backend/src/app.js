const express = require("express");
const bodyParser = require("body-parser");
const migration = require("./migration/migration")
const routes = require("./routes/routes");
const cors = require('cors')
const path = require('path')

const app = express();
const port = 3000;
migration();
app.use(cors())

app.use(bodyParser.json());
app.use('/api', routes); 
app.use('/files',express.static(path.join(__dirname,'files')))
app.listen(port, () => {
  console.log(`jalan di port ${port}`);
});