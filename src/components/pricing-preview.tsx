'use client'

import { Subscription, useCheckoutPricing, type UseCheckoutPricingInput } from "@recurly/react-recurly";
import { CheckoutPrice } from "@recurly/recurly-js";
import React, { type ReactNode } from "react";

export function PricingPreview (): ReactNode {
  const initialPricingInput: UseCheckoutPricingInput = {
    subscriptions: [
      {
        plan: 'basic'
      },
    ],
    adjustments: [
      {
        amount: 2.99,
        quantity: 1,
        taxExempt: false,
        taxCode: '',
      },
    ],
  };

  const [{ price, loading }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  if (loading) return false;

  return (
    <div>
      <h2>Pricing</h2>
      <PricingBreakdown {...price} />
    </div>
  );
}

function PricingBreakdown ({ now, next }: CheckoutPrice): ReactNode {
  console.log('now', now)
  const subscriptions = now.items.filter((item) => item.type === 'subscription');
  return (
    <>
      <table className="w-1/3">
        <thead>
          <tr>
            <th></th>
            <th>Now</th>
            <th>Next</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adjustments</td><td>{now.adjustments}</td><td>{next.adjustments}</td>
          </tr>
          <tr>
            <td>Subscriptions</td><td>{now.subscriptions}</td><td>{next.subscriptions}</td>
          </tr>
          <tr>
            <td>Subtotal</td><td>{now.subtotal}</td><td>{next.subtotal}</td>
          </tr>
          <tr>
            <td>Taxes</td><td>{now.taxes}</td><td>{next.taxes}</td>
          </tr>
          <tr>
            <td>Total</td><td>{now.total}</td><td>{next.total}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h4>Subscriptions</h4>
        { subscriptions.map((sub) => <div key={sub.id}>
          { sub.setupFee }
        </div>)}
      </div>
    </>
  )
}
