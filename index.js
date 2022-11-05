import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from "react"; 
import ImagePreview from '../components/ImagePreview';

export default function Home({items}) {
  const [search, setSearch] = useState(""); 
  const [photos, setPhotos] = useState(items);
  return (
    <div className ="container"> 
    <Head> 
      <title>Nasa Image Search </title>
      <link rel ="icon" href ="/favicon.ico" />
    </Head>

    <main className="main">
      <h1 className ="title">
        Welcome to Nasa's Image Library 
        </h1> 
        <input id="nasaSearch" onChange={(e)=> setSearch(e.target.value)} className="searchInput" type="text" placeholder="Search The NASA Library"/>
        <div className="fade">
          <button className="button" disabled ={search ==" "} onClick = {
            async () => {
              const results = await fetch (`https://images-api.nasa.gov/search?media_type=image&q=${search}`)
              const preview = await results.json();
              setPhotos(await preview.collection.items)
            }
          }>
            Find

          </button>
          
          
        <div className ="gridContainer">
        {photos && photos.map((preview)=>(
          <ImagePreview key ={preview.data[0].nasa_id}
          thumbnailURL = {preview.links[0].href}
          nasaID = {preview.data[0].nasa_id}/>
        ))}
        </div>
        </div>
       </main>
    </div>
  );
}

export async function getStaticProps(){
  const results = await fetch("https://images-api.nasa.gov/search?media_type=image");
  const preview = await results.json();
  const items = await preview.collection.items; 
  return{
    props: { items },
  };
}
