import React from 'react';
import {Layout, LegacyCard, Page, Text, TextField, Button, Banner} from "@shopify/polaris";
import {TitleBar} from "@shopify/app-bridge-react";
import {useAuthenticatedFetch} from "../hooks/index.js";
import {useState} from 'react';

function Queries() {
    const fetch = useAuthenticatedFetch();
    const [value, setValue] = useState('');
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [submitButtonOrderLoading, setSubmitButtonOrderLoading] = useState(false);
    const [productCard, setProductCard] = useState(null);
    const [errorOccurredWithFetchedData, setErrorOccurredWithFetchedData] = useState(false);
    const [orderValue, setOrderValue] = useState(null);

    const productInputHandle = (newValue) => {
        setValue(newValue)
    }
    const productQueryHandler = async () => {
        setSubmitButtonLoading(true)
        setErrorOccurredWithFetchedData(false)
        try {
            const data = await fetch(`/api/graphql/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({productId: value})
            })
                .then(response => response.json())
                .then(data => {
                    setSubmitButtonLoading(false)
                    setProductCard({
                        image: data.body.data.product.featuredMedia?.preview.image.src,
                        title: data.body.data.product.title
                    })
                    console.log(productCard)
                })
        } catch (err) {
            setProductCard(null)
            setErrorOccurredWithFetchedData(true)
            console.log("Error was occurred with fetch request!")
        }
    }
    const orderQueryHandler = async () => {
        setSubmitButtonOrderLoading(true)

        await fetch(`/api/order/all`)
            .then(response => response.json())
            .then(data => {
                if (data.data.length > 0) {
                    setOrderValue(data.data[0])
                } else {
                    setOrderValue("empty")
                }
                console.log(data.data)
                setSubmitButtonOrderLoading(false)
            })

    }

    return (
        <Page narrowWidth>
            <TitleBar title="Examples of Queries"/>
            <Layout.Section>
                <LegacyCard sectioned>
                    <Text variant="headingXl" alignment={"center"} as="h1">
                        Getting product info from the shop
                    </Text>
                    <Text variant="bodyMd" alignment={"center"} as="p">
                        Populate a product id in the following input field and click "Submit"
                    </Text>
                </LegacyCard>
                <LegacyCard sectioned>
                    <TextField
                        placeholder={"385..."}
                        label={"Product id"}
                        value={value}
                        onChange={productInputHandle}
                        autoComplete="off"
                    />
                    <div style={{margin: "15px 0"}}>
                        <Button loading={submitButtonLoading} primary onClick={productQueryHandler}>
                            Submit
                        </Button>
                    </div>
                    {errorOccurredWithFetchedData ? (
                        <Banner
                            title="Id that you provide doesn't exist!"
                            status="critical"
                        ></Banner>
                    ) : null}
                </LegacyCard>
                {productCard && productCard.title ? (
                    <LegacyCard sectioned>
                        <div style={{display: "flex", flexFlow: "column", justifyContent: "center", gap: "10px"}}>
                            <Text alignment={"center"} variant="bodyMd" as="p">
                                {productCard.title}
                            </Text>
                            {productCard.image ? (
                                <img src={productCard.image}
                                     style={{maxWidth: "100%", maxHeight: "250px", objectFit: "contain"}} alt=""/>
                            ) : (
                                <Banner
                                    title="A product hasn't any image"
                                    status="warning"
                                ></Banner>
                            )}
                        </div>
                    </LegacyCard>
                ) : null}
                <LegacyCard sectioned>
                    <Text variant="headingXl" alignment={"center"} as="h1">
                        Getting the latest order
                    </Text>
                    <div style={{margin: "10px 0"}}>
                        <Button loading={submitButtonOrderLoading} primary onClick={orderQueryHandler}>
                            Submit
                        </Button>
                    </div>
                    {orderValue != null && orderValue !== "empty" ? (
                        <LegacyCard sectioned>
                            <Text variant="bodyMd" as="p">
                                ID: {orderValue.id} <br/>
                                Created at: {orderValue.created_at} <br/>
                                Status: {orderValue.financial_status} <br/>
                            </Text>
                            Order items: <br/>
                            <ul>
                                {orderValue.line_items.map(item => <li key={item.id}>{item.name}</li>)}
                            </ul>
                            <Banner
                                title="You can see list of all orders in the console"
                                status="info"
                            ></Banner>
                        </LegacyCard>
                    ) : orderValue ? (
                        <LegacyCard>
                            <Banner
                                title="Order list is empty"
                                status="info"
                            ></Banner>
                        </LegacyCard>
                    ) : null}
                </LegacyCard>
            </Layout.Section>
        </Page>
    );
}

export default Queries;