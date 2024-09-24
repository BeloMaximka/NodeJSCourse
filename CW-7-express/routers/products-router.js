import { Router } from "express";
import path from "node:path";

const pagesDir = path.join(process.cwd(), "public", "pages");
const router = Router();

const products = [
  {
    id: 1,
    name: "Book",
    price: 200,
  },
  {
    id: 2,
    name: "Phone",
    price: 2000,
  },
  {
    id: 3,
    name: "Sofa",
    price: 4000,
  },
  {
    id: 4,
    name: "Bucket",
    price: 100,
  },
  {
    id: 5,
    name: "Cup",
    price: 200,
  },
];
let maxId = 6;

router.get("/products", (req, res) => {
  res.send(products);
});

router
  .route("/products/add")
  .get((req, res) => {
    res.sendFile(path.join(pagesDir, "add-product.html"));
  })
  .post((req, res) => {
    products.push({
      id: maxId++,
      name: req.body.name,
      price: req.body.price,
    });
    res.redirect("/products");
  });

router
  .route("/products/edit/:id")
  .get((req, res) => {
    res.sendFile(path.join(pagesDir, "edit-product.html"));
  })
  .post((req, res) => {
    const product = products.find((product) => product.id == req.params.id);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
    }
    res.redirect("/products");
  });

router
  .route("/products/delete/:id")
  .get((req, res) => {
    res.sendFile(path.join(pagesDir, "delete-product.html"));
  })
  .post((req, res) => {
    const index = products.findIndex((product) => product.id == req.params.id);
    if (index !== -1) {
      products.splice(index, 1);
      console.log(products);
    }
    res.redirect("/products");
  });

export default router;
