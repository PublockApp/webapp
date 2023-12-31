import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import AccountNav from "../AccountNav";
import PublockImg from "../PublockImg";
import axios from "axios";

export default function PublocksPage(){
    const [publocks, setPublocks] = useState([]);
    useEffect(() => {
        axios.get('/user-publocks').then(({data}) => {
            setPublocks(data);
        });

    }, []);

    return (
        <div>
            <AccountNav /> 
                   <div className="text-center">

                   <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/publocks/new'}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                       <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                   </svg>
                       Add New Warehouse
                   </Link>
               </div>
            <div className="mt-4">
                {publocks.length > 0 && publocks.map(publock => (
                    <Link to={'/account/publocks/'+publock._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-200 grow shrink-0">
                            <PublockImg publock={publock} />
                        </div>
                        <div className="grow-0 shrink">
                        <h2 className="text-xl">{publock.title}</h2>
                        <p className="text-sm mt-2">{publock.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}