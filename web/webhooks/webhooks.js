import { DeliveryMethod } from "@shopify/shopify-api";

export default { 
  //* If Shopify App will distributed through the Shopify App Store (public app)  needs to add - Mandatory webhook (https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks) //

  // To enable a webhook, you need to register it - register endpoint in index.js "app.post('/api/webhook/register...".

  //Example webhook - product update
  "products/update": {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
        const payload = await JSON.parse(body);
        console.log("Product update webhook")
    },
  },
  



};
