function proximoDiaDosPais() {
	const hoje = new Date();
	let ano = hoje.getFullYear();
	let data = segundoDomingoDeAgosto(ano);

	if (data <= hoje) {
		ano += 1;
		data = segundoDomingoDeAgosto(ano);
	}

	return data;
}

function segundoDomingoDeAgosto(ano) {
	const primeiroDeAgosto = new Date(ano, 7, 1);
	const diasAteDomingo = (7 - primeiroDeAgosto.getDay()) % 7;
	return new Date(ano, 7, 1 + diasAteDomingo + 7, 0, 0, 0);
}

function atualizarContagem() {
	const alvo = proximoDiaDosPais();
	const agora = new Date();
	let meses = alvo.getMonth() - agora.getMonth();

	if (meses < 0) {
		meses += 12;
	}

	let inicioDoPeriodo = new Date(agora);
	inicioDoPeriodo.setMonth(inicioDoPeriodo.getMonth() + meses);

	if (inicioDoPeriodo > alvo) {
		meses -= 1;
		if (meses < 0) {
			meses += 12;
		}
		inicioDoPeriodo = new Date(agora);
		inicioDoPeriodo.setMonth(inicioDoPeriodo.getMonth() + meses);
	}

	const diferenca = Math.max(0, alvo - inicioDoPeriodo);
	const totalSegundos = Math.floor(diferenca / 1000);
	const dias = Math.floor(totalSegundos / 86400);
	const horas = Math.floor(totalSegundos % 86400 / 3600);
	const minutos = Math.floor(totalSegundos % 3600 / 60);
	const segundos = totalSegundos % 60;

	document.getElementById('meses').textContent = String(meses).padStart(2, '0');
	document.getElementById('dias').textContent = String(dias).padStart(2, '0');
	document.getElementById('horas').textContent = String(horas).padStart(2, '0');
	document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
	document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
	document.getElementById('data-alvo').textContent = `Dia dos Pais | ${alvo.toLocaleDateString('pt-BR')}`;
}

atualizarContagem();
setInterval(atualizarContagem, 1000);
