import type { 
  GetServerSideProps,
   NextPage
} from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'

// Sanity
import {sanityClient, urlFor} from '../sanity';

// models
import {CollectionModel} from '../typings'

interface IHomePage {
  collections: CollectionModel[]
}

const Home = ({collections}: IHomePage) => {
  return (
    <div className='w-full h-screen bg-sky-800'>
      <div className='max-w-7xl mx-auto flex-col py-20 px-10 2xl:px-0 h-screen'>
        <Head>
          <title>NFT Drop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className='mb-10 text-4xl font-extralight text-white'>
          The {' '} <span className='font-extrabold underline decoration-pink-600/50'>David</span> {' '} NFT Market Place
        </h1>

        <main className='bg-sky-500 p-10 shadow-xl shadow-rose-400'>
          <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {collections.map(collection => (
              <Link href={`/nft/${collection.slug.current}`} key={collection._id}>
                <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105 w-full space-x-reverse'>
                  <img 
                    src={urlFor(collection.mainImage).url()}
                    alt="" 
                    className='h-96 w-60 rounded-2xl object-cover'
                  />
                  <div>
                    <h2 className='text-3xl text-center text-white' >{collection.title}</h2>
                    <p className='mt-2 text-sm text-gray-700 text-center'>{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>

  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const query = `
    *[_type == "collection"]{
      _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage {
       asset
     },
     previewImage {
       asset
     },
     slug {
       current
     },
     creator-> {
       _id,
       name,
       address,
       slug {
       current
      },
     },
    }`

    const collections = await sanityClient.fetch(query);

    console.log(collections);

    return {
      props: {
        collections,
      }
    };
}
 