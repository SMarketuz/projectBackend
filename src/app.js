require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require("./routes/index")

const app = express();


app.use(express.static('public/images'))

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "*"
}));

// routes
app.use('/api', routes)
app.use((req, res, next) => {
    res.status(404).json({ status: false, message: "Endpoint not found" });
});



app.listen(process.env.PORT, () => console.log(`> Server listened on port ${process.env.PORT}`))