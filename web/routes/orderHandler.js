import express from "express";
import shopify from "../shopify-auth/shopify.js";

const orderHandler = express.Router();

orderHandler.get("/find", async (_req, res) => {
    const countData = await shopify.api.rest.Order.find({
        session: res.locals.shopify.session,
        id: 5436334965053,
        fields: "id,line_items,name,total_price",
    });
    res.status(200).send(countData);
});


export {orderHandler}