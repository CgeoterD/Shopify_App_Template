import React from 'react'
import {Card,Page,Layout} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function test() {
  return (
    <Page narrowWidth>
      <TitleBar title="Test page" />
      <Layout>
      <Card sectioned><h1 style={{fontSize: "28px"}}>Hello Test Page! &#128018;</h1></Card>
      </Layout>
    </Page>
  )
}
