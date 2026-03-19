document.getElementById("continue-button").addEventListener("click", () => {
    window.location.href = "/characters";
})

const loadButton = document.getElementById("load-button");
const backButton = document.getElementById("back-button");
const mainMenu = document.getElementById("main-menu");
const loadMenu = document.getElementById("load-menu");
const characterList = document.getElementById("character-list");

loadButton.addEventListener("click", async () => {
    mainMenu.classList.add("hidden");
    loadMenu.classList.remove("hidden");

    characterList.innerHTML = "<p style='text-align: center; color: #313131;'>Buscando arquivos confidenciais...</p>";

    try {
        const response = await fetch('/api/characters');
        const characters = await response.json();

        characterList.innerHTML = "";

        if (characters.length === 0) {
            characterList.innerHTML = "<p style='text-align: center; color: #313131;'>Nenhum personagem encontrado no banco de dados.</p>";
            return;
        }

        characters.forEach(char => {
            const li = document.createElement("li");
            li.className = "character-item";

            const span = document.createElement("span");
            span.className = "character-name";
            span.textContent = char.character_name;

            const btn = document.createElement("button");
            btn.className = "select-btn";
            btn.textContent = "Carregar";
            
            btn.onclick = () => {
                localStorage.setItem("characterToLoad", char.character_name);
                window.location.href = "/characters";
            };

            li.appendChild(span);
            li.appendChild(btn);
            characterList.appendChild(li);
        });

    } catch (error) {
        characterList.innerHTML = "<p style='text-align: center; color: red;'>Erro ao buscar os dados.</p>";
        console.error('Erro:', error);
    }
});

backButton.addEventListener("click", () => {
    loadMenu.classList.add("hidden");
    mainMenu.classList.remove("hidden");
});
