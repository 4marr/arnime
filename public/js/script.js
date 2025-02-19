const apiURL = "https://asepharyana.cloud/api/anime";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener("keypress", (event) => {
        let value = document.getElementById("search").value;
        if (event.key === "Enter") {
            window.location.href = `search/index.html?anime=${value}`;
        }
    });
});

fetch(`${apiURL}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        let complete = '';  // Pindahkan deklarasi `container` di luar loop
        for (var i = 0; i < data.data.complete_anime.length; i++) {
            let title = data.data.complete_anime[i].title;
            let slug = data.data.complete_anime[i].slug;
            let poster = data.data.complete_anime[i].poster;
            let episode_count = data.data.complete_anime[i].episode_count;

            complete += `
            <a href="detailanime/index.html?anime=${slug}" class="w-full hover:scale-105 transition-all duration-300">
                <div class="relative w-28 overflow-hidden rounded">
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-br-lg">${episode_count}</p>
                    <img src="${poster}" alt="thumbnail" class="h-40 w-full object-cover"/>
                </div>
                <p class="line-clamp-2 text-sm">${title}</p>
            </a>
            `;
        }
        document.getElementById('complete').innerHTML = complete; // Menambahkan semua card
        let ongoing = '';  // Pindahkan deklarasi `container` di luar loop
        for (var i = 0; i < data.data.ongoing_anime.length; i++) {
            let title = data.data.ongoing_anime[i].title;
            let slug = data.data.ongoing_anime[i].slug;
            let poster = data.data.ongoing_anime[i].poster;
            let current_episode = data.data.ongoing_anime[i].current_episode;

            ongoing += `
            <a href="detailanime/index.html?anime=${slug}" class="w-full hover:scale-105 transition-all duration-300">
                <div class="relative w-28 overflow-hidden rounded">
                    <p class="absolute bg-violet-700 text-white text-xs p-1 rounded-br-lg">${current_episode}</p>
                    <img src="${poster}" alt="thumbnail" class="h-40 w-full object-cover"/>
                </div>
                <p class="line-clamp-2 text-sm">${title}</p>
            </a>
            `;
        }
        document.getElementById('ongoing').innerHTML = ongoing; // Menambahkan semua card
    });
