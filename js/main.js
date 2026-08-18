const botao = document.getElementById("btn-tema");
const body = document.body;

botao.addEventListener("click", function() {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        botao.textContent = "☀️";
    } else {
        botao.textContent = "🌙";
    }
});