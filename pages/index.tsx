import Head from 'next/head'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project X</title>
      </Head>
      <main>
        <div className="container">
          <h1>
            Hello
          </h1>
          <Link href='/login'>Login</Link>
        </div>
      </main>
    </>
  )
}
