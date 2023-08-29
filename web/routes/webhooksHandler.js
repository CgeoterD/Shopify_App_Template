import express from "express";
import shopify from "../shopify-auth/shopify.js";

const webhooksHandler = express.Router();

webhooksHandler.post('/register', async (req,res) => {
    const response = await shopify.api.webhooks.register({
        session: res.locals.shopify.session,
    });
    res.status(200).send('Webhook registered!')

})
webhooksHandler.get('/get', async (req,res) => {
    const response = await shopify.api.rest.Webhook.all({
        session: res.locals.shopify.session,
    });
    res.status(200).send(response)
})

export {webhooksHandler}
