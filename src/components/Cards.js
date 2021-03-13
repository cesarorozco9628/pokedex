import React,{useState,useEffect} from 'react'
import axios from "axios";
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom'


export const PokemonApi = ({name, url}) => {
    const [pokemon, setPokemon] = useState('');
    const [types, setTypes] = useState(null);
    const [hp, setHp] = useState(null);
    const [attack, setAttack] = useState(null);
    const [defense, setDefense] = useState(null);
    const [speed, setSpeed] = useState(null);

    useEffect(() => {
        const res = axios(url);
        res.then((response) =>{
            setPokemon(response.data.sprites.front_default);
            setTypes(response.data.types);
            setHp(response.data.stats[0].base_stat);
            setAttack(response.data.stats[1].base_stat);
            setDefense(response.data.stats[2].base_stat);
            setSpeed(response.data.stats[5].base_stat);
        })
        
    },[]);

    return(
        <>
        
                <div className='card-poke col- col-4 col-s-6'>
                    <div  style = {{backgroundColor:""}}>
                        </div>
                    <div className='card-info'>
                        <img className="imgPoke" src={pokemon} alt={name}/>
                        <h2>{name}</h2><br/>
                        <div className="skillPoke">
                        <span className="typebtn">Types</span>{types ? types.map((value) => {
                            return <p key={value.type.name}>{value.type.name}<br/></p>
                            }):null
                        }<br/>
                        <p>HP: {hp}</p><br/>
                        <p>Attack: {attack}</p><br/>
                        <p>Defense: {defense}</p><br/>
                        <p>Speed: {speed}</p>
                        </div>
                    </div>
                </div>
        </>
    );
}

export const ButtonCheck = ({selector}) => {
    return(
            <div className="switch-button">
                <input type="checkbox" name="switch-button" id="switch-label" className="switch-button__checkbox" onChange={selector}/>
                <label for="switch-label" className="switch-button__label"></label>
            </div>
    );
}

export const InputPokemon = () => {
    const {handleSubmit, register} = useForm();
    const [pok, setPok] = useState();
    const [id, setId] = useState(null);
    const history = useHistory();

    function pokFun (data){
        setPok(data);
        // console.log(pok);
    }

    useEffect(() => {
        if(pok){
            const res = axios.get(`https://pokeapi.co/api/v2/pokemon/${pok.pokemon}`);
            res.then((response) =>{
                setId(response.data.id);
                // console.log(id);
            })
        }
    },[pok])

    useEffect(() => {
        if(id){
            history.push(`/pokedex/pokemon/${id}`);
        }
    },[id])



    return (
       <>
          <p className="inputPokeP ">Ingresa el pokemon a buscar:</p>
          <div className="center-item">
          <form onSubmit={handleSubmit(pokFun)}>
            <label className="inputPokeL">
                <input name='pokemon' ref={register}/>
            </label>
            <button className="btSwitch">Get Pokemon</button>
          </form>
          </div>
       </>
    );
}

export const OptionPokemon = () => {
    const {register, handleSubmit} = useForm();
    const [types, setTypes] = useState([]);
    const [Ty, setTy] = useState([]);
    const [pokes,setPokes] = useState([]);
    const [current, setCurrent] = useState(null);
    const [Id, setId] =useState(null);
    const history = useHistory();

    useEffect(()=>{
        const res = axios('https://pokeapi.co/api/v2/type')
        res.then((response) =>{
            setTypes(response.data.results);
        })
    },[])


    useEffect(()=>{
            const res= axios.get(`https://pokeapi.co/api/v2/type/${Ty}`)
            res.then((response)=>{
                setPokes(response.data.pokemon);
                console.log(pokes);
            })
    },[Ty])

    const GetPok = (data) => {
        setTy(data.type);
    }
    const curretPokemon = (data) => {
        setCurrent(data.pokemon);
    }

    useEffect(() => {
        if(current){
            const res = axios.get(`https://pokeapi.co/api/v2/pokemon/${current}`);
            res.then((response) => {
                setId(response.data.id);
                console.log(Id);
            })
        }
    },[current])
    useEffect(() => {
        if(Id){
            history.push(`/pokedex/pokemon/${Id}`);
           }
    },[Id])

   return(
    <>
        <p className="inputPokeP">Seleccione el tipo</p>
        
            {pokes ? null :
                <form className="centerF" onChange={handleSubmit(GetPok)}>
                        <select name='type' ref={register}>
                            {types.map((value) =>{
                                return <option>{value.name}</option>
                            })}
                        </select>
                </form>
            }
        
            {pokes ? <form className="centerF" onSubmit={handleSubmit(curretPokemon)}>
                <select name='pokemon' ref={register}>
                    {pokes.map((element) =>{
                        return (
                            <option value={element.pokemon.name}>
                                    {element.pokemon.name}
                            </option>
                        );
                    })}
                </select>
                <button className="selectT">Submit</button>
            </form>:null}
        
    </>

   );
}

