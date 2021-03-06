// Target the input tag.
let output = document.querySelector('#output');
let search = document.querySelector('#search');
search.addEventListener("keypress",(e)=>{
    if(e.key === 'Enter'){
        let userName = search.value;
        result(userName).then(userData=>html(userData))
    }
})


// Eventlistener for  click button
let searchButton = document.querySelector('button');
searchButton.addEventListener('click',()=>{
    let userName = document.querySelector('#search').value
    // result(userName).then(userData=>console.log(userData))
    result(userName).then(userData=>html(userData))

})

// Function using async,await with traditional fetch() to get user info.
let result = async (userName) =>{
    const url = `https://api.github.com/users/${userName}`;
    const data = await fetch(url)
    const userData = await data.json()
    console.log(userData)
    if(userData.id){
        console.log('got the data')
        let userInfo = {
            login:userData.login,
            name : userData.name,
            id : userData.id,
            avatar : userData.avatar_url,
            joined:userData.created_at,
            url:userData.url,
            bio : userData.bio,
            htmlUrl : userData.html_url,
    
        }
        console.log(userInfo)
        return userInfo
    }else{
        let userInfo = notFound()
        return userInfo
    }
    
}
function html({name,id,avatar,bio,htmlUrl,login,url,joined}){
    if(name===null || name===undefined){
        name=search.value
    }
    if(bio === null || bio === undefined){
        bio = "This user has no info."
    }
    
    output.innerHTML= `<div class="card text-white bg-dark mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-lg-6 col-md-4 ">
        <img src=${avatar} alt=${name}>
      </div>
      <div class="col-lg-6 col-md-8">
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <h5 class="card-subtitle"><em>${login}</em></h5>
          <p class="bio card-text">${bio}</p>
          <p class="card-text"><small class="text-muted">${joined.substring(0,10)}</small></p>
          <a href=${htmlUrl} target="_blank" class="btn btn-primary">Github Link</a>
        </div>
      </div>
    </div>
  </div>`;
}

const notFound = () =>{
    const userInfo = {
        name : 'No Name',
        id : '404',
        avatar: 'https://media.makeameme.org/created/ohh-no-you-5aa861.jpg',
        joined: 'No Clue?',
        url : 'www.github.com',
        bio: 'How the little piggies grunt when the hear how the old boar suffer??',
        htmlUrl : 'www.github.com'

    }
    return userInfo
}
