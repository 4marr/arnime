export default async function JadwalPage() {
    const res = await fetch('https://backend.ryzendesu.vip/jadwal');
    const jadwal = await res.json();

    return (
        <div className="flex flex-col gap-4 p-5">
            <h2 className="text-lg font-semibold text-center">Jadwal Rilis Anime</h2>
            <div className="flex flex-col gap-6">
                {jadwal.map((hari: any) => (
                    <div key={hari.hari} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-2">
                        <div className="bg-violet-100 rounded-lg p-4 mb-4">
                            <h2 className="text-center text-violet-700 font-semibold">{hari.hari}</h2>
                        </div>
                        {hari.anime.map((anime: any) => (
                            <a href={`/anime/${anime.slug}`} key={anime.slug} className="hover:text-violet-700 hover:scale-105 transition-all duration-300 pb-2">{anime.judul}</a>
                        ))}
                    </div>
                ))}
        </div>
        </div >
    );
}
