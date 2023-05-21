import Head from "next/head";
import dynamic from "next/dynamic";
// necessary due to bug in ant-design/plots which makes it incompatible with SSR
const Pie = dynamic<any>(() => import('@ant-design/plots').then(({ Pie }) => Pie), { ssr: false, });
import useCityStatistic from "@/hooks/useCityStatistic";

export default function Statistics() {
  const data = useCityStatistic()

  return <>
    <Head>
      <title>Statistics</title>
    </Head>
    <div
        style={{
          paddingTop: '2rem', width: '80%', display: 'flex', flexDirection: 'column',
          alignItems: 'center'}}>
      <h1 style={{marginBottom: '5rem'}}>City Distribution</h1>
      <Pie data={data} angleField='count' colorField='city'/>
    </div>
  </>
}