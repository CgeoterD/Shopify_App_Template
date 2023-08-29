import shopify from "../shopify-auth/shopify.js";
import express from "express";
import WebhookHandlers from "../webhooks/webhooks.js";
import {productHandler} from "./productHandler.js";
import {webhooksHandler} from "./webhooksHandler.js";
import {orderHandler} from "./orderHandler.js";
import {graphQlHandler} from "./graphQlHandler.js";
const apiRequests = express.Router();


apiRequests.use(`/products`, productHandler)
apiRequests.use(`/webhook`, webhooksHandler)
apiRequests.use(`/order`, orderHandler)
apiRequests.use(`/graphql`, graphQlHandler)

export {apiRequests};