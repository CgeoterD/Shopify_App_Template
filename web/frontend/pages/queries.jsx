import React from 'react';
import {Layout, LegacyCard, Page, Text, TextField, Button, Banner} from "@shopify/polaris";
import {TitleBar} from "@shopify/app-bridge-react";
import {useAuthenticatedFetch} from "../hooks/index.js";
import {useState} from 'react';

function Queries() {
    const fetch = useAuthenticatedFetch();
    const [value, setValue] = useState('');
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [productCard, setProductCard] = useState(null);
    const [errorOccurredWithFetchedData, setErrorOccurredWithFetchedData] = useState(false);

    const productInputHandle = (newValue) => {
        setValue(newValue)
    }

    const queryHandler = async () => {
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
                    setProductCard({image: data.body.data.product.featuredMedia?.preview.image.src, title: data.body.data.product.title})
                    console.log(productCard)
                })
        } catch(err) {
            setProductCard(null)
            setErrorOccurredWithFetchedData(true)
            console.log("Error was occurred with fetch request!")
        }
    }
    return (
        <Page narrowWidth>
            <TitleBar title="Examples of Queries" />
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
                    <div style={{margin:"15px 0"}}>
                        <Button loading={submitButtonLoading}  primary onClick={queryHandler}>
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
                        <div style={{display:"flex", flexFlow:"column", justifyContent:"center", gap: "10px"}}>
                        <Text alignment={"center"} variant="bodyMd" as="p">
                            {productCard.title}
                        </Text>
                            {productCard.image ? (
                                <img src={productCard.image} style={{maxWidth:"100%", maxHeight:"250px", objectFit:"contain"}} alt=""/>
                            ) : (
                                <Banner
                                    title="A product hasn't any image"
                                    status="warning"
                                ></Banner>
                            )}
                        </div>
                    </LegacyCard>
                ) : null}

            </Layout.Section>
        </Page>
    );
}

export default Queries;