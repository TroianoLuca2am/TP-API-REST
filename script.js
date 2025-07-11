const API_URL = "https://rickandmortyapi.com/api/character";

const getAllBtn = document.getElementById("getAllBtn");
const filterForm = document.getElementById("filterForm");
const results = document.getElementById("results");
const errorMsg = document.getElementById("errorMsg");

getAllBtn.addEventListener("click", async () => {
  clearResults();
  await fetchCharacters(API_URL);
});

filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearResults();

  const name = document.getElementById("name").value.trim();
  const status = document.getElementById("status").value.trim();
  const species = document.getElementById("species").value.trim();
  const type = document.getElementById("type").value.trim();
  const gender = document.getElementById("gender").value.trim();

  const params = new URLSearchParams({
    ...(name && { name }),
    ...(status && { status }),
    ...(species && { species }),
    ...(type && { type }),
    ...(gender && { gender }),
  });

  const url = `${API_URL}/?${params.toString()}`;
  await fetchCharacters(url);
});

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se encontraron resultados o error de red.");

    const data = await response.json();
    const characters = data.results;

    characters.forEach((char) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${char.image}" alt="${char.name}" />
        <h3>${char.name}</h3>
        <p><strong>Status:</strong> ${char.status}</p>
        <p><strong>Species:</strong> ${char.species}</p>
        <p><strong>Gender:</strong> ${char.gender}</p>
      `;
      results.appendChild(card);
    });
  } catch (err) {
    errorMsg.textContent = err.message;
  }
}

function clearResults() {
  results.innerHTML = "";
  errorMsg.textContent = "";
}
