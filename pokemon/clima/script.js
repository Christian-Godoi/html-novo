let input = document.getElementById("input")
let formulario = document.getElementById("formulario")
let resultado = document.getElementById("resultado")

function traduzirClima(codigo) {
    if (codigo === 0) return { texto: "Céu limpo", icone: "☀" }
    if (codigo === 1) return { texto: "Predomínio de sol", icone: "☼" }
    if (codigo === 2 || codigo === 3) return { texto: "Parcialmente nublado", icone: "⛅" }
    if (codigo === 45 || codigo === 48) return { texto: "Neblina", icone: "🌫️" }
    if (codigo >= 51 && codigo <= 57) return { texto: "Garoa", icone: "🌦️" }
    if (codigo >= 61 && codigo <= 67) return { texto: "Chuva", icone: "🌧️" }
    if (codigo >= 71 && codigo <= 77) return { texto: "Neve", icone: "❄️" }
    if (codigo >= 80 && codigo <= 82) return { texto: "Pancadas de chuva", icone: "🌦️" }
    if (codigo === 85 || codigo === 86) return { texto: "Neve", icone: "❄️" }
    if (codigo >= 95 && codigo <= 99) return { texto: "Tempestade", icone: "⛈️" }
    return { texto: "Indefinido", icone: "☁" }
}

function mostrarClima(dadosClima) {
    let atual = dadosClima.current
    let clima = traduzirClima(atual.weather_code)
    const cidade = dadosClima.cidade
    const local = [cidade.name, cidade.admin1, cidade.country].filter(Boolean).join(", ")

    resultado.innerHTML = `
        <section class="current-weather" aria-label="Condições atuais">
            <div>
                <p class="place-kicker">AGORA EM</p>
                <h2 class="place-name">${local}</h2>
                <p class="weather-description">${clima.texto}</p>
            </div>
            <div class="temperature-block">
                <span class="weather-symbol" aria-hidden="true">${clima.icone}</span>
                <strong class="current-temperature">${Math.round(atual.temperature_2m)}<sup>°</sup></strong>
            </div>
            <div class="weather-metrics">
                <div class="weather-metric"><span class="metric-label">SENSAÇÃO TÉRMICA</span><span class="metric-value">${Math.round(atual.apparent_temperature)}°C</span></div>
                <div class="weather-metric"><span class="metric-label">UMIDADE</span><span class="metric-value">${atual.relative_humidity_2m}%</span></div>
                <div class="weather-metric"><span class="metric-label">CONDIÇÃO</span><span class="metric-value">${clima.texto}</span></div>
            </div>
        </section>`
}

function mostrarPrevisao(dadosClima) {
    let dia = dadosClima.daily
    let previsao = document.createElement("section")
    previsao.className = "forecast-section"
    previsao.setAttribute("aria-label", "Previsão para os próximos dias")
    previsao.innerHTML = '<div class="forecast-heading"><h2>Próximos dias</h2><span class="forecast-kicker">MÁXIMA / MÍNIMA</span></div>'

    let grade = document.createElement("div")
    grade.className = "forecast-grid"

    for (let [indice, data] of dia.time.entries()) {
        let clima = traduzirClima(dia.weather_code[indice])
        let minima = dia.temperature_2m_min[indice]
        let maxima = dia.temperature_2m_max[indice]
        const dataLocal = new Date(data + "T12:00:00")
        const semana = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(dataLocal).replace(".", "")
        const dataFormatada = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(dataLocal)
        let item = document.createElement("article")
        item.className = "forecast-day" + (indice === 0 ? " today" : "")
        item.innerHTML = `<p class="day-name">${indice === 0 ? "Hoje" : semana}</p>
            <span class="day-date">${dataFormatada}</span>
            <span class="day-icon" aria-hidden="true">${clima.icone}</span>
            <p class="day-condition">${clima.texto}</p>
            <div class="day-temperatures"><span>${Math.round(maxima)}°</span><span>${Math.round(minima)}°</span></div>`
        grade.appendChild(item)
    }

    previsao.appendChild(grade)
    resultado.appendChild(previsao)
}

async function buscarClima(cidadeNome) {
    cidadeNome = cidadeNome.trim()
    if (!cidadeNome) {
        resultado.innerHTML = '<div class="weather-message">Digite o nome de uma cidade para consultar a previsão.</div>'
        return
    }

    resultado.setAttribute("aria-busy", "true")
    resultado.innerHTML = '<div class="weather-message">Buscando a previsão...</div>'
    try {
        let geolocalizacao = await fetch("https://geocoding-api.open-meteo.com/v1/search?" + new URLSearchParams({
            name: cidadeNome,
            count: "1",
            language: "pt"
        }))
        if (!geolocalizacao.ok) throw new Error("Falha ao buscar cidade")
        let dados = await geolocalizacao.json()

        if (!dados.results || dados.results.length === 0) {
            resultado.innerHTML = '<div class="weather-message">Cidade não encontrada. Confira o nome e tente novamente.</div>'
            return
        }

        let cidade = dados.results[0]
        let resposta = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + cidade.latitude +
            "&longitude=" + cidade.longitude +
            "&current=temperature_2m,relative_humidity_2m,weather_code,apparent_temperature" +
            "&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7"
        )
        if (!resposta.ok) throw new Error("Falha ao buscar previsão")
        let dadosClima = await resposta.json()
        dadosClima.cidade = cidade
        resultado.innerHTML = ""
        mostrarClima(dadosClima)
        mostrarPrevisao(dadosClima)
    } catch (erro) {
        resultado.innerHTML = '<div class="weather-message">Não foi possível conectar à API. Tente novamente em instantes.</div>'
    } finally {
        resultado.setAttribute("aria-busy", "false")
    }
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault()
    buscarClima(input.value)
})

document.querySelector(".quick-city").addEventListener("click", function() {
    input.value = "Suzano"
    buscarClima(input.value)
})