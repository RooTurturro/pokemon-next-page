import { useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti'

import { Layout } from "../../components/layouts"
import { pokeApi } from "../../api";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";




interface  Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

  const onToggleFavorites = () => {
    localFavorites.onToggleFavorites(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if( !isInFavorites ){

      let count = 400;
      let defaults = {
        angle: -100,
        origin: { x:1, y: 0 }
        };


      const fire =(particleRatio: number, opts: { spread: number; startVelocity?: number; decay?: number; scalar?: number; }): any =>{
        "use strict"
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, {
        spread: 70,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
          }
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px' }} gap={ 2 }>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{padding:'30px'}}>
            <Card.Body>
              <Card.Image 
              src={pokemon.sprites.other?.dream_world.front_default || 'no-image'}
              alt= {pokemon.name}
              width='100%'
              height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{display: 'flex', justifyContent:'space-between'}}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                color = 'gradient'
                ghost = {!isInFavorites}
                onClick={ onToggleFavorites }
              >
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)
  
  return {
    paths: pokemonNames.map(name =>({
      params: { name }
    })),
    fallback: 'blocking'  
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name)

  if (!pokemon) {
    return {
      redirect:{
        destination:'/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400,
  }
}



export default PokemonByNamePage