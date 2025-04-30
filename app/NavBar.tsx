'use client';

import { useEffect, useState } from 'react';
import { Search, Calendar, MessageCircle } from 'lucide-react';
import DisqusComments from '@/components/DisqusComments';

export default function NavBar({
    onGenreChange,
    onSearchChange,
}: {
    onGenreChange: (genre: string) => void;
    onSearchChange: (query: string) => void;
}) {
    type GenreItem = {
        slug: string;
        judul: string;
    };

    const [genreList, setGenreList] = useState<GenreItem[]>([]);
    const [genre, setGenre] = useState('ongoing');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDisqus, setShowDisqus] = useState(false);

    function toggleDisqus() {
        setShowDisqus((prev) => !prev);
    }

    function toggleDisqusContainer(event: React.MouseEvent) {
        const container = document.getElementById('disqus-container');

        // Tutup hanya jika klik terjadi di luar kontainer
        if (container && !container.contains(event.target as Node)) {
            setShowDisqus(false);
        }
    }

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearchChange(searchQuery);
        } else {
            onGenreChange(genre); // Reset ke genre default saat kosong
        }
    }

    useEffect(() => {
        async function getGenreList() {
            const res = await fetch('https://backend.ryzendesu.vip/genre');
            const data = await res.json();

            const modified = [
                { slug: 'ongoing', judul: 'Ongoing' },
                { slug: 'complete', judul: 'Complete' },
                ...data,
            ];

            setGenreList(modified);
        }

        getGenreList();
    }, []);

    useEffect(() => {
        onGenreChange(genre);
    }, [genre]);

    function toggleSearch() {
        setShowSearchInput((prev) => !prev);
    }

    return (
        <section className="py-5">
            <div className="flex justify-between gap-4 md:items-center">
                <select
                    name="genre"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="outline-0 border border-gray-200 p-2 rounded-md"
                >
                    {genreList.map((genre: any) => (
                        <option value={genre.slug} key={genre.slug}>
                            {genre.judul}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2 items-center">
                    {/* Tombol Search hanya tampil di bawah md */}
                    <button
                        onClick={toggleSearch}
                        className="bg-violet-700 text-white rounded-lg p-2 cursor-pointer md:hidden"
                    >
                        <Search />
                    </button>

                    <a href="/jadwal" className="bg-violet-700 text-white rounded-lg p-2">
                        <Calendar />
                    </a>
                    <button
                        id="disqus-button"
                        onClick={toggleDisqus}
                        className="bg-violet-700 text-white rounded-lg p-2 cursor-pointer"
                    >
                        <MessageCircle />
                    </button>
                </div>
            </div>

            {/* Search Input */}
            <form
                onSubmit={handleSearchSubmit}
                className={`
                    overflow-hidden transition-all duration-300 mt-3 rounded-lg bg-gray-100
                    ${showSearchInput ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                    md:max-h-none md:opacity-100
                `}
            >
                <div className="flex items-center">
                    <input
                        type="text"
                        className="w-full py-3 px-4 border-0 outline-0 bg-transparent"
                        placeholder="Search anime..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-violet-700 text-white rounded-r-lg p-3 cursor-pointer ml-2 h-full"
                    >
                        search
                    </button>
                </div>
            </form>

            {showDisqus && (
                <div
                    onClick={toggleDisqusContainer}
                    id="disqus-overlay"
                    className="fixed flex inset-0 bg-black/50 z-50 items-center justify-center"
                >
                    <div
                        id="disqus-container"
                        className="bg-white w-11/12 max-w-4xl h-[90vh] overflow-auto p-4 rounded-lg shadow-lg"
                    >
                        <DisqusComments
                            identifier="main-page" // Ganti dengan ID unik halaman
                            title="Main Page" // Ganti dengan judul halaman
                            url={typeof window !== 'undefined' ? window.location.href : ''} // URL halaman saat ini
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
