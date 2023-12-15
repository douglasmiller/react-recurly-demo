'use client'

import { useRecurly } from "@recurly/react-recurly"
import { TokenPayload } from "@recurly/recurly-js";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AmazonPayV2() {
  const [ready, setReady] = useState(false);
  const recurly = useRecurly();
  const amazonPayId = `amazon-pay-${uuidv4()}`;
  console.log('amazonPayId', amazonPayId)
  const amazonOptions = {
    region: "us",
  };
  const amazonPay = recurly.AmazonPay(amazonOptions);
  // only do this when ready
  const amazonPayClick = () => {
    //if (ready) amazonPay.attach();
    console.log('click')
    amazonPay.attach();
  }

  amazonPay.on("ready", () => {
    console.log("recurly.AmazonPay ready", amazonPayId);
    amazonPay.renderButton(amazonPayId);
    // setReady(true)
  });
  amazonPay.on("error", (e) => {
    console.error("recurly.AmazonPay error", e);
  });
  amazonPay.on("token", (token: TokenPayload) => {
    console.log("recurly.AmazonPay token:", token);
  });

  return (
    <div id={amazonPayId} onClick={amazonPayClick}>Pay with Amazon Pay</div>
  );
}