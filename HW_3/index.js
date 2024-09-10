class ProductsController {
  #baseUri;
  constructor(baseUri) {
    this.#baseUri = baseUri;
  }

  async create(product) {
    return await fetch(`${this.#baseUri}/products`, {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  async readAll() {
    const product = await fetch(`${this.#baseUri}/products`);
    return await product.json();
  }

  async read(id) {
    const product = await fetch(`${this.#baseUri}/products/${id}`);
    return await product.json();
  }

  async update(id, product) {
    return await fetch(`${this.#baseUri}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  }

  async delete(id) {
    return await fetch(`${this.#baseUri}/products/${id}`, {
      method: "DELETE",
    });
  }
}

let buffer;
const controller = new ProductsController("http://localhost:3000");
controller
  .create({ id: "4", title: "cake", price: 250 })
  .then(() => controller.update(4, { title: "cake", price: 999 }))
  .then(() =>
    controller
      .readAll()
      .then((products) => (buffer = Buffer.from(JSON.stringify(products))))
  )
  .then(() => controller.delete(4))
  .then(() => console.log(buffer.toString()));
