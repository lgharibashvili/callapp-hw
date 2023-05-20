import { ConfigProvider, ThemeConfig } from "antd"
import "@/styles/globals.css"
import "antd/dist/reset.css"
import { AppProps } from "next/app"

const theme: ThemeConfig = {
  token: {}
}

export default function App({ Component, pageProps }: AppProps) {
  return <ConfigProvider theme={theme}>
    <Component {...pageProps} />;
  </ConfigProvider>
}