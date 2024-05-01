/*--------------------------------------------------------------
						EXPRESS
--------------------------------------------------------------*/

const express = require('express');
const app = express();

/*--------------------------------------------------------------
						HTTP
--------------------------------------------------------------*/

const http = require("http");
const server = http.createServer(app);

/*--------------------------------------------------------------
						CORS
--------------------------------------------------------------*/

const cors = require('cors');
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));

/*--------------------------------------------------------------
						PORT
--------------------------------------------------------------*/

const PORT = process.env.PORT || 8000;
require("dotenv").config();

/*--------------------------------------------------------------
						COOKIES
--------------------------------------------------------------*/
const cookies = require("cookie-parser");
app.use(cookies());

/*--------------------------------------------------------------
						MIDDLEWARE
--------------------------------------------------------------*/

app.use(express.json()); //JSON Object
app.use(express.urlencoded({ extended: false })); //String or Arrray Object

/*--------------------------------------------------------------
						ROUTES
--------------------------------------------------------------*/
const api = require("./routes/api");
app.use("/api", api);

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})