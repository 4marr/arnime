'use client';

import { useState, useEffect } from 'react';
import DisqusComments from '@/components/DisqusComments';
import Copyright from '@/components/Copyright';
import Header from '@/components/Header'

export default function ClientEpisode({ anime }: { anime: any }) {
    const [iframeSrc, setIframeSrc] = useState(anime.iframe);
    const [iframeHtml, setIframeHtml] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [nonce, setNonce] = useState<string | null>(null);

    useEffect(() => {
        const fetchNonce = async () => {
            const nonceRes = await fetch('https://backend.ryzendesu.vip/nonce');
            let nonceText = await nonceRes.text();
            nonceText = nonceText.replace(/^"|"$/g, '');
            setNonce(nonceText);
        };

        fetchNonce();
    }, []);

    const handleResolutionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const content = e.target.value;
        setLoading(true);

        if (nonce) {
            try {
                const iframeRes = await fetch(`https://backend.ryzendesu.vip/getIframe?content=${content}&nonce=${nonce}`);

                if (!iframeRes.ok) {
                    throw new Error('Failed to fetch iframe');
                }

                const iframeHtmlResponse = (await iframeRes.text()).replace(/\\/g, '');
                const iframeUrlMatch = iframeHtmlResponse.match(/<iframe[^>]+src=["']([^"']+)["']/);
                const iframeUrl = iframeUrlMatch ? iframeUrlMatch[1] : null;

                if (iframeUrl) {
                    setIframeSrc(iframeUrl);
                    setIframeHtml(null);
                } else {
                    setIframeHtml(iframeHtmlResponse);
                    setIframeSrc('');
                }
            } catch (err) {
                console.error('Gagal memuat iframe:', err);
            } finally {
                setLoading(false);
            }
        } else {
            console.error('Nonce belum tersedia!');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center py-5 px-5 lg:px-28">
            <Header />
            <h2 className="text-lg font-semibold mb-4">{anime.judul}</h2>

            <div className="w-full h-0 pb-[56.25%] relative mb-4">
                {loading && (
                    <div className="py-8 flex justify-center items-center text-center text-sm text-gray-400">
                        <img
                            src="/loading.gif"
                            alt="Loading..."
                            className="mx-auto w-[25%] h-[25%]"
                        />
                    </div>
                )}
                {iframeHtml ? (
                    <div
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        dangerouslySetInnerHTML={{ __html: iframeHtml }}
                    />
                ) : (
                    <iframe
                        src={iframeSrc}
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                    />
                )}
            </div>

            <select
                name="resolution"
                id="resolution"
                className="outline-0 border p-2 rounded-md mb-2"
                onChange={handleResolutionChange}
                defaultValue=""
            >
                <option disabled value="">
                    Pilih Resolusi
                </option>

                {Object.entries(anime.mirror as Record<string, { nama: string; content: string }[]>).map(
                    ([res, mirrors]) =>
                        mirrors.map((mirror, i) => (
                            <option key={`${res}-${i}`} value={mirror.content}>
                                {res.toUpperCase()} - {mirror.nama.trim()}
                            </option>
                        ))
                )}
            </select>

            <p className='text-xs flex justify-end'>Rekomendasi: odstream</p>
            <p className='mt-4 font-bold text-lg'>Download</p>
            {anime.download &&
                Object.entries(anime.download as Record<string, { nama: string; href: string }[]>).map(
                    ([key, downloads]) => {
                        const match = key.match(/^d(\d+)(p)(\w+)$/);
                        const label = match ? `${match[1]}${match[2].toUpperCase()} ${match[3].toUpperCase()}` : key;

                        return (
                            <div key={key}>
                                <h3 className="font-semibold text-sm mb-2">{label}</h3>
                                {downloads.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic">Belum tersedia</p>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {downloads.map((download, i) => (
                                            <a
                                                key={`${key}-${i}`}
                                                href={download.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex justify-between md:items-center py-2 px-3 bg-gray-100 hover:bg-gray-200 hover:scale-102 rounded-lg transition-all duration-200"
                                            >
                                                <span>{download.nama.trim()}</span>
                                                <span className="text-xs text-gray-600 mt-1 md:mt-0">{label}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }
                )}

            <div className='mt-8'>
                <DisqusComments
                    identifier={anime.slug}
                    title="Episode Page"
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                />
            </div>

            <Copyright />
        </div>
    );
}
