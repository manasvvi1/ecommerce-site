const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const {json} = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");



// console.log(path.join(__dirname, "../public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/mernbackend/addtocart/src", express.static(__dirname + "/mernbackend/addtocart/src"));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register")
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/women", (req, res) => {
    res.render("women")
});

app.get("/featured", (req, res) => {
    res.render("featured")
});

// app.get("/mernbackend/addtocart/src/App.js", (req, res) => {
//     res.render(path.join(__dirname + '/mernbackend/addtocart/src/App.js'));
// });


//Create a new user in our data base
app.post("/register", async (req, res) => {
    try {
        const registerCustomer = new Register({
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        const registered = await registerCustomer.save();
        res.status(201).render("index");

    } catch (error){
        res.status(400).send(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const userusername = await Register.findOne({username:username});

        if(userusername.password === password){
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details")
        }

    } catch (error){
        res.status(400).send("Invalid Login Details");
    }
});



app.listen(port, ()=> {
    console.log(`Server is running at port no ${port}`);
})
