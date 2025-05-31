const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Permite buscar también con la tecla Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarPeliculasDestacadas();
});

function mostrarPeliculasDestacadas() {
  // Por ejemplo, un array fijo con algunas películas para mostrar al cargar
  const peliculasDestacadas = [
    {
      Title: "Inception",
      Year: "2010",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTM0MjUzNjkwMl5BMl5BanBnXkFtZTcwNjY0OTk1Mw@@._V1_.jpg"
    },
    {
      Title: "The Matrix",
      Year: "1999",
      Poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
    },
    {
      Title: "Interstellar",
      Year: "2014",
      Poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._SL1500_.jpg"
    }
  ];

  const featuredDiv = document.getElementById("featured");
  featuredDiv.innerHTML = "";

  peliculasDestacadas.forEach(pelicula => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="${pelicula.Poster}" alt="${pelicula.Title}">
      <div class="movie-title">${pelicula.Title} (${pelicula.Year})</div>
    `;
    featuredDiv.appendChild(card);
  });
}


searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    buscarPeliculas(query);
  } else {
    resultsDiv.innerHTML = "Por favor, ingresa un término de búsqueda.";
  }
});

async function buscarPeliculas(query) {
  resultsDiv.innerHTML = "Buscando...";
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=db6904d8&s=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.Response === "True") {
      mostrarResultados(data.Search);
    } else {
      resultsDiv.innerHTML = "No se encontraron resultados.";
    }
  } catch (error) {
    resultsDiv.innerHTML = "Error al buscar películas.";
    console.error(error);
  }
}

function mostrarResultados(peliculas) {
  resultsDiv.innerHTML = "";
  peliculas.forEach(pelicula => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="${pelicula.Poster && pelicula.Poster !== "N/A" ? pelicula.Poster : "https://via.placeholder.com/150?text=Sin+Imagen"}" alt="${pelicula.Title}">
      <div class="movie-title">${pelicula.Title} (${pelicula.Year})</div>
    `;
    resultsDiv.appendChild(card);
  });
}
