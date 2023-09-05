import {Page, Layout, LegacyCard, Text, Button} from '@shopify/polaris';
import {TitleBar} from "@shopify/app-bridge-react";

export default function HomePage() {

    return (
        <Page narrowWidth>
            <TitleBar title="Start page"/>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <Text variant="headingXl" alignment={"center"} as="h1">
                            Hello world! &#129409;
                        </Text>
                        <Text variant="bodyMd" alignment={"center"} as="p">
                            It's Shopify App template for Node.js
                        </Text>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
