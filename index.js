const movies = [
    { id: 1, title: "Dune: Part Two", year: 2024, rating: 8.5, runtime: "2h 46m", genres: ["Sci-Fi", "Action", "Drama"], description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.", poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", color: "sand", popularity: 12 },
    { id: 2, title: "The Dark Knight", year: 2008, rating: 9.0, runtime: "2h 32m", genres: ["Action", "Drama", "Thriller"], description: "Batman faces his greatest challenge yet as the Joker brings chaos to Gotham and pushes the city to its limits.", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", color: "night", popularity: 11 },
    { id: 3, title: "Get Out", year: 2017, rating: 7.8, runtime: "1h 44m", genres: ["Horror", "Thriller"], description: "A young photographer's weekend visit to meet his girlfriend's family takes a deeply unsettling turn.", poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg", color: "red", popularity: 10 },
    { id: 4, title: "Everything Everywhere All at Once", year: 2022, rating: 7.8, runtime: "2h 19m", genres: ["Sci-Fi", "Action", "Comedy"], description: "An exhausted laundromat owner discovers she must connect with versions of herself across the multiverse.", poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", color: "violet", popularity: 9 },
    { id: 5, title: "The Grand Budapest Hotel", year: 2014, rating: 8.1, runtime: "1h 39m", genres: ["Comedy", "Drama"], description: "A legendary concierge and his trusted protégé get swept up in a caper involving a priceless painting.", poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", color: "pink", popularity: 8 },
    { id: 6, title: "Interstellar", year: 2014, rating: 8.7, runtime: "2h 49m", genres: ["Sci-Fi", "Drama", "Adventure"], description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", color: "space", popularity: 7 },
    { id: 7, title: "A Quiet Place", year: 2018, rating: 7.5, runtime: "1h 30m", genres: ["Horror", "Drama", "Sci-Fi"], description: "A family must live in silence to hide from creatures that hunt by sound in a changed world.", poster: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg", color: "forest", popularity: 6 },
    { id: 8, title: "Spider-Man: Into the Spider-Verse", year: 2018, rating: 8.4, runtime: "1h 57m", genres: ["Animation", "Action", "Sci-Fi"], description: "Brooklyn teenager Miles Morales becomes Spider-Man and meets heroes from across the many dimensions.", poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", color: "blue", popularity: 5 },
    { id: 9, title: "La La Land", year: 2016, rating: 8.0, runtime: "2h 8m", genres: ["Romance", "Drama", "Comedy"], description: "An aspiring actress and a jazz musician fall in love while chasing their dreams in Los Angeles.", poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", color: "sunset", popularity: 4 },
    { id: 10, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, runtime: "2h", genres: ["Action", "Sci-Fi", "Adventure"], description: "In a post-apocalyptic wasteland, Max joins Furiosa on a high-octane escape across the desert.", poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg", color: "fire", popularity: 3 },
    { id: 11, title: "Coco", year: 2017, rating: 8.4, runtime: "1h 45m", genres: ["Animation", "Comedy", "Drama"], description: "A music-loving boy journeys to the Land of the Dead to uncover his family's history.", poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", color: "orange", popularity: 2 },
    { id: 12, title: "Knives Out", year: 2019, rating: 7.9, runtime: "2h 10m", genres: ["Thriller", "Comedy", "Drama"], description: "A sharp detective investigates the death of a celebrated mystery novelist and his eccentric family.", poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg", color: "gold", popularity: 1 }
];

const movieGrid = document.querySelector("#movie-grid");
const genreList = document.querySelector("#genre-list");
const searchInput = document.querySelector("#movie-search");
const sortSelect = document.querySelector("#sort-movies");
const resultsTitle = document.querySelector("#results-title");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const watchlistToggle = document.querySelector("#watchlist-toggle");
const listCount = document.querySelector("#list-count");
const movieDialog = document.querySelector("#movie-dialog");
const dialogListButton = document.querySelector("#dialog-list-button");
const hero = document.querySelector("#discover");
const heroBackdrop = document.querySelector("#hero-backdrop");
const heroTitle = document.querySelector("#feature-title");
const heroMeta = document.querySelector("#feature-meta");
const heroDots = document.querySelector("#hero-dots");
const featuredMovies = [movies[0], movies[1], movies[5], movies[2]];

let selectedGenre = "All";
let showingWatchlist = false;
let selectedMovieId = null;
let activeFeaturedIndex = 0;
let carouselTimer;
let watchlist = loadWatchlist();

function loadWatchlist() {
    try {
        const savedList = JSON.parse(localStorage.getItem("cineva-watchlist") || "[]");
        return Array.isArray(savedList) ? savedList.filter((id) => Number.isInteger(id)) : [];
    } catch (error) {
        console.error("Could not load the saved watchlist.", error);
        return [];
    }
}

function saveWatchlist() {
    try {
        localStorage.setItem("cineva-watchlist", JSON.stringify(watchlist));
    } catch (error) {
        console.error("Could not save the watchlist.", error);
    }
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

function getVisibleMovies() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const visibleMovies = movies.filter((movie) => {
        const matchesGenre = selectedGenre === "All" || movie.genres.includes(selectedGenre);
        const matchesSearch = !searchTerm
            || movie.title.toLowerCase().includes(searchTerm)
            || movie.genres.some((genre) => genre.toLowerCase().includes(searchTerm));
        return matchesGenre && matchesSearch && (!showingWatchlist || watchlist.includes(movie.id));
    });

    switch (sortSelect.value) {
        case "rating": return visibleMovies.sort((first, second) => second.rating - first.rating);
        case "newest": return visibleMovies.sort((first, second) => second.year - first.year);
        case "title": return visibleMovies.sort((first, second) => first.title.localeCompare(second.title));
        default: return visibleMovies.sort((first, second) => second.popularity - first.popularity);
    }
}

function createMovieCard(movie) {
    const isSaved = watchlist.includes(movie.id);
    const card = document.createElement("article");
    card.className = "movie-card";
    card.innerHTML = `
        <button class="poster-button" type="button" data-details="${movie.id}" aria-label="View details for ${escapeHtml(movie.title)}">
            <div class="movie-poster poster-${movie.color}">
                <img src="${escapeHtml(movie.poster)}" alt="${escapeHtml(movie.title)} poster" loading="lazy">
                <span class="poster-rating">★ ${movie.rating.toFixed(1)}</span>
                <span class="poster-open" aria-hidden="true">↗</span>
            </div>
        </button>
        <div class="movie-info">
            <div class="movie-title-row">
                <h4>${escapeHtml(movie.title)}</h4>
                <button class="save-button${isSaved ? " saved" : ""}" type="button" data-save="${movie.id}" aria-label="${isSaved ? "Remove from" : "Add to"} watchlist" aria-pressed="${isSaved}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z"></path></svg>
                </button>
            </div>
            <p class="movie-meta">${movie.year}<span>•</span>${escapeHtml(movie.genres[0])}<span>•</span>${escapeHtml(movie.runtime)}</p>
        </div>`;
    card.querySelector("img").addEventListener("error", (event) => {
        event.currentTarget.classList.add("image-unavailable");
    });
    return card;
}

function renderMovies() {
    const visibleMovies = getVisibleMovies();
    movieGrid.replaceChildren(...visibleMovies.map(createMovieCard));
    movieGrid.hidden = visibleMovies.length === 0;
    emptyState.hidden = visibleMovies.length > 0;
    resultsCount.textContent = `${visibleMovies.length} ${visibleMovies.length === 1 ? "movie" : "movies"}`;
    resultsTitle.textContent = showingWatchlist
        ? "Your watchlist"
        : selectedGenre === "All" ? "Popular right now" : `${selectedGenre} movies`;
    watchlistToggle.classList.toggle("active", showingWatchlist);
    listCount.textContent = watchlist.length;
}

function toggleWatchlist(movieId) {
    watchlist = watchlist.includes(movieId)
        ? watchlist.filter((id) => id !== movieId)
        : [...watchlist, movieId];
    saveWatchlist();
    renderMovies();
    if (selectedMovieId === movieId) updateDialogListButton();
}

function openMovieDetails(movieId) {
    const movie = movies.find((item) => item.id === movieId);
    if (!movie) return;
    selectedMovieId = movieId;
    const poster = document.querySelector("#dialog-poster");
    poster.className = `dialog-poster poster-${movie.color}`;
    poster.innerHTML = `<img src="${escapeHtml(movie.poster)}" alt="${escapeHtml(movie.title)} poster">`;
    poster.querySelector("img").addEventListener("error", (event) => {
        event.currentTarget.classList.add("image-unavailable");
    });
    document.querySelector("#dialog-title").textContent = movie.title;
    document.querySelector("#dialog-genres").textContent = movie.genres.join("  ·  ");
    document.querySelector("#dialog-meta").textContent = `${movie.year}  ·  ${movie.runtime}  ·  ★ ${movie.rating.toFixed(1)}`;
    document.querySelector("#dialog-description").textContent = movie.description;
    updateDialogListButton();
    movieDialog.showModal();
}

function updateDialogListButton() {
    dialogListButton.textContent = watchlist.includes(selectedMovieId) ? "✓  Added to your list" : "+  Add to my list";
}

function showFeaturedMovie(index) {
    activeFeaturedIndex = (index + featuredMovies.length) % featuredMovies.length;
    const movie = featuredMovies[activeFeaturedIndex];
    heroTitle.textContent = movie.title;
    heroMeta.innerHTML = `${movie.year} <span>•</span> ${escapeHtml(movie.genres[0])} <span>•</span> ★ ${movie.rating.toFixed(1)}`;
    heroBackdrop.style.setProperty("--featured-image", `url("${movie.poster.replace("/w500/", "/original/")}")`);
    heroBackdrop.classList.remove("changing");
    void heroBackdrop.offsetWidth;
    heroBackdrop.classList.add("changing");
    heroDots.querySelectorAll("button").forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeFeaturedIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
    });
}

function startCarousel() {
    window.clearInterval(carouselTimer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        carouselTimer = window.setInterval(() => {
            showFeaturedMovie(activeFeaturedIndex + 1);
        }, 5000);
    }
}

featuredMovies.forEach((movie, index) => {
    const dot = document.createElement("button");
    dot.className = "hero-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${movie.title}`);
    dot.setAttribute("aria-pressed", String(index === activeFeaturedIndex));
    dot.addEventListener("click", () => {
        showFeaturedMovie(index);
        startCarousel();
    });
    heroDots.append(dot);
});

document.querySelector("#hero-previous").addEventListener("click", () => {
    showFeaturedMovie(activeFeaturedIndex - 1);
    startCarousel();
});
document.querySelector("#hero-next").addEventListener("click", () => {
    showFeaturedMovie(activeFeaturedIndex + 1);
    startCarousel();
});
hero.addEventListener("mouseenter", () => window.clearInterval(carouselTimer));
hero.addEventListener("mouseleave", startCarousel);
hero.addEventListener("focusin", () => window.clearInterval(carouselTimer));
hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) startCarousel();
});

genreList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-genre]");
    if (!button) return;
    selectedGenre = button.dataset.genre;
    showingWatchlist = false;
    genreList.querySelectorAll(".genre-chip").forEach((chip) => {
        const isActive = chip === button;
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", String(isActive));
    });
    renderMovies();
});

searchInput.addEventListener("input", renderMovies);
sortSelect.addEventListener("change", renderMovies);
watchlistToggle.addEventListener("click", () => {
    showingWatchlist = !showingWatchlist;
    selectedGenre = "All";
    genreList.querySelectorAll(".genre-chip").forEach((chip) => {
        const isActive = chip.dataset.genre === "All";
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", String(isActive));
    });
    renderMovies();
    document.querySelector("#movies").scrollIntoView({ behavior: "smooth" });
});

movieGrid.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save]");
    if (saveButton) {
        toggleWatchlist(Number(saveButton.dataset.save));
        return;
    }
    const detailsButton = event.target.closest("[data-details]");
    if (detailsButton) openMovieDetails(Number(detailsButton.dataset.details));
});

document.querySelector("#dialog-close").addEventListener("click", () => movieDialog.close());
movieDialog.addEventListener("click", (event) => {
    if (event.target === movieDialog) movieDialog.close();
});
dialogListButton.addEventListener("click", () => {
    if (selectedMovieId !== null) toggleWatchlist(selectedMovieId);
});

document.querySelector("#clear-filters").addEventListener("click", () => {
    selectedGenre = "All";
    showingWatchlist = false;
    searchInput.value = "";
    genreList.querySelectorAll(".genre-chip").forEach((chip) => {
        const isActive = chip.dataset.genre === "All";
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", String(isActive));
    });
    renderMovies();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== searchInput && !movieDialog.open) {
        event.preventDefault();
        searchInput.focus();
    }
});

renderMovies();
showFeaturedMovie(0);
startCarousel();