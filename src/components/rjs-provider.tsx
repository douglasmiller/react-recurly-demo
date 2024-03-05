'use client'

import { Elements, RecurlyProvider } from "@recurly/react-recurly";
import Script from "next/script";
import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { useConfigurationContext } from "./configuration-context";

type ProviderWithConfigParams = PropsWithChildren & {
  api: string;
  publicKey: string;
}

export default function RJSProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);

  const { api, rjs, publicKey } = useConfigurationContext();


  const providerParams = {
    api,
    publicKey,
  }

  return (
    <>
      <Script
        src={rjs}
        onLoad={() => setLoading(false)}
      />
      {loading && <div>loading...</div>}
      {!loading && !providerParams.publicKey && <NeedsConfiguration />}
      {!loading && providerParams.publicKey && <ProviderWithConfig {...providerParams}>{children}</ProviderWithConfig>}
    </>
  )
}

function NeedsConfiguration() {
  return (
    <div>Please open the settings panel and set your public key</div>
  )
}

function ProviderWithConfig({ children, api, publicKey }: ProviderWithConfigParams) {
  return (
    <RecurlyProvider publicKey={publicKey} api={api}>
      <Elements>
        {children}
      </Elements>
    </RecurlyProvider>
  )
}
