'use client'
import { useState } from 'react'
import NavBar from './NavBar'
import ListAnime from './ListAnime'
import Copyright from '@/components/Copyright'
import Header from '@/components/Header'

export default function Home() {
    const [filter, setFilter] = useState({ type: 'genre', value: 'ongoing' });

    return (
        <div className='pb-5 px-5 lg:px-28'>
            <Header />
            <NavBar
                onGenreChange={(genre) => setFilter({ type: 'genre', value: genre })}
                onSearchChange={(query) => setFilter({ type: 'search', value: query })}
            />
            <ListAnime filter={filter} />
            <Copyright />
        </div>
    );
}
