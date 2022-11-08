import MenuBar from "@components/geral/MenuBar"
import { useEffect, useState } from "react"

export default function Header(){
    
    const menu = [
        {id:1,icon:'home',label:'Inicio',url:'/'},
        {id:2,icon:'folders',label:'Categorias',url:'/categorias'},
        {id:3,icon:'address-card',label:'Sobre',url:'/paginas/sobre'},
        {id:4,icon:'mailbox',label:'Contato',url:'/paginas/contato'},
    ]

    return(
        <header className="w-full mb-4">
           <MenuBar menu={menu}/>
        </header>
    )
}