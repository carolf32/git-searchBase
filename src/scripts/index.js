const fetchUserData = (username) => {
const baseUrl = `https://api.github.com/users/${username}`
        fetch(baseUrl)
        .then( (response) => {
            if(!response.ok){
                throw new Error("Erro na requisição");
            } 
            return response.json();
        } ) 
        .then( (dados) => {
            localStorage.setItem("githubUserInfo", JSON.stringify(dados))
            window.location.href = "./src/pages/profile.html"
        } )
        .catch((error)=>{
           window.location.href = "./src/pages/error.html"
        })
}


const searchUserData = () => {
    const button = document.querySelector(".index__button");
    const input = document.querySelector(".index__input");
    
    button.addEventListener("click", () => {
        fetchUserData(input.value)
    });
}

searchUserData()
