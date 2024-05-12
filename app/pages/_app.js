import Head from 'next/head'
import { WalletConnectProvider } from '../components/WalletConnectProvider'
import '../styles/global.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { useUserProfile } from '../hooks/todo'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Web3Linkedin</title>
            </Head>
            <main>
                <WalletConnectProvider>
                    <Component {...pageProps} />
                </WalletConnectProvider>
            </main>
        </>
    )
}

export default MyApp
