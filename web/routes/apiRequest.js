import shopify from "../shopify-auth/shopify.js";
import express from "express";
const apiRequest = express.Router();



apiRequest.get("/products/count", async (_req, res) => {
    const countData = await shopify.api.rest.Product.count({
      session: res.locals.shopify.session,
    });
    res.status(200).send(countData);
  });
  



export {apiRequest}; 