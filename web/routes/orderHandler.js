import express from "express";
import shopify from "../shopify-auth/shopify.js";

const orderHandler = express.Router();

orderHandler.get("/all", async (_req, res) => {
    const countData = await shopify.api.rest.Order.all({
        session: res.locals.shopify.session,
    });
    res.status(200).send(countData);
});


export {orderHandler}