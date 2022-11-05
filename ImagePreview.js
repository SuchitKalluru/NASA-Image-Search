import Image from "next/image";
import Link from "next"; 

export default function ImagePreview({thumbnailURL, nasaID}){
return
    <div> 
        <Link as={`/photo/${nasaID}`}href ="/photo/[id]">
        
        <a> 
            <Image width = {250} height ={125} src ={thumbnailURL}/>
            <div> Nasa ID: {nasaID} 
                </div>
            </a>
        </Link>
    </div>
}