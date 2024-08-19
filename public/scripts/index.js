//função executada na pagina home -> executa a animação de loading para 2° pagina
document.addEventListener("DOMContentLoaded", function(){
    const loader = document.querySelector("#loader")
    const button = document.querySelector("#search")
    button.onclick = () =>{
        loader.style.opacity = '1'
        let elements = document.querySelectorAll(".element")
        elements.forEach((element)=>{
            element.classList.add('animate')
        })
    }
}) 

//função executada na pagina resultOk, direcionando para a pagina principal
document.querySelector("button").onclick = ()=>{
    location.href = "/"
}
