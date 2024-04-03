const productService = require("../services/product.service");


class ProductController {

    async addProduct(req, res) {
        try {
            console.log(req);
            const { name, desc, price, oldPrice, category } = req.body;
            const data = await productService.addProduct(name, desc, price, oldPrice, category, req.file.filename)
            return res.json({ status: true, message: "Product created", data: data })
        } catch (error) {
            console.log(error);
            return res.json({ status: false, message: "Internal Server error", data: [] })
        }
    }

    async getProduct(req, res) {
        try {
            const data = await productService.getProduct(req.params.id);
            return res.json({ status: true, message: `Product with id: ${req.params.id}`, data: data })
        } catch (error) {
            console.log(error);
            return res.json({ status: false, message: "Internal Server error", data: [] })
        }
    }

    async getProducts(req, res) {
        try {
            const data = await productService.getProducts();

            return res.json({ status: true, message: "All products", data: data })
        } catch (error) {
            console.log(error);
            return res.json({ status: false, message: "Internal Server error", data: [] })
        }
    }

    async updateProduct(req, res) {
        try {
            console.log(req.body);
            const data = await productService.updateProduct(req.params.id, req.body);
            return res.json({ status: true, message: "Product updated", data: data })
        } catch (error) {
            console.log(error);
            return res.json({ status: false, message: "Internal Server Error", data: [] })
        }
    }

    async delProduct(req, res) {
        try {
            const data = await productService.delProduct(req.params.id);

            if (!data) return { status: true, message: `International Server ErrorE`, data: [] }

            return res.json({ status: true, message: `Product with id: ${req.params.id} deleted`, data: [] })
        } catch (error) {
            console.log(error);
            return res.json({ status: false, message: "Internal Server error", data: [] })
        }
    }

}

module.exports = new ProductController()

