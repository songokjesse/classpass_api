const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const routes = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.get("/", (req, res) => res.send("Vercel Init"));
app.use("/api", routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
module.exports = app;