const express = require("express");
const {urlencoded, json} = require("express");
const router = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api", router);
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
module.exports = app;