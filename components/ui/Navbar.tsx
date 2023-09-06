import NextLink from 'next/link'
import { useTheme, Text, Spacer,Link } from "@nextui-org/react"
import Image from "next/image"


export const Navbar = () => {

  const { theme } = useTheme()

  return (
    <div style={{
      display:'flex',
      width: '100%',
      height: '60px',
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0x 20x',
      backgroundColor: theme?.colors.gray600.value
    }}>

      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
        alt="Icono de la app"
        width={50}
        height={50}
      />

      <NextLink href='/' passHref>
        <Link>
          <Text color="white" h2>P</Text>
          <Text color="white" h3>okémon</Text>
        </Link>
      </NextLink>
      
      <Spacer css={{flex:1}}/>

      <NextLink href='/favorites' passHref>
        <Link css={{marginRight: '20px'}}>
          <Text color="white" h4 >Favoritos</Text>
        </Link>
      </NextLink>
      
    </div>
  )
}
