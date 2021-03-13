import React, { useEffect, useState } from 'react'
import {NavLink, useParams} from 'react-router-dom'
import axios from 'axios';


const Encounter = () => {
    const {id} = useParams();
    const [encounter, setEncounter] = useState(null);

    useEffect(()=> {
        const res = axios(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
        res.then((response) => {
            setEncounter(response.data);
        })
    },[])

    return(
        <>

            <h1 className="encounter-title" >Encounters</h1>
           {encounter ? encounter.map((value) => {
               return (
                   <div className="encounter-wrap col-p col-s-4 col-3">
                            <div className='card-encounter '>
                                <h3>Area</h3>
                                    <p key={value.location_area.name}>{value.location_area.name}</p>
                            </div>
                   </div>         
               );
           }):null}

           <NavLink to={`/pokedex/pokemon/${id}`}><i className="fas fa-arrow-left arrow-back">Back to Pokemon</i></NavLink>
        </>
    );
}

export default Encounter;