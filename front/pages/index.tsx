import CustomerTable from '@/components/CustomerTable'
import { Typography } from 'antd'
import { Layout } from 'antd'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Customer Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Layout.Header
            style={{
              background: '#282A3A', height: '5rem', display: 'flex',
              alignItems: 'center'}}>
          <Typography.Title style={{color: 'white', fontSize: '2rem'}} level={1} color='white'>
            Customer Manager
          </Typography.Title>
        </Layout.Header>
        <Layout.Content style={{padding: '0 2rem', paddingBottom: '2rem'}}>
          <CustomerTable/>
        </Layout.Content>
      </Layout>
    </>
  )
}
