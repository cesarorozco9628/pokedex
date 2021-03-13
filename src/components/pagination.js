import React from 'react'

const Pagination = ({GoToNext, preview,curretPage}) => {
    return(
        <>
            {preview && <button onClick={preview} className='btn-pgn'>Previous</button>}
            <span className='spn-p'>{curretPage}</span>
            {GoToNext && <button onClick={GoToNext} className='btn-pgn'>Next</button>}
        </>
    );
}
export default Pagination;