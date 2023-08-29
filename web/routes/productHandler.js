import express from "express";
import shopify from "../shopify-auth/shopify.js";

const productHandler = express.Router();

productHandler.get("/count", async (_req, res) => {
    const countData = await shopify.api.rest.Product.count({
        session: res.locals.shopify.session,
    });
    res.status(200).send(countData);
});
productHandler.get("/product", async (_req, res) => {
    const data = await shopify.api.rest.Product.find({
        session: res.locals.shopify.session,
        id: _req.body.productId,
    });
    res.status(200).send(data);
});

export {productHandler}