const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

app.set("view engine", "ejs")

app.use(express.static('public'))
//app.set('views', path.join(__dirname, 'views')) 

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=> res.render("home"))

app.post('/resultOk', (req,res)=> {
    const inputCity = req.body.city.toUpperCase()
    const inputZone = req.body.zone
    const inputSection = req.body.section
    console.log(`Busca pela cidade: ${inputCity}, zona n° ${inputZone} na seção ${inputSection}.`)

    async function search(){    
    
        const response = await axios.get('https://apps.tre-rj.jus.br/api-dados-abertos/locaisvotacao/') 

        if(response.status === 200){
           return response.data
        }
        else{
            console.error("Erro ao buscar API: ",response.status)
            return null
        }
    }

    function cSection(sections, number) { //os parametros receberão: (uma string com numeros, valor a ser verificado se está na string)
        const sectionArray = sections.split(','); // Transforma a string em um array
        return sectionArray.includes(number.toString()); // Verifica se o número está presente e o retorna
    }

    search().then(data=>{
        if(data){    // se hover resultado proveniente da API
        
            let soFriburg = data.filter(local => cSection(local.secoes, `${inputSection}`) && local.numZona === parseInt(`${inputZone}`) && local.municipio ===`${inputCity}`)//secoes,numZona e municipio são dados da API
            //console.log(soFriburg)
            const dataAtual = new Date();
            const options = { timeZone: "America/Sao_Paulo" };
            const dataHoraBrasil = dataAtual.toLocaleString("pt-BR", options);
            console.log(dataHoraBrasil);

            res.render('resultOk', { results: soFriburg }) //passada variável a ser utilizada no front
            
        }
        else{
            console.log('Erro aqui')
            res.render('resultOk', { results: [] })
        }
    })     
})


app.listen('3000', ()=> console.log('** Server OK! **'))


//EXEMPLO DE RETORNO DA API
        // [
        //     {
        //         "numLocal":1058,
        //         "numZona":4,
        //         "local":"CASA DE RUI BARBOSA",
        //         "municipio":"RIO DE JANEIRO",
        //         "bairro":"BOTAFOGO",
        //         "endereco":"RUA SÃO CLEMENTE 134",
        //         "cep":"22260000",
        //         "secoes":"20,19,18,17,202,22,21"
        //     },
        //     {
        //         ...
        //     }
        // ] 
