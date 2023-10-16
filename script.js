const cepInput = document.getElementById('cep');
const resultadoDiv = document.getElementById('resultado');
const buscarButton = document.getElementById('buscar');

function buscarCep(){
    const cep = cepInput.value;
    if(cep === '') {
        resultadoDiv.innerHTML = `<p>Informe um CEP!</p>`;
    } else {
        if(tamanhoCepInvalido(cep)) return;

        buscarButton.disabled = true;
        buscarButton.innerHTML = 'Buscando...';
        resultadoDiv.innerHTML = '<p>Buscando informações do CEP...</p>';
        buscarCepValido(cep);
    }
}

function tamanhoCepInvalido(cep){
    if(cep.length < 9) {
        resultadoDiv.innerHTML = `<p>CEP inválido!</p>`;
        return true;
    }
    return false;
}

function buscarCepValido(cep, logradouro, cidade, estado){
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cep === undefined) {
                resultadoDiv.innerHTML = `<p>CEP não encontrado!</p>`;
                return;
            }
            resultadoDiv.innerHTML = `
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
                <p><strong>DDD:</strong> ${data.ddd}</p>
                `;
        })
        .catch(error => {
            resultadoDiv.innerHTML = `<p>Erro ao buscar CEP: Não encontrado!</p>`;
        });

        habilitarButtonBuscar();
}

function maskCep(event) {
    if (event.target.value.length === 5) {
        event.target.value += '-';
    }
}

function habilitarButtonBuscar() {
    buscarButton.innerHTML = 'Buscar';
    buscarButton.disabled = false;
}