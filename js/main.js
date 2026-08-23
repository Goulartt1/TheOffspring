const botao = document.getElementById("btn-tema");
const body = document.body;
const links = document.querySelectorAll("nav a");
const botaoMenu = document.querySelector("#btn-menu");
const navUl = document.querySelector("nav ul");

// Lightbox
const fotosGaleria = document.querySelectorAll("#galeria img");
const fotosIntegrantes = document.querySelectorAll("#integrantes .card img");
const fotosDiscografia = document.querySelectorAll("#discografia .card img");
const fotosHistoria = document.querySelectorAll("#historia .historia-imagem img");

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

    showInfo.textContent = `🎸 Faltam ${dias}d ${horas}h ${minutos}m ${segundos}s para The Offspring ao vivo @ The Stone Pony, Asbury Park`;
}

const timer = setInterval(atualizarCountdown, 1000);
atualizarCountdown();

// Typing effect no hero
const heroTyping = document.querySelector(".hero-typing");
const textoHero = "Pure California punk rock energy, delivered fast and loud.";
let indiceLetra = 0;

function digitarLetra() {
    if (indiceLetra < textoHero.length) {
        heroTyping.textContent += textoHero.charAt(indiceLetra);
        indiceLetra++;
        setTimeout(digitarLetra, 50);
    } else {
        heroTyping.classList.add("finalizado");
    }
}

setTimeout(digitarLetra, 800);

// Restaurar tema salvo
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "light") {
    body.classList.add("light-mode");
    botao.textContent = "☀️";
}

botao.addEventListener("click", function() {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        botao.textContent = "☀️";
        localStorage.setItem("tema", "light");
    } else {
        botao.textContent = "🌙";
        localStorage.setItem("tema", "dark");
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

fotosHistoria.forEach(function(foto, i) {
    foto.addEventListener("click", function() {
        abrirLightbox(fotosHistoria, i);
    });
});

// Accordion
const accordionTitulos = document.querySelectorAll(".accordion-titulo");

accordionTitulos.forEach(function(titulo) {
    titulo.addEventListener("click", function() {
        const item = titulo.parentElement;
        const estaAtivo = item.classList.contains("ativo");

        // Fechar todos os outros
        document.querySelectorAll(".accordion-item").forEach(function(i) {
            i.classList.remove("ativo");
        });

        // Se não estava ativo, abrir
        if (!estaAtivo) {
            item.classList.add("ativo");
        }
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
        imagem: "assets/images/dexter.jpg",
        bio: "Fundador e líder do The Offspring desde 1984. Além de músico, Dexter é doutor em Biologia Molecular pela Universidade do Sul da Califórnia, piloto de aviões e empresário — foi dono de uma marca de molho de pimenta chamada Gringo Bandito."
    },
    noodles: {
        nome: "Noodles",
        nomeReal: "Kevin John Wasserman",
        nascimento: "4 de fevereiro de 1963",
        local: "Los Angeles, Califórnia, EUA",
        funcao: "Guitarrista",
        imagem: "assets/images/noodles.jpg",
        classeImagem: "modal-img-noodles",
        bio: "Membro original desde 1984, Noodles é conhecido pelo humor irreverente e pelos solos de guitarra marcantes. Antes de se juntar à banda era zelador de uma escola e era o único membro maior de idade, o que permitia comprar cerveja para os ensaios."
    },
    greg: {
        nome: "Greg K.",
        nomeReal: "Gregory David Kriesel",
        nascimento: "20 de janeiro de 1965",
        local: "Glendale, Califórnia, EUA",
        funcao: "Baixista",
        imagem: "assets/images/greg.jpg",
        classeImagem: "modal-img-greg",
        bio: "Cofundador da banda ao lado de Dexter Holland em 1984. Greg foi o baixista por 34 anos até sua saída em 2018. Sua linha de baixo em Smash e Americana ajudou a definir o som característico do grupo."
    },
    pete: {
        nome: "Pete Parada",
        nomeReal: "Peter Gregory Parada",
        nascimento: "12 de maio de 1972",
        local: "Los Angeles, Califórnia, EUA",
        funcao: "Baterista",
        imagem: "assets/images/pete.jpg",
        classeImagem: "modal-img-pete",
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
        imagem: "assets/images/album-theoffspring.jpg",
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
        imagem: "assets/images/album-ignition.jpg",
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
        imagem: "assets/images/album-smash.jpg",
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
        imagem: "assets/images/album-Ixnay.jpg",
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
        imagem: "assets/images/album-americana.jpg",
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
        imagem: "assets/images/album-conspiracy.jpg",
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
        imagem: "assets/images/album-splinter.jpg",
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
        imagem: "assets/images/album-riseandfall.jpg",
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
        imagem: "assets/images/album-daysgoby.jpg",
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
        imagem: "assets/images/album-letthebadtimesroll.jpg",
        descricao: "Décimo álbum lançado após 9 anos de hiato em estúdio. Mistura humor ácido com crítica social num mundo pós-pandemia."
    }
};

function abrirModal(dados, lista, indice) {
    let atual = indice;

    const overlay = document.createElement("div");
    overlay.classList.add("modal");

    const conteudo = document.createElement("div");
    conteudo.classList.add("modal-conteudo");

    const btnFechar = document.createElement("button");
    btnFechar.classList.add("modal-fechar");
    btnFechar.textContent = "✕";

    const btnAnterior = document.createElement("button");
    btnAnterior.classList.add("lightbox-anterior");
    btnAnterior.textContent = "❮";

    const btnProximo = document.createElement("button");
    btnProximo.classList.add("lightbox-proximo");
    btnProximo.textContent = "❯";

    function renderizarConteudo() {
        const item = lista[atual];
        let html = "";

        if (item.imagem) {
            const classeExtra = item.classeImagem ? " " + item.classeImagem : "";
            const classeAlbum = item.ano ? " modal-imagem-album" : "";
            html += `<div class="modal-imagem-container">`;
            html += `<img src="${item.imagem}" class="modal-imagem${classeExtra}${classeAlbum}" alt="${item.nome}">`;
            html += `<button class="modal-zoom-btn" title="Ver em tela cheia"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></button>`;
            html += `</div>`;
}
        html += `<h2>${item.nome}</h2>`;

        if (item.nomeReal) {
            html += `<p><span class="modal-label">Nome real:</span> ${item.nomeReal}</p>`;
            html += `<p><span class="modal-label">Nascimento:</span> ${item.nascimento}</p>`;
            html += `<p><span class="modal-label">Local:</span> ${item.local}</p>`;
            html += `<p><span class="modal-label">Função:</span> ${item.funcao}</p>`;
            html += `<p><span class="modal-label">Biografia:</span> ${item.bio}</p>`;
        } else {
            html += `<p><span class="modal-label">Ano:</span> ${item.ano}</p>`;
            html += `<p><span class="modal-label">Gravadora:</span> ${item.gravadora}</p>`;
            html += `<p><span class="modal-label">Produtor:</span> ${item.produtora}</p>`;
            html += `<p><span class="modal-label">Faixas:</span> ${item.faixas}</p>`;
            html += `<p><span class="modal-label">Vendas:</span> ${item.vendas}</p>`;
            html += `<p><span class="modal-label">Destaques:</span> ${item.destaque}</p>`;
            html += `<p><span class="modal-label">Sobre:</span> ${item.descricao}</p>`;
        }

        conteudo.innerHTML = html;
        const btnZoom = conteudo.querySelector(".modal-zoom-btn");
        if (btnZoom) {
                btnZoom.addEventListener("click", function(e) {
                    e.stopPropagation();
                    // Abre lightbox por cima do modal (sem fechar o modal)
                    const imgFake = [{ src: lista[atual].imagem }];
                    abrirLightbox(imgFake, 0);
    });
}
        conteudo.appendChild(btnFechar);
        atualizarBotoes();
    }

    function atualizarBotoes() {
        btnAnterior.style.display = atual === 0 ? "none" : "block";
        btnProximo.style.display = atual === lista.length - 1 ? "none" : "block";
    }

    renderizarConteudo();
    overlay.appendChild(btnAnterior);
    overlay.appendChild(conteudo);
    overlay.appendChild(btnProximo);
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

    btnProximo.addEventListener("click", function() {
        if (atual < lista.length - 1) {
            atual++;
            renderizarConteudo();
        }
    });

    btnAnterior.addEventListener("click", function() {
        if (atual > 0) {
            atual--;
            renderizarConteudo();
        }
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") fecharModal();
        if (e.key === "ArrowRight" && atual < lista.length - 1) {
            atual++;
            renderizarConteudo();
        }
        if (e.key === "ArrowLeft" && atual > 0) {
            atual--;
            renderizarConteudo();
        }
    });
}

// Clique nos cards de integrantes
const cardsMembros = document.querySelectorAll("[data-membro]");
const listaMembros = Object.values(dadosMembros);

cardsMembros.forEach(function(card, i) {
    const detalhes = document.createElement("span");
    detalhes.classList.add("ver-detalhes");
    detalhes.textContent = "Ver detalhes +";
    card.appendChild(detalhes);

    card.addEventListener("click", function(e) {
        abrirModal(listaMembros[i], listaMembros, i);
    });
});

// Clique nos cards de discografia
const cardsAlbums = document.querySelectorAll("[data-album]");
const listaAlbums = Object.values(dadosAlbums);

cardsAlbums.forEach(function(card, i) {
    const detalhes = document.createElement("span");
    detalhes.classList.add("ver-detalhes");
    detalhes.textContent = "Ver detalhes +";
    card.appendChild(detalhes);

    card.addEventListener("click", function(e) {
        abrirModal(listaAlbums[i], listaAlbums, i);
    });
});

// Animações de entrada ao rolar
const elementosAnimados = document.querySelectorAll(
    ".section-title, .card, .historia-texto, .historia-imagem, .accordion-item, .rede-btn, #player .container"
);

elementosAnimados.forEach(function(el) {
    el.classList.add("fade-in");
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

elementosAnimados.forEach(function(el) {
    observer.observe(el);
});

// Estatísticas animadas
function formatarNumero(valor) {
    if (valor >= 1000000) {
        return Math.floor(valor / 1000000) + "M";
    }
    if (valor >= 1000) {
        return Math.floor(valor / 1000) + "K";
    }
    return valor.toString();
}

function animarContador(elemento) {
    const alvo = parseInt(elemento.dataset.alvo);
    const sufixo = elemento.dataset.sufixo || "";
    const duracao = 2000;
    const inicio = performance.now();

    function atualizar(agora) {
        const progresso = Math.min((agora - inicio) / duracao, 1);
        // Easing: desacelera no final
        const easeOut = 1 - Math.pow(1 - progresso, 3);
        const valorAtual = Math.floor(easeOut * alvo);

        elemento.textContent = formatarNumero(valorAtual) + sufixo;

        if (progresso < 1) {
            requestAnimationFrame(atualizar);
        } else {
            elemento.textContent = formatarNumero(alvo) + sufixo;
        }
    }

    requestAnimationFrame(atualizar);
}

const estatisticasNumeros = document.querySelectorAll(".estatistica-numero");

const observerEstatisticas = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            animarContador(entry.target);
            observerEstatisticas.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

estatisticasNumeros.forEach(function(el) {
    observerEstatisticas.observe(el);
});

// Navegação ativa na navbar
const secoes = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav ul a");

const observerNav = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function(link) {
                link.classList.remove("nav-ativo");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("nav-ativo");
                }
            });
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -60% 0px" });

secoes.forEach(function(secao) {
    observerNav.observe(secao);
});

// Forçar destaque de Redes Sociais ao chegar no final da página
window.addEventListener("scroll", function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        navLinks.forEach(function(link) {
            link.classList.remove("nav-ativo");
            if (link.getAttribute("href") === "#redes-sociais") {
                link.classList.add("nav-ativo");
            }
        });
    }
});

// Efeito parallax no hero
const hero = document.getElementById("hero");

window.addEventListener("scroll", function() {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = scrollY * 0.4 + "px";
    }
});

// Botão voltar ao topo
const btnTopo = document.getElementById("btn-topo");

window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
        btnTopo.classList.add("visivel");
    } else {
        btnTopo.classList.remove("visivel");
    }
});

btnTopo.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
