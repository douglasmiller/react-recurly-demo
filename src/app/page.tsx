import AmazonPayV2 from '@/components/amazon-pay-v2'
import Configuration from '@/components/configuration'
import RJSProvider from '@/components/rjs-provider'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RJSProvider>
        <AmazonPayV2 />
      </RJSProvider>
      <Configuration />
    </main>
  )
}
