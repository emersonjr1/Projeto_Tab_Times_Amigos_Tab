const frm = document.querySelector("form")
const inpt_add_times = document.getElementById("inpt_add_times");
const btn_add = document.getElementById("btn_add");
const btn_lista_times = document.getElementById("btn_lista_times");
const btn_montar_tab = document.getElementById("btn_montar_tab")
const txt_lista = document.getElementById("txt_lista")
const txt_tabelas = document.getElementById("txt_tabelas")
const inpt_tipo_esporte = document.querySelector('input[name="esporte"]:checked') 
const times = []
const timesSalvos = JSON.parse(localStorage.getItem("listaTimes"))

if (timesSalvos) {
    times.push(...timesSalvos)
}


function renderLista(){
    txt_lista.innerHTML = ""

    times.forEach((time, index) => {
        // 1. Cria um paragrafo (<p>) 
        const linha = document.createElement("p")
        
        //criação do nome time
        const span = document.createElement("span")
        span.innerText = `${time}`

        //Criação btn remover
        const btn_rmv_lst_time = document.createElement("button")
        btn_rmv_lst_time.id = 'idBtnRemove'
        btn_rmv_lst_time.className = 'classes'
        btn_rmv_lst_time.innerText = "x" 

        btn_rmv_lst_time.addEventListener("click", ()=>{
            times.splice(index,1);
            localStorage.setItem("listaTimes", JSON.stringify(times)) ;
            renderLista();
        })

        linha.appendChild(span)
        linha.appendChild(btn_rmv_lst_time)
        txt_lista.appendChild(linha)

    })

}



btn_add.addEventListener( "click", (e) => {
    e.preventDefault()
    if(inpt_add_times.value){

            const time = inpt_add_times.value.trim()
            times.push(time)

            localStorage.setItem("listaTimes", JSON.stringify(times))
            
            console.log(times)
            inpt_add_times.value = ""
    
    } else {
            alert("Adicione um time!")
        }

})

btn_lista_times.addEventListener("click", (e) => {
    e.preventDefault();
    renderLista()
    

    
})
 

btn_montar_tab.addEventListener("click", (e)  =>{
    e.preventDefault()

    const partidas = []
    const n = times.length
    const meio = n/2
    
    if(times.length % 2 != 0){
    
        alert("Há times faltantes para montagem da tabela!")
    
    }else{
            
            
            for(let i= 0; i < meio; i++ ){
                const oposto = n - 1 - i;
                const casa = times[i];
                const visitante = times[oposto];
           
         
            partidas.push(`${casa} x ${visitante}`);
                 }  
        };
    

        txt_tabelas.innerText = partidas.join("\n")

})
