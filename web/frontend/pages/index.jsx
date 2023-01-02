import {Card,Page,Layout} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Test title" />
      <Layout>
      <Card sectioned><h1 style={{fontSize: "28px"}}>Hello world! &#129409;</h1></Card>
      </Layout>
    </Page>
  );
}
