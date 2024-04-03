const client = require("../utils/client");
const fs = require('fs')

class ProductService {
    async addProduct(name, desc, price, oldPrice, category, image) {
        const product = await client.product.create({ data: { name, desc, price, oldPrice, category: category, image: image } });
        return product
    }

    async getProducts() {

        const products = await client.product.findMany();

        return products;
    }

    async getProduct(id) {
        const product = await client.product.findUnique({ where: { id: parseInt(id) } });

        if (!product) return { error: "Product not found" };

        return product
    }

    async delProduct(id) {
        const product = await client.product.findUnique({ where: { id: parseInt(id) } });
        await client.product.delete({ where: { id: parseInt(id) } });
        await fs.unlink(`public/images/${product.image}`, (err) => console.log(err));
        return true
    }

    async updateProduct(id, data) {
        const product = await client.product.update({ where: { id: parseInt(id) }, data: data });
        return product
    }
}

module.exports = new ProductService();