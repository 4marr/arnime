const apiURL = "https://asepharyana.cloud/api/komik";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener("keypress", (event) => {
        let value = document.getElementById("search").value;
        if (event.key === "Enter") {
            window.location.href = `search/index.html?comic=${value}`;
        }
    });
});

fetch(`${apiURL}/manga?page=1`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        let manga = '';  // Pindahkan deklarasi `container` di luar loop
        for (var i = 0; i < data.data.length; i++) {
            let title = data.data[i].title;
            let image = data.data[i].image;
            let chapter = data.data[i].chapter;
            let date = data.data[i].date;
            let komik_id = data.data[i].komik_id;

            manga += `
            <a href="detailcomic/index.html?comic=${komik_id}" class="w-full hover:scale-105 transition-all duration-300">
                <div class="relative w-28 overflow-hidden rounded">
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-br-lg">${chapter}</p>
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-tl-lg bottom-0 right-0">${date}</p>
                    <img src="${image}" alt="thumbnail" class="h-40 w-full object-cover"/>
                </div>
                <p class="line-clamp-2 text-sm">${title}</p>
            </a>
            `;
        }
        document.getElementById('manga').innerHTML = manga; // Menambahkan semua card
    });

fetch(`${apiURL}/manhwa?page=1`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        let manhwa = '';  // Pindahkan deklarasi `container` di luar loop
        for (var i = 0; i < data.data.length; i++) {
            let title = data.data[i].title;
            let image = data.data[i].image;
            let chapter = data.data[i].chapter;
            let date = data.data[i].date;
            let komik_id = data.data[i].komik_id;

            manhwa += `
            <a href="detailcomic/index.html?comic=${komik_id}" class="w-full hover:scale-105 transition-all duration-300">
                <div class="relative w-28 overflow-hidden rounded">
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-br-lg">${chapter}</p>
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-tl-lg bottom-0 right-0">${date}</p>
                    <img src="${image}" alt="thumbnail" class="h-40 w-full object-cover"/>
                </div>
                <p class="line-clamp-2 text-sm">${title}</p>
            </a>
            `;
        }
        document.getElementById('manhwa').innerHTML = manhwa; // Menambahkan semua card
    });

fetch(`${apiURL}/manhua?page=1`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        let manhua = '';  // Pindahkan deklarasi `container` di luar loop
        for (var i = 0; i < data.data.length; i++) {
            let title = data.data[i].title;
            let image = data.data[i].image;
            let chapter = data.data[i].chapter;
            let date = data.data[i].date;
            let komik_id = data.data[i].komik_id;

            manhua += `
            <a href="detailcomic/index.html?comic=${komik_id}" class="w-full hover:scale-105 transition-all duration-300">
                <div class="relative w-28 overflow-hidden rounded">
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-br-lg">${chapter}</p>
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-tl-lg bottom-0 right-0">${date}</p>
                    <img src="${image}" alt="thumbnail" class="h-40 w-full object-cover"/>
                </div>
                <p class="line-clamp-2 text-sm">${title}</p>
            </a>
            `;
        }
        document.getElementById('manhua').innerHTML = manhua; // Menambahkan semua card
    });
