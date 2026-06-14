require('dotenv').config();
const app = require('./src/app')
const connectDb = require('./src/config/database')

connectDb()

app.listen(3000, (req, res) => {
    console.log("Server running at port 3000");
})