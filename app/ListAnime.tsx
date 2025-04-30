'use client'

import { useEffect, useRef, useState } from 'react'

type Anime = {
    slug: string
    gambar: string
    eps: string[]
    rate: string[]
    judul: string
}

export default function ListAnime({ filter }: { filter: { type: string, value: string } }) {
    const [animeList, setAnimeList] = useState<Anime[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)

            let url = ''
            if (filter.type === 'genre') {
                if (filter.value === 'ongoing' || filter.value === 'complete') {
                    url = `https://backend.ryzendesu.vip/anime?type=${filter.value}&page=${page}`
                } else {
                    url = `https://backend.ryzendesu.vip/anime?genre=${filter.value}&page=${page}`
                }
            } else if (filter.type === 'search') {
                url = `https://backend.ryzendesu.vip/anime?search=${encodeURIComponent(filter.value)}&page=${page}`
            }

            const res = await fetch(url)
            const data: Anime[] = await res.json()

            if (page === 1) {
                setAnimeList(data)
            } else {
                setAnimeList((prev) => [...prev, ...data])
            }

            setLoading(false)
        }

        fetchData()
    }, [filter, page])

    useEffect(() => {
        setPage(1)
    }, [filter])

    // Observer: scroll ke bawah, tambah page
    useEffect(() => {
        const timeout = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !loading && page < 5) {
                        setPage((prev) => prev + 1);
                    }
                },
                {
                    rootMargin: '100px',
                }
            );

            if (observerRef.current) observer.observe(observerRef.current);

            return () => {
                if (observerRef.current) observer.unobserve(observerRef.current);
            };
        }, 500); // Penundaan 500ms

        return () => clearTimeout(timeout);
    }, [loading, page]);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {animeList.map((anime) => (
                    <a
                        href={'/anime/' + anime.slug}
                        key={anime.slug}
                        className="w-full hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative overflow-hidden rounded">
                            <img
                                src={anime.gambar}
                                alt="thumbnail"
                                className="aspect-[4/5] w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                            <p className="absolute top-0 bg-violet-700 text-white text-xs py-1 px-2 rounded-br-lg">
                                Eps {anime.eps[1]}
                            </p>
                            <p className="absolute top-0 right-0 bg-violet-700 text-white text-xs py-1 px-2 rounded-bl-lg">
                                {anime.rate[1]}
                            </p>
                            <p className="absolute bottom-4 line-clamp-2 text-sm text-white px-2">
                                {anime.judul}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
            <div ref={observerRef} className="py-8 flex justify-center items-center text-center text-sm text-gray-400">
            {loading ? (
                <img
                    src="/loading.gif"
                    alt="Loading..."
                    className="mx-auto w-[25%] h-[25%]"
                />
            ) : page >= 3 ? (
                'You’ve reached the end!'
            ) : (
                'Scroll to load more'
            )}
        </div>

            {/* Target untuk Intersection Observer */}
        </>
    )
}
