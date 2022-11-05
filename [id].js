import {useRouter} from 'next/router';
import Image from "next/image";
import Link from "next/link";
export default function photo({photo}){
    const router = useRouter();
    if(!router.isFallback && !photo){
        return <div>
            ERROR 404 PAGE NOT FOUND 
            </div>
    }
    return(
        <div> 
            <div className="imagecontainer"> 
                {router.isFallback ?(
                    <div> 
                        Loading ...
                        </div>
                ):(
                    <>
                    <Image width ={960} priority height ={540} src ={photo}/>
                    </>
                )}
                </div>
                <div className="imagecontainer"> 
                    <Link className = "homeButton" href="/">
                        <a>
                            <button className = "button"> 
                                Home
                                </button>
                            </a> 
                    </Link>
                    </div>
            </div>

    )
}
export async function getStaticProps({params}){
    const nasa_id = params.id; 
     const results = await fetch (`https://images-api.nasa.gov/asset/${nasa_id}` );
     const previews = await results.json();
     const photo = await previews.collection.items[0].href;

     return{
        props: {photo},
     };
}

export async function getStaticPaths(){
    const results = await fetch("https://images-api.nasa.gov/search?media_type=image");
    const preview = await results.json();
    const items = await preview.collection.items; 

    return {
        paths: 
        items?.map((nasa)=> ({
            params: {
                id: nasa.data[0].nasa_id,
            }
        })) || [], 
        fallback: true,
    }
}