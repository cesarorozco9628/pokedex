import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {ButtonCheck, InputPokemon, OptionPokemon, PokemonApi} from './Cards';
import Pagination from './pagination';
// import Pokemon from './pokemon';



const Pokedex = () =>{
    const [isPokes, setIsPokes] = useState([]);
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=4');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [slide, setSlide] = useState(true);
    const [count, setCount] = useState(1);

    useEffect(()=>{
        setLoading(true)
        let cancel
        const res = axios(currentPage, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        });
        res.then((response) => {
            setLoading(false);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            setIsPokes(response.data.results);
        })

        return () => cancel()
    },[currentPage])
  
    function NextPage(){
        setCurrentPage(nextPage);
        setCount(count+1);
    }
    const prevPageLink = () => {
        setCurrentPage(prevPage);
        setCount(count-1);
    }

    const Selector = () => {
        setSlide(!slide)
        console.log(slide);
    }

    if(loading) return (
    <>
         <div className="loadingio-spinner-eclipse-v8l1gx66g8b">
             <div className="ldio-6j9q25ieqlo">
                    <div></div>
            </div>
        </div>
    
    </>
  )
    const MyArrayOfPokes =  isPokes.map((value) => {
            return (
               <PokemonApi
                    name={value.name}
                    url={value.url}
                    key={value.name}
               />
            );            
    })
  
    return(
        <>
            <div className='logo-poke'></div>
            <ButtonCheck 
                selector={Selector}
            />
            {slide ? <InputPokemon/> : <OptionPokemon/>}
            <div className='card-home'>
                {isPokes.length > 0 ?  MyArrayOfPokes : null}
            </div>
            <div className='pagination'>
                <Pagination
                    GoToNext={nextPage ? NextPage : null}
                    curretPage={count}
                    preview={prevPage ? prevPageLink : null}
                />
            </div>
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
        </> 
    );
  }
  
  export default Pokedex;
