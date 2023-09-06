import Head from "next/head"
import { FC, PropsWithChildren } from "react"
import { Navbar } from "../ui";

interface Props {
  title?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name = 'author' content='Rocio Oliva Turturro'/>
        <meta name = 'description' content={`Informacion sobre ${title}`}/>
        <meta name = 'keywords' content={`${title}, pokemon, pokedex`}/>
      </Head>

      <Navbar/>

      <main style={{
        padding: '10px 20px'
      }}>
        {children}
      </main>
    </>
  )
}
