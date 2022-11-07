import Link from "next/link";

export default function Footer(){
    return(
        <footer className="border-t dark:border-gray-600 mb-4 w-full text-center py-2 px-4">
            <p>Esse blog foi desenvolvido em react.js e next.js, você pode ver mais detalhes do projeto em 
            <Link className="text-pink-600 ml-4 hover:text-pink-800 hover:underline" href="https://github.com/crisrochadev/sweetcode">Cris Rocha Dev - GitHub|SweetCode</Link>
            </p>
        </footer>
    )
}