// let result1 = document.querySelector('.result1')
// let result2 = document.querySelector('.result2')
let cep = document.querySelector('#searchcityipt')
let respcep = document.querySelectorAll('#cep')

async function search() {
    // função buscando os CEPS e verificando disponibilidade de cidades atendidas.
    let cepatual = cep.value
    let cep1 = cepatual.slice(0, 5)
    let cep2 = cepatual.slice(5, 8)
    let cepformatado = `${cep1}-${cep2}`

    let ceps = ['083', '081', '082', '048', '049', '028', '029', '056', '026', '084']

    let bairros = ['Parque Taipas', 'Perus', 'Jaraguá', 'Jardim Rincão', 'Jardim Damasceno', 'Jardim Carombé', 'Jardim Elisa Maria', 'Parque São Rafael', 'Montanhão']


    await fetch(`https://brasilapi.com.br/api/cep/v2/${cep.value}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).then(result => {

        let ceprec = result.cep
        let cepcortado = ceprec.slice(0, 3)

        let faz = `OBAA! Atualmente atendemos o CEP ${cepformatado}, caso queira estar realizando uma cotação, ligue (19) 3585-1998 ou pelo Whatsapp no mesmo telefone.<br>
                Será um prazer ter você como cliente!`

        let nfaz = `No momento não atendemos o CEP ${cepformatado} baixe e confira nossas cidades atendidas em PDF ou ligue (19) 3585-1998.<br>
                Será um prazer ter você como cliente!`

        let resultsearch = document.querySelector('.resultsearch')
        let result1 = document.createElement('p')
        let result2 = document.createElement('p')


        if (result.state === 'SP' || result.state === 'MG') {

            if (ceps.includes(cepcortado) === true && result.state === 'SP' || bairros.includes(result.neighborhood) === true && result.state === 'SP') {


                result2.innerHTML = nfaz

                resultsearch.appendChild(result2)

            } else {

                result1.innerHTML = faz

                resultsearch.appendChild(result1)

            }
            
            if (cep.value != '') {
                cep.value = ''

            }

        }
    })
}