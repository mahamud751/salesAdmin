import {
  RecoilRoot
} from 'recoil';
import Layout from "../component/Layout";
export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}
