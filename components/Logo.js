import Link from "next/link";

const ImageLink = 'https://i.ibb.co/kyGZHpk/logo.jpg';


export default function Logo() {
    return (
        <Link href={'/'} className="flex gap-3 items-center">
         <img src={ImageLink} width={60} height={60} ></img>
        <span className="font-bold text-gray-800 text-lg">
            Yutaka Admin
        </span>
        
        </Link>

        

    );
}

