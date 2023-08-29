import express from "express";
import shopify from "../shopify-auth/shopify.js";

const graphQlHandler = express.Router();

graphQlHandler.post('/product', async (req, res) => {
    const client = new shopify.api.clients.Graphql({session: res.locals.shopify.session});
    try {
        const data = await client.query({
            data: `query {
                product(id: "gid://shopify/Product/${req.body.productId}") {
                    title
                    featuredMedia {
                          preview {
                            image {
                              src
                            }
                          }
                        }
                    }
                }`
            ,
        });
        res.status(200).send(data)

    } catch (err) {
        res.status(404).send('{"message":"Error occurred with query"}')
    }

})


export {graphQlHandler}
