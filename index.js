import express from "express";
import mysql from "mysql2";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "ragav",
    password: "Ragavan@94",
    database: "product-test"
})



app.get("/", (req, res) => {
    res.json("Data from backend");
});


app.get("/products", (req, res) => {
    const query = "SELECT * from products";
    db.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
    
});

app.post("/products", (req, res) => {
    const query = "INSERT INTO products (productName, description, Price) VALUES (?)";
    // const values = ["Macbook pro", "touch screen laptop", "1300.99"];
    const values = [
        req.body.productName,
        req.body.description,
        req.body.Price
    ]

    db.query(query, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("product was successfully added");
    })

});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM products WHERE productId = ?";
    db.query(query, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(`${id} has been deleted successfully`)
    })
})

app.put("/products/:id", (req,res) => {
    const id = req.params.id;
    const query = "UPDATE products SET productName = ?, description = ?, price = ? WHERE productId = ?";
    const values = [
        req.body.productName,
        req.body.description,
        req.body.Price
    ]
    db.query(query, [...values, id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.listen(8000, () => {
    console.log("successfully connected with the backend:");
});