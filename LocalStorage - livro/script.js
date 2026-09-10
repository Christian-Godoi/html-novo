const formulario = document.getElementById('formulario')
const titulo = document.getElementById('titulo')
const lanche = document.getElementById('lanche')
const lista = document.getElementById('lista')
const quantidade = document.getElementById('quantidade')
const chaveLocalStorage = 'livros-diario-banana'
const capasConhecidas = {
	'o diario de um banana': 'https://covers.openlibrary.org/b/id/14376136-M.jpg',
	'rodrick e o cara': 'https://covers.openlibrary.org/b/id/8542270-M.jpg',
	'a gota d\'agua': 'https://covers.openlibrary.org/b/id/12685121-M.jpg',
	'dias de cao': 'https://covers.openlibrary.org/b/id/12366143-M.jpg',
	'a verdade nua e crua': 'https://covers.openlibrary.org/b/id/7396124-M.jpg'
}

let livros = JSON.parse(localStorage.getItem(chaveLocalStorage)) || []

function normalizarTitulo(texto) {
	return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

function salvarLivros() {
	localStorage.setItem(chaveLocalStorage, JSON.stringify(livros))
}

function mostrarLivros() {
	lista.innerHTML = ''
	quantidade.textContent = `${livros.length} ${livros.length === 1 ? 'livro' : 'livros'}`

	if (livros.length === 0) {
		lista.innerHTML = '<li class="vazio">Sua coleção ainda está vazia. Cadastre o primeiro livro!</li>'
		return
	}

	livros.forEach(function(livro, indice) {
		const item = document.createElement('li')
		item.className = 'livro'

		const capa = document.createElement('img')
		capa.className = 'capa'
		capa.alt = `Capa do livro ${livro.titulo}`
		const urlCapa = capasConhecidas[normalizarTitulo(livro.titulo)]
		if (urlCapa) {
			capa.src = urlCapa
			capa.addEventListener('error', function() {
				capa.removeAttribute('src')
			})
		}

		const detalhes = document.createElement('div')
		detalhes.className = 'detalhes'

		const tituloLivro = document.createElement('h3')
		tituloLivro.className = 'titulo'
		tituloLivro.textContent = livro.titulo

		const lancheLivro = document.createElement('p')
		lancheLivro.className = 'lanche'
		lancheLivro.textContent = livro.lanche ? `Lanche: ${livro.lanche}` : 'Lanche: não informado'

		const apagar = document.createElement('button')
		apagar.className = 'apagar'
		apagar.type = 'button'
		apagar.textContent = 'Apagar'
		apagar.addEventListener('click', function() {
			livros.splice(indice, 1)
			salvarLivros()
			mostrarLivros()
		})

		detalhes.append(tituloLivro, lancheLivro, apagar)
		item.append(capa, detalhes)
		lista.appendChild(item)
	})
}

formulario.addEventListener('submit', function(evento) {
	evento.preventDefault()

	const novoTitulo = titulo.value.trim()
	const novoLanche = lanche.value.trim()

	if (!novoTitulo) return

	livros.push({ titulo: novoTitulo, lanche: novoLanche })
	salvarLivros()
	formulario.reset()
	titulo.focus()
	mostrarLivros()
})

mostrarLivros()
