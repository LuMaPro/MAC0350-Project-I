const loadButton = document.getElementById("load-button");
const backButton = document.getElementById("back-button");
const mainMenu = document.getElementById("main-menu");
const loadMenu = document.getElementById("load-menu");

loadButton.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    loadMenu.classList.remove("hidden");
});

backButton.addEventListener("click", () => {
    loadMenu.classList.add("hidden");
    mainMenu.classList.remove("hidden");
});

document.getElementById("continue-button").addEventListener("click", () => {
    window.location.href = "/characters";
});

function selecionarPersonagem(nome) {
    localStorage.setItem("characterToLoad", nome);
    window.location.href = "/characters";
}
