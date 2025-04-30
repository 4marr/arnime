'use client';

import { useEffect } from 'react';

export default function DisqusComments({ identifier, title, url }: { identifier: string; title: string; url: string }) {
    useEffect(() => {
        const disqus_config = function (this: any){
            this.page.url = url; // URL halaman
            this.page.identifier = identifier; // ID unik halaman
            this.page.title = title; // Judul halaman
        };

        // Muat skrip Disqus jika belum ada
        if (!document.getElementById('disqus-script')) {
            const script = document.createElement('script');
            script.src = 'https://ammaricano.disqus.com/embed.js'; // Ganti "example-shortname" dengan shortname Anda
            script.id = 'disqus-script';
            script.async = true;
            script.setAttribute('data-timestamp', String(new Date()));
            document.body.appendChild(script);
        } else {
            // Jika skrip sudah ada, panggil ulang Disqus
            (window as any).DISQUS?.reset({
                reload: true,
                config: disqus_config,
            });
        }
    }, [identifier, title, url]);

    return <div id="disqus_thread"></div>;
}
