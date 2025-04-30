import { notFound } from 'next/navigation';
import Copyright from '@/components/Copyright'
import Header from '@/components/Header'


export default async function AnimePage({ params }: { params: any}) {
    const { slug } = await params;

    // Contoh fetch data berdasarkan slug
    const res = await fetch(`https://backend.ryzendesu.vip/anime/${slug}`);

    if (!res.ok) return notFound();

    const anime = await res.json();

    return (
        <div className='py-5 px-5 lg:px-28'>
            <Header />
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
                <div className="flex justify-center">
                    <img
                        src={anime.gambar}
                        alt={anime.judul}
                        className="h-56 w-36 object-cover rounded-lg"
                    />
                </div>
                <div className="more-info flex flex-col justify-between">
                    <h2 className="text-lg font-semibold">
                        {anime.judul} ({anime.namaJapan})
                    </h2>
                    <p>{anime.skor || "N/A"}</p>
                    <p>{anime.produser}</p>
                    <p>{anime.tipe}</p>
                    <p>{anime.status}</p>
                    <p>{anime.totalEpisode}</p>
                    <p>{anime.durasi}</p>
                    <p>{anime.rilis}</p>
                    <p>{anime.studio}</p>
                    <p>{anime.genre}</p>
                </div>
            </div>

            <div className="mt-4">
                <p>{anime.sinopsis || "Belum ada sinopsis untuk anime ini."}</p>
            </div>

            <div className="episode mt-6">
                <h2 className="text-lg font-semibold">Episode</h2>
                <div className="flex flex-col gap-2" id="episode">
                    {anime.episodes?.length > 0 ? (
                        anime.episodes.map((episode: any) => (
                            <a
                                href={`/anime/${slug}/${episode.slug}`}
                                key={episode.slug}
                                className="w-full flex flex-col md:flex-row md:justify-between md:items-center py-2 px-3 bg-gray-100 hover:bg-gray-200 hover:scale-102 rounded-lg transition-all duration-300"
                            >
                                <p>{episode.judul}</p>
                                <p className="bg-violet-700 text-white py-2 px-3 text-xs mt-2 md:mt-0 rounded-full w-fit">
                                    {episode.tanggal}
                                </p>
                            </a>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Belum ada episode</p>
                    )}
                </div>
            </div>

            <div className="batch mt-6">
                <h2 className="text-lg font-semibold">Batch</h2>
                <div className="flex flex-col gap-4" id="batch">
                    {anime.batch.length > 0 ? (
                        <a
                            href={`/anime/${slug}/${anime.batch.slug}`}
                            key={anime.batch.slug}
                            className="w-full flex flex-col md:flex-row md:justify-between md:items-center py-2 px-3 bg-gray-200 hover:scale-105 rounded-lg transition-all duration-300"
                        >
                            <p>{anime.batch.judul}</p>
                            <p className="bg-violet-700 text-white py-2 px-3 text-xs mt-2 md:mt-0 rounded-full w-fit">
                                {anime.batch.tanggal}
                            </p>
                        </a>
                    ) : (
                        <p className="text-sm text-gray-500">Belum ada batch untuk anime ini</p>
                    )}
                </div>
            </div>

            <div className="lengkap mt-6">
                <h2 className="text-lg font-semibold">Lengkap</h2>
                <div className="flex flex-col gap-4" id="lengkap">
                    {anime.lengkap.length > 0 ? (
                        <a
                            href={`/anime/${slug}/${anime.lengkap.slug}`}
                            key={anime.lengkap.slug}
                            className="w-full flex flex-col md:flex-row md:justify-between md:items-center py-2 px-3 bg-gray-200 hover:scale-105 rounded-lg transition-all duration-300"
                        >
                            <p>{anime.lengkap.judul}</p>
                            <p className="bg-violet-700 text-white py-2 px-3 text-xs mt-2 md:mt-0 rounded-full w-fit">
                                {anime.lengkap.tanggal}
                            </p>
                        </a>
                    ) : (
                        <p className="text-sm text-gray-500">Belum ada episode lengkap untuk anime ini</p>
                    )}
                </div>
            </div>

            <Copyright />
        </div>
    );
}
