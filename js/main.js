const botao = document.getElementById("btn-tema");
const body = document.body;
const links = document.querySelectorAll("nav a");
const botaoMenu = document.querySelector("#btn-menu");
const navUl = document.querySelector("nav ul");

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
        navUl.classList.remove("menu-aberto");
        body.classList.remove("scroll-bloqueado");
        botaoMenu.classList.remove("ativo");
        
    });
});

botaoMenu.addEventListener("click", function(a){
    botaoMenu.classList.toggle("ativo");
    navUl.classList.toggle("menu-aberto");
    body.classList.toggle("scroll-bloqueado");


})