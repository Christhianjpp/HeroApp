import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import HeroCard from '../hero/HeroCard'
import { useForm } from '../hooks/useForm'
import { getHeroesByName } from '../selectors/getHeroesByName'


const SearchScreen = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { q = "" } = queryString.parse(location.search)

    const [{ searchText }, handleInputChange,] = useForm({
        searchText: q
    })

    const heroesFileted = useMemo(() => getHeroesByName(q), [q])

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`?q=${searchText}`)

    }

    return (
        <>
            <h1>Búsquedas</h1>
            <hr />

            <div className='row'>

                <div className='col-5'>
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Buscar un héroe'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button type='submit' className='btn btn-outline-primary mt-3'> Buscar</button>

                    </form>
                </div>

                <div className='col-7'>
                    <h4>Resultado</h4>
                    <hr />

                    {
                        (q === '')
                            ? <div className='alert alert-info' >Buscar un héroe</div>
                            : (heroesFileted.length === 0) && <div className='alert alert-danger' >No hay resultado {q}</div>
                    }

                    {
                        heroesFileted.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }


                </div>
            </div>
        </>
    )
}

export default SearchScreen