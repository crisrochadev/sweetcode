import { useRouter } from "next/router"

export default function Search(){
    const router = useRouter()
    const {search} = router.query
    return(
        <div>
            <h1>Pesquisar por {search}</h1>
        </div>
    )
}