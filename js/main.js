const botao = document.getElementById("btn-tema");
const body = document.body;
const links = document.querySelectorAll("nav a");

botao.addEventListener("click", function() {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        botao.textContent = "☀️";
    } else {
        botao.textContent = "🌙";
    }
});

links.forEach(function(link) {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const destino = document.querySelector(link.getAttribute("href"));
        destino.scrollIntoView({ behavior: "smooth" });
        
    });
});