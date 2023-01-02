// Your code here
let url = "http://localhost:3000/films"
let ticket;

fetch(url)
.then(res => res.json())
.then(data => {
    // data.forEach(element => {console.log(element.title)
    
    displayFirstMovie(data[0])
    renderMovies(data)
    
})


function displayFirstMovie(movieObj) {
    
                
        
        document.querySelector('#poster').src = movieObj.poster
        document.querySelector('#poster').alt = movieObj.title
        document.querySelector('#title').innerHTML = movieObj.title
        document.querySelector('#runtime').innerHTML = `${movieObj.runtime} minutes`
        document.querySelector('#film-info').innerHTML = movieObj.description
        document.querySelector('#showtime').innerHTML = movieObj.showtime
        document.querySelector('#title').dataset.id = movieObj.id
        
        document.querySelector('#ticket-num').textContent = movieObj.capacity - movieObj.tickets_sold
        
        
    }

document.getElementById('buy-ticket').addEventListener('click', sellTicket)
   

function renderMovies(movies) {
    const ul = document.getElementById('films')
    ul.innerHTML = ''

    movies.forEach(item => {
       
        const movieTitle = item.title 
        let btn = document.createElement('button')
        btn.addEventListener('click', (e) => {
            e.target.parentNode.remove()
            deleteMovie (item.id)})
        btn.textContent = 'x'
        let li = document.createElement('li')
        li.textContent = `${movieTitle.toUpperCase()} `
        li.dataset.id = item.id
        li.classList.add('filmList') 
        li.appendChild(btn)
        ul.appendChild(li)
        li.addEventListener('click',(e) => {
            e.preventDefault()
            displayFirstMovie(item)
        })
    })
}

function sellTicket(movieObj) {
   
  console.log(document.getElementById('title').dataset.id)
    
    
        
    fetch(`${url}/${movieObj.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tickets_sold: ticketsSold + 1
          })
    })
    .then(res => res.json())
    .then(movieObj => console.log(movieObj))
    
}
function deleteMovie(movieID) {
    
    
    fetch(`${url}/${movieID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        displayFirstMovie(data[0].id)
    renderMovies(data)
    })
    

}
