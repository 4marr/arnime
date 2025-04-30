import { notFound } from 'next/navigation';
import ClientEpisode from './ClientEpisode';

export default async function EpisodePage({ params }: { params: any}) {
    const { episode } = await params;
    const res = await fetch(`https://backend.ryzendesu.vip/episode/${episode}`);
    if (!res.ok) return notFound();
    const anime = await res.json();

    return <ClientEpisode anime={anime} />;
}
