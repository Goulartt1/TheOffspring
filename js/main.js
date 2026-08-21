const botao = document.getElementById("btn-tema");
const body = document.body;
const links = document.querySelectorAll("nav a");
const botaoMenu = document.querySelector("#btn-menu");
const navUl = document.querySelector("nav ul");

// Lightbox
const fotosGaleria = document.querySelectorAll("#galeria img");
const fotosIntegrantes = document.querySelectorAll("#integrantes .card img");
const fotosDiscografia = document.querySelectorAll("#discografia .card img");


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

function abrirLightbox(imagens, indice) {
    let atual = indice;

    body.classList.add("scroll-bloqueado");
    document.documentElement.classList.add("scroll-bloqueado");


    // Criar overlay
    const overlay = document.createElement("div");
    overlay.classList.add("lightbox");

    // Criar imagem
    const img = document.createElement("img");
    img.src = imagens[atual].src;

    // Criar botão fechar
    const btnFechar = document.createElement("button");
    btnFechar.classList.add("lightbox-fechar");
    btnFechar.textContent = "✕";

    // Criar botão anterior
    const btnAnterior = document.createElement("button");
    btnAnterior.classList.add("lightbox-anterior");
    btnAnterior.textContent = "❮";

    // Criar botão próximo
    const btnProximo = document.createElement("button");
    btnProximo.classList.add("lightbox-proximo");
    btnProximo.textContent = "❯";

    // Montar lightbox
    overlay.appendChild(img);
    overlay.appendChild(btnFechar);
    overlay.appendChild(btnAnterior);
    overlay.appendChild(btnProximo);
    document.body.appendChild(overlay);
    body.classList.add("scroll-bloqueado");

    // Atualizar visibilidade dos botões
    function atualizarBotoes() {
        btnAnterior.style.display = atual === 0 ? "none" : "block";
        btnProximo.style.display = atual === imagens.length - 1 ? "none" : "block";
    }
    atualizarBotoes();

        // Fechar lightbox
    function fecharLightbox() {
        document.body.removeChild(overlay);
        body.classList.remove("scroll-bloqueado");
        body.classList.remove("scroll-bloqueado");
        document.documentElement.classList.remove("scroll-bloqueado");

    }

    btnFechar.addEventListener("click", fecharLightbox);
    overlay.addEventListener("click", function(e) {
        if (e.target === overlay) {
            fecharLightbox();
        }
    });

    // Navegação
    btnProximo.addEventListener("click", function() {
        if (atual < imagens.length - 1) {
            atual++;
            img.src = imagens[atual].src;
            atualizarBotoes();
        }
    });

    btnAnterior.addEventListener("click", function() {
        if (atual > 0) {
            atual--;
            img.src = imagens[atual].src;
            atualizarBotoes();
        }
    });

    // Teclado
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") fecharLightbox();
        if (e.key === "ArrowRight" && atual < imagens.length - 1) {
            atual++;
            img.src = imagens[atual].src;
            atualizarBotoes();
        }
        if (e.key === "ArrowLeft" && atual > 0) {
            atual--;
            img.src = imagens[atual].src;
            atualizarBotoes();
        }
    });

}

fotosGaleria.forEach(function(foto, i) {
    foto.addEventListener("click", function() {
        abrirLightbox(fotosGaleria, i);
    });
});

fotosIntegrantes.forEach(function(foto, i) {
    foto.addEventListener("click", function() {
        abrirLightbox(fotosIntegrantes, i);
    });
});

fotosDiscografia.forEach(function(foto, i) {
    foto.addEventListener("click", function() {
        abrirLightbox(fotosDiscografia, i);
    });
});

