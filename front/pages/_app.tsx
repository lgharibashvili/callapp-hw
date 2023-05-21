import { ConfigProvider, Layout, Menu, ThemeConfig, Typography } from "antd"
import "@/styles/globals.css"
import "antd/dist/reset.css"
import { AppProps } from "next/app"
import Link from "next/link"
import { useRouter } from "next/router"
import { FunctionComponent, ReactNode } from "react"
import Head from "next/head"

const theme: ThemeConfig = {
  token: {}
}

type MenuLinkProps = {
  href: string,
  children: ReactNode
}
const MenuLink: FunctionComponent<MenuLinkProps> = ({href, children}) => {
  const {pathname} = useRouter()
  const isSelected = pathname === href

  return (
    <Link 
        style={{
          fontSize: 'large', marginRight: '4rem',
          color: isSelected? '#57C5B6': undefined,
          cursor: isSelected? 'default': 'pointer'
        }}
        href={href}>
      {children}
    </Link>)
}

export default function App({ Component, pageProps }: AppProps) {
  return <>
      <Head>
        <title>Customer Manager</title>
      </Head>
      <ConfigProvider theme={theme}>
        <Layout style={{minHeight: '100vh'}}>
          <Layout.Header
              style={{
                background: '#282A3A', height: '5rem', display: 'flex',
                alignItems: 'center'}}>
            <Typography.Title
                style={{
                  color: 'white', fontSize: '1.6rem', marginTop: '0rem', fontWeight: 400,
                  marginBottom: '0.5rem', marginRight: '5rem'}}
                level={1} color='white'>
              Customer Manager
            </Typography.Title>
            <MenuLink href='/'>Customers</MenuLink>
            <MenuLink href='/statistics'>Statistics</MenuLink>
          </Layout.Header>
          <Layout.Content style={{padding: '0 2rem', paddingBottom: '2rem', flexGrow: 1}}>
            <Component {...pageProps} />
          </Layout.Content>
        </Layout>
    </ConfigProvider>
  </>
}