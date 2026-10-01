let formulario = document.getElementById("formulario")
let resultado = document.getElementById("resultado")

async function buscarPokemon(nome) {
    nome = nome.trim().toLowerCase()
    if (!nome) {
        resultado.innerHTML = '<div class="notice">Digite o nome ou número de um Pokémon para iniciar a busca.</div>'
        return
    }

    resultado.setAttribute("aria-busy", "true")
    resultado.innerHTML = '<div class="notice">Consultando os registros da Pokédex...</div>'
    try {
        let resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(nome))

        if (!resposta.ok) {
            resultado.innerHTML = '<div class="notice">Pokémon não encontrado. Confira a escrita e tente novamente.</div>'
            return
        }

        let dados = await resposta.json()
        const imagem = dados.sprites.other["official-artwork"].front_default || dados.sprites.front_default
        const tipos = dados.types.map(info => `<span class="type-badge">${info.type.name}</span>`).join("")
        const estatisticas = dados.stats.map(info => {
            const percentual = Math.min(info.base_stat / 1.8, 100)
            return `<div class="stat-row"><span>${info.stat.name.replace("-", " ")}</span><span class="stat-track"><span style="width: ${percentual}%"></span></span><span class="stat-value">${info.base_stat}</span></div>`
        }).join("")
        const habilidades = dados.abilities.map(info => info.ability.name.replaceAll("-", " ")).join(", ")
        const altura = (dados.height / 10).toFixed(1).replace(".", ",")
        const peso = (dados.weight / 10).toFixed(1).replace(".", ",")
        const coresPorTipo = {
            grass: "#c7dba7", fire: "#f0b39e", water: "#a9d0dc", bug: "#d4dda0",
            normal: "#d8d3c4", poison: "#d0b8d5", electric: "#f0d98a", ground: "#dfc49b",
            fairy: "#efc5d1", fighting: "#dfa99b", psychic: "#e7b4c4", rock: "#c9c0a0",
            ghost: "#b9b8d5", ice: "#b8dcda", dragon: "#b7c1e2", dark: "#b6aaa2",
            steel: "#c5ccd2", flying: "#c3c7e0"
        }
        const cor = coresPorTipo[dados.types[0].type.name] || "#dce8c9"

        resultado.innerHTML = `<article class="pokemon-card">
            <div class="pokemon-art" style="--type-tint: ${cor}">
                <img src="${imagem}" alt="Ilustração de ${dados.name}" onerror="this.src='${dados.sprites.front_default || ""}'">
                <div class="art-caption"><span>REGISTRO VISUAL</span><span>№ ${String(dados.id).padStart(3, "0")}</span></div>
            </div>
            <div class="pokemon-info">
                <p class="number-label">POKÉMON Nº ${String(dados.id).padStart(3, "0")}</p>
                <h2 class="pokemon-name">${dados.name}</h2>
                <div class="type-list">${tipos}</div>
                <dl class="pokemon-facts">
                    <div><dt>Altura</dt><dd>${altura} m</dd></div>
                    <div><dt>Peso</dt><dd>${peso} kg</dd></div>
                    <div><dt>Habilidade</dt><dd>${habilidades}</dd></div>
                </dl>
                <p class="stats-title">ATRIBUTOS BASE</p>
                <div class="stats-list">${estatisticas}</div>
            </div>
        </article>`
    } catch (erro) {
        resultado.innerHTML = '<div class="notice">Não foi possível conectar à PokéAPI. Tente novamente em instantes.</div>'
    } finally {
        resultado.setAttribute("aria-busy", "false")
    }
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault()
    buscarPokemon(input.value)
})

document.querySelectorAll(".suggestion").forEach(botao => {
    botao.addEventListener("click", function() {
        input.value = botao.dataset.pokemon
        buscarPokemon(input.value)
    })
})