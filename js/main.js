const botao = document.getElementById("btn-tema");
const body = document.body;
const links = document.querySelectorAll("nav a");
const botaoMenu = document.querySelector("#btn-menu");
const navUl = document.querySelector("nav ul");

// Lightbox
const fotosGaleria = document.querySelectorAll("#galeria img");
const fotosIntegrantes = document.querySelectorAll("#integrantes .card img");
const fotosDiscografia = document.querySelectorAll("#discografia .card img");

// Countdown - Próximo Show
const showInfo = document.getElementById("show-info");
const dataShow = new Date("2026-09-18T19:30:00");

function atualizarCountdown() {
    const agora = new Date();
    const diferenca = dataShow - agora;

    if (diferenca <= 0) {
        showInfo.textContent = "🎸 The Offspring ao vivo AGORA @ The Stone Pony — Asbury Park!";
        clearInterval(timer);
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    showInfo.textContent = `🎸 The Offspring @ The Stone Pony — Asbury Park | ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

const timer = setInterval(atualizarCountdown, 1000);
atualizarCountdown();

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

// Modal de detalhes
const dadosMembros = {
    dexter: {
        nome: "Dexter Holland",
        nomeReal: "Bryan Keith Holland",
        nascimento: "29 de dezembro de 1965",
        local: "Garden Grove, Califórnia, EUA",
        funcao: "Vocalista e Guitarrista",
        bio: "Fundador e líder do The Offspring desde 1984. Além de músico, Dexter é doutor em Biologia Molecular pela Universidade do Sul da Califórnia, piloto de aviões e empresário — foi dono de uma marca de molho de pimenta chamada Gringo Bandito."
    },
    noodles: {
        nome: "Noodles",
        nomeReal: "Kevin John Wasserman",
        nascimento: "4 de fevereiro de 1963",
        local: "Los Angeles, Califórnia, EUA",
        funcao: "Guitarrista",
        bio: "Membro original desde 1984, Noodles é conhecido pelo humor irreverente e pelos solos de guitarra marcantes. Antes de se juntar à banda era zelador de uma escola e era o único membro maior de idade, o que permitia comprar cerveja para os ensaios."
    },
    greg: {
        nome: "Greg K.",
        nomeReal: "Gregory David Kriesel",
        nascimento: "20 de janeiro de 1965",
        local: "Glendale, Califórnia, EUA",
        funcao: "Baixista",
        bio: "Cofundador da banda ao lado de Dexter Holland em 1984. Greg foi o baixista por 34 anos até sua saída em 2018. Sua linha de baixo em Smash e Americana ajudou a definir o som característico do grupo."
    },
    pete: {
        nome: "Pete Parada",
        nomeReal: "Peter Gregory Parada",
        nascimento: "12 de maio de 1972",
        local: "Los Angeles, Califórnia, EUA",
        funcao: "Baterista",
        bio: "Pete se juntou ao The Offspring em 2007 como baterista oficial. Anteriormente tocou em bandas como Face to Face e Saves the Day. Conhecido pela precisão técnica e energia ao vivo."
    }
};

const dadosAlbums = {
    theoffspring: {
        nome: "The Offspring",
        ano: "1989",
        gravadora: "Nemesis Records",
        produtora: "Thom Wilson",
        faixas: "10",
        vendas: "Dados não disponíveis",
        destaque: "Tehran, I'll Be Waiting, Blackball",
        descricao: "Álbum de estreia da banda, com sonoridade mais próxima do hardcore punk. Lançado de forma independente com tiragem limitada."
    },
    ignition: {
        nome: "Ignition",
        ano: "1992",
        gravadora: "Epitaph Records",
        produtora: "Thom Wilson",
        faixas: "12",
        vendas: "Mais de 200 mil cópias",
        destaque: "Kick Him When He's Down, Take It Like a Man",
        descricao: "Segundo álbum que começou a chamar atenção da cena punk californiana. Marcou a transição para um som mais melódico."
    },
    smash: {
        nome: "Smash",
        ano: "1994",
        gravadora: "Epitaph Records",
        produtora: "Thom Wilson",
        faixas: "14",
        vendas: "Mais de 11 milhões de cópias",
        destaque: "Come Out and Play, Self Esteem, Gotta Get Away",
        descricao: "O álbum que transformou a banda em fenômeno global. É o disco independente mais vendido da história, catapultando o punk rock de volta ao mainstream nos anos 90."
    },
    ixnay: {
        nome: "Ixnay on the Hombre",
        ano: "1997",
        gravadora: "Columbia Records",
        produtora: "Dave Jerden",
        faixas: "14",
        vendas: "Mais de 3 milhões de cópias",
        destaque: "Gone Away, All I Want, The Meaning of Life",
        descricao: "Primeiro álbum lançado por uma grande gravadora. Trouxe um som mais pesado e temas mais maduros, incluindo a balada Gone Away."
    },
    americana: {
        nome: "Americana",
        ano: "1998",
        gravadora: "Columbia Records",
        produtora: "Dave Jerden",
        faixas: "15",
        vendas: "Mais de 10 milhões de cópias",
        destaque: "Pretty Fly (For a White Guy), Why Don't You Get a Job?, The Kids Aren't Alright",
        descricao: "Maior sucesso comercial da banda. Com letras sarcásticas sobre a cultura americana, dominou as rádios e a MTV mundialmente."
    },
    conspiracy: {
        nome: "Conspiracy of One",
        ano: "2000",
        gravadora: "Columbia Records",
        produtora: "Brendan O'Brien",
        faixas: "13",
        vendas: "Mais de 3 milhões de cópias",
        destaque: "Original Prankster, Want You Bad, Million Miles Away",
        descricao: "Manteve o sucesso comercial com singles bem-humorados e videoclipes icônicos na MTV."
    },
    splinter: {
        nome: "Splinter",
        ano: "2003",
        gravadora: "Columbia Records",
        produtora: "Brendan O'Brien",
        faixas: "13",
        vendas: "Mais de 2 milhões de cópias",
        destaque: "Hit That, (Can't Get My) Head Around You",
        descricao: "Álbum que misturou o punk rock com influências de new wave e pop punk mais acessível."
    },
    riseandfall: {
        nome: "Rise and Fall, Rage and Grace",
        ano: "2008",
        gravadora: "Columbia Records",
        produtora: "Bob Rock",
        faixas: "12",
        vendas: "Mais de 1 milhão de cópias",
        destaque: "You're Gonna Go Far Kid, Hammerhead, Kristy Are You Doing Okay?",
        descricao: "Retorno às raízes punk com produção mais pesada. You're Gonna Go Far Kid se tornou uma das músicas mais populares da banda."
    },
    daysgoby: {
        nome: "Days Go By",
        ano: "2012",
        gravadora: "Columbia Records",
        produtora: "Bob Rock",
        faixas: "12",
        vendas: "Mais de 500 mil cópias",
        destaque: "Days Go By, Turning Into You, Cruising California",
        descricao: "Nono álbum de estúdio com mistura de punk rápido e rock melódico. Cruising California dividiu opiniões com seu estilo pop."
    },
    letthebadtimesroll: {
        nome: "Let the Bad Times Roll",
        ano: "2021",
        gravadora: "Concord Records",
        produtora: "Bob Rock",
        faixas: "12",
        vendas: "Dados em apuração",
        destaque: "Let the Bad Times Roll, Behind Your Walls, We Never Have Sex Anymore",
        descricao: "Décimo álbum lançado após 9 anos de hiato em estúdio. Mistura humor ácido com crítica social num mundo pós-pandemia."
    }
};

function abrirModal(dados) {
    const overlay = document.createElement("div");
    overlay.classList.add("modal");

    const conteudo = document.createElement("div");
    conteudo.classList.add("modal-conteudo");

    const btnFechar = document.createElement("button");
    btnFechar.classList.add("modal-fechar");
    btnFechar.textContent = "✕";

    let html = `<h2>${dados.nome}</h2>`;

    if (dados.nomeReal) {
        html += `<p><span class="modal-label">Nome real:</span> ${dados.nomeReal}</p>`;
        html += `<p><span class="modal-label">Nascimento:</span> ${dados.nascimento}</p>`;
        html += `<p><span class="modal-label">Local:</span> ${dados.local}</p>`;
        html += `<p><span class="modal-label">Função:</span> ${dados.funcao}</p>`;
        html += `<p><span class="modal-label">Biografia:</span> ${dados.bio}</p>`;
    } else {
        html += `<p><span class="modal-label">Ano:</span> ${dados.ano}</p>`;
        html += `<p><span class="modal-label">Gravadora:</span> ${dados.gravadora}</p>`;
        html += `<p><span class="modal-label">Produtor:</span> ${dados.produtora}</p>`;
        html += `<p><span class="modal-label">Faixas:</span> ${dados.faixas}</p>`;
        html += `<p><span class="modal-label">Vendas:</span> ${dados.vendas}</p>`;
        html += `<p><span class="modal-label">Destaques:</span> ${dados.destaque}</p>`;
        html += `<p><span class="modal-label">Sobre:</span> ${dados.descricao}</p>`;
    }

    conteudo.innerHTML = html;
    conteudo.appendChild(btnFechar);
    overlay.appendChild(conteudo);
    document.body.appendChild(overlay);
    body.classList.add("scroll-bloqueado");
    document.documentElement.classList.add("scroll-bloqueado");

    function fecharModal() {
        document.body.removeChild(overlay);
        body.classList.remove("scroll-bloqueado");
        document.documentElement.classList.remove("scroll-bloqueado");
    }

    btnFechar.addEventListener("click", fecharModal);
    overlay.addEventListener("click", function(e) {
        if (e.target === overlay) {
            fecharModal();
        }
    });
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") fecharModal();
    });
}

// Clique nos cards de integrantes
const cardsMembros = document.querySelectorAll("[data-membro]");
cardsMembros.forEach(function(card) {
    // Adicionar "Ver detalhes +"
    const detalhes = document.createElement("span");
    detalhes.classList.add("ver-detalhes");
    detalhes.textContent = "Ver detalhes +";
    card.appendChild(detalhes);

    card.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") return;
        const membro = card.dataset.membro;
        abrirModal(dadosMembros[membro]);
    });
});

// Clique nos cards de discografia
const cardsAlbums = document.querySelectorAll("[data-album]");
cardsAlbums.forEach(function(card) {
    // Adicionar "Ver detalhes +"
    const detalhes = document.createElement("span");
    detalhes.classList.add("ver-detalhes");
    detalhes.textContent = "Ver detalhes +";
    card.appendChild(detalhes);

    card.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") return;
        const album = card.dataset.album;
        abrirModal(dadosAlbums[album]);
    });
});
