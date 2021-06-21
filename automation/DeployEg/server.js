const express = require("express");
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get('/', (req, res) => {
    res.sendFile("index.html");
});

router.post('/login', (req, res) => {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = " + user_name + ", password is " + password);
    res.end("yes");
});

app.listen(3000, () => {
    console.log("Started on PORT 3000");
})