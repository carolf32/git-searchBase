const getUserFromLocalStorage = () => {
    const result = JSON.parse(localStorage.getItem("githubUserInfo"))
    return result
}

const renderUserInfo = (obj) => {
    const image= document.querySelector(".profile__image")
    const user= document.querySelector(".profile__username")
    const button=document.querySelector(".profile__change-user--button")

    user.innerText=obj.login
    image.src=obj.avatar_url

    button.addEventListener("click", () => {
        window.location.href= "/index.html"
        localStorage.clear()
    })

}

renderUserInfo(getUserFromLocalStorage())


const renderUserRepos = async () => {
    const result = JSON.parse(localStorage.getItem("githubUserInfo"))

    const baseUrl=`https://api.github.com/users/${result.login}/repos`
    const repositorios = await fetch(baseUrl)
        .then( (response) => {
            if(!response.ok){
                throw new Error("Erro na requisição");
            } 
            return response.json();
        } ) 
        .then( (dados) => {
            localStorage.setItem("githubRepositoriesInfo", JSON.stringify(dados))
            return dados
        } )
        .catch((error)=>{
           window.location.href = "./src/pages/error.html"
        })

    const ul = document.querySelector(".profile__ul");
    ul.innerHTML=""

    repositorios.forEach(elem => {
        const li=document.createElement("li")
        const h4=document.createElement("h4")
        const p=document.createElement("p")
        const a=document.createElement("a")

        h4.innerText=elem.name
        if(elem.description !== null){
            p.innerText=elem.description
        } else{
            p.innerText="Repositório sem descrição"
        }
        a.innerText="Repositório"
        a.setAttribute("href", elem.html_url)
        a.setAttribute("target", "_blank")

        
        li.append(h4,p,a)
        ul.appendChild(li)
    })
}

renderUserRepos()