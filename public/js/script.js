const ongoingURL = "https://otakudesu.natee.me/api/ongoing-anime/1";
const completeURL = "https://otakudesu.natee.me/api/complete-anime/1";
const genreURL = "";

let currentGenre = "ongoing"; // Genre default
let currentPage = 1; // Halaman saat ini
let isLoading = false; // Status loading

function loadAnimeByGenre(genre, page) {
    if (isLoading) return; // Cegah pemanggilan ganda
    isLoading = true;

    // Tampilkan indikator loading
    const containerLoading = document.getElementById("container-loading");
    containerLoading.innerHTML = `<p id="loading" class="text-center text-sm">Loading...</p>`;

    // Tentukan URL berdasarkan genre
    let url = "";
    if (genre === "ongoing") {
        url = `https://otakudesu.natee.me/api/ongoing-anime/${page}`;
    } else if (genre === "complete") {
        url = `https://otakudesu.natee.me/api/complete-anime/${page}`;
    } else {
        url = `https://otakudesu.natee.me/api/genre/${genre}?page=${page}`; // URL untuk genre lain
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let content = '';
            let animeData = genre === "ongoing" || genre === "complete"
                ? (genre === "ongoing" ? data.data.ongoingAnimeData : data.data.completeAnimeData)
                : data.data.anime; // Data untuk genre lain

            for (var i = 0; i < animeData.length; i++) {
                let title = animeData[i].title;
                let slug = animeData[i].slug;
                let poster = animeData[i].poster;
                let info = genre === "ongoing"
                    ? animeData[i].current_episode || "N/A"
                    : genre === "complete"
                        ? `${animeData[i].episode_count || "N/A"} Episode`
                        : animeData[i].episode_count || "N/A"; // Fallback untuk genre lain
                let extra = genre === "ongoing"
                    ? animeData[i].release_day || "Unknown"
                    : genre === "complete"
                        ? `⭐ ${animeData[i].rating || "N/A"}`
                        : `⭐ ${animeData[i].rating || "N/A"}`; // Fallback untuk genre lain

                content += `
                <a href="detailanime/index.html?anime=${slug}" class="w-full hover:scale-105 transition-all duration-300">
                    <div class="relative overflow-hidden rounded">
                        <img src="${poster}" alt="thumbnail" class="h-full w-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent from-0% to-50%"></div>
                        <p class="absolute top-0 bg-violet-700 text-white text-xs p-1 rounded-br-lg">${info}</p>
                        <p class="absolute top-0 right-0 bg-violet-700 text-white text-xs p-2 rounded-bl-lg">${extra}</p>
                        <p class="absolute bottom-0 line-clamp-2 text-sm text-white px-2 pb-4">${title}</p>
                    </div>
                </a>
                `;
            }
            document.getElementById('container').innerHTML += content; // Tambahkan data baru
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            isLoading = false; // Reset status loading
            document.getElementById("loading").remove(); // Hapus indikator loading
        });
}
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Jika pengguna mencapai bagian bawah halaman
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading && currentPage < 4) {
        currentPage++; // Tambahkan halaman
        loadAnimeByGenre(currentGenre, currentPage); // Muat data halaman berikutnya
    }
});
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://otakudesu.natee.me/api/genre")
        .then((res) => { return res.json(); })
        .then((data) => {
            console.log(data);
            let genre = '';  // Pindahkan deklarasi container di luar loop
            for (var i = 0; i < data.data.length; i++) {
                let name = data.data[i].name;
                let slug = data.data[i].slug
                genre += ` <option value="${slug}">${name}</option> `;
            }
            document.getElementById('genre').innerHTML += genre; // Menambahkan semua card
        })
    loadAnimeByGenre(currentGenre, currentPage); // Muat data halaman pertama

    // Event listener untuk pencarian
    document.getElementById("search").addEventListener("keypress", (event) => {
        let value = document.getElementById("search").value;
        if (event.key === "Enter") {
            window.location.href = `search/index.html?anime=${value}`;
        }
    });
});

document.getElementById("genre").addEventListener("change", (event) => {
    currentGenre = document.getElementById("genre").value; // Update genre saat ini
    currentPage = 1; // Reset halaman ke 1
    document.getElementById("container").innerHTML = ""; // Bersihkan kontainer

    // Muat data berdasarkan genre yang dipilih
    loadAnimeByGenre(currentGenre, currentPage);
});
