import CustomerTable from '@/components/CustomerTable'
import { Typography } from 'antd'
import { Layout } from 'antd'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Customers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CustomerTable/>
    </>
  )
}
