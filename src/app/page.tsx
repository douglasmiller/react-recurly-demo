'use client'

import { Address } from '@/components/address'
import AmazonPayV2 from '@/components/amazon-pay-v2'
import Configuration from '@/components/configuration'
import { CustomerInfo } from '@/components/customer-info'
import { PaymentForm } from '@/components/payment-form'
import { PaymentMethods } from '@/components/payment-methods'
import { PricingPreview } from '@/components/pricing-preview'
import RJSProvider from '@/components/rjs-provider'
import { Venmo } from '@/components/venmo'
import { CardElement } from '@recurly/react-recurly'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <RJSProvider>
        <AmazonPayV2 />
        <Venmo />
        <PaymentForm>
          <CustomerInfo />
          <Address />
          <PaymentMethods>
            <CardElement />
          </PaymentMethods>
        </PaymentForm>
        <PricingPreview />
      </RJSProvider>
      <Configuration />
    </main>
  )
}
