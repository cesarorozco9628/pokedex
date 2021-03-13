import React, { useEffect, useState } from 'react'
import { useParams, NavLink, useHistory} from 'react-router-dom';
import axios from 'axios';

const Pokemon = () => {
    const {id} = useParams();
    const [name, setName] = useState(null);
    const [img, setImg] = useState(null);
    const [type, setType] = useState(null);
    const [hp, setHp] = useState(null);
    const [attack, setAttack] = useState(null);
    const [defense, setDefense] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [moves, setMoves] = useState(null);
    const [abilities, setabilities] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [order, setOrder] = useState(null);
    const history = useHistory();


    useEffect(() => {
        const res = axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        res.then((response) => {
            setName(response.data.forms[0].name);
            setImg(response.data.sprites.front_default);
            setType(response.data.types);
            setHp(response.data.stats[0].base_stat);
            setAttack(response.data.stats[1].base_stat);
            setDefense(response.data.stats[2].base_stat);
            setSpeed(response.data.stats[5].base_stat);
            setMoves(response.data.moves);
            setabilities(response.data.abilities);
            setHeight(response.data.height);
            setWeight(response.data.weight);
            setOrder(response.data.order);
        })
    },[])

    const Encounter = () => {
        history.push(`/pokedex/pokemon/${id}/encounter`);
    }
    // useEffect(() => {
    //     img ={
    //         background: ``
    //     }
    //     this.setState({
    //       background:`red`      
    //     })
    // },[])

    return(
        <div className="pokemon">
            <div className='logo-poke'></div>
            {/* <div  style = {{background:`black` }}>abcdefghijklmnopq</div>
            <div  style = {{background: this.State.background}}>abcdefghijklmnopq</div> */}
            <div> <img src={img} alt='pokemon-card'/> </div>

        <div className='All-skill'>
                <div className="title-poke col-p col-s-12 col-12">
                <h1>{name}</h1>
                <button className='btn-encounters' onClick={Encounter}>Encounter</button>
                </div>
                
        <div className="colum-big-1 col- col-s-12 col-12">
        <div className="colum-medi-1 col- col-s-12 col-6">
                        <div className='H-W-P'>
                            <p>Heigth: {height}</p>
                            <p>#{order} in pokedex</p>
                            <p>Weight: {weight}</p>
                            
                        </div>
            <div className='colum-medi-2 col- col-s-12 col-12'>    
                        <div className="Type-poke">
                            <h3>Type</h3>
                                {type ? type.map((value) => {
                                    return <p>{value.type.name}</p>
                                }):null}
                        </div>
                                
                        <div className="abilities-poke">
                            <h3>Abilities</h3>
                            {abilities ? abilities.map((value) => {
                                    return <p>{value.ability.name}</p>
                                }):null}
                        </div>
            </div>
                        <div className="poke-power col- col-s-12 col-12">
                            <h3>HP</h3>
                            <p>{hp}</p>
                            <h3>Attack</h3>
                            <p>{attack}</p>
                            <h3>Defense</h3>
                            <p>{defense}</p>
                            <h3>Speed</h3>
                            <p>{speed}</p>
                        </div>
        </div>
        
                <div className='movesP col- col-s- col-12'>
                    <h3>Moves</h3>
                        {moves ? moves.map((value) => {
                            return <p>{value.move.name}</p>
                        }):null}
                </div>
         </div>
        </div>

        <NavLink to='/pokedex' className='link-pok'>back to list</NavLink>
        <div className='pie-pagina'>
                <ul>
                    <ol>Cesar Orozco</ol>
                    <ol>tlf:+52 56 1604 6595</ol>
                </ul>
                <ul>
                    <ol>Sandra Rodriguez</ol>
                    <ol>tlf:+57 320 377 9042</ol>
                </ul>
                <ul>
                    <ol>Jorge Araque</ol>
                    <ol>tlf:+57 321 779 5401</ol>
                </ul>
            </div>
        </div>
    );
}
export default Pokemon;