// Your code here
let url = "https://my-json-server.typicode.com/wanjirumuigai/flatdango/films"

document.addEventListener("DOMContentLoaded", () => {
  loadMovies()
})
function loadMovies(){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    // data.forEach(element => {console.log(element.title)
    
    renderMovies(data)
    displayFirstMovie(data[0])
    
  })
}


function displayFirstMovie(movieObj) {
  if ((movieObj.capacity - movieObj.tickets_sold) === 0){
    document.getElementById("buy-ticket").textContent = "Sold Out"
    document.getElementById("buy-ticket").disabled = true
    document.getElementById("buy-ticket").classList.add("sold-out")
  }
  else {
    document.getElementById("buy-ticket").textContent = "Buy Ticket"
    document.getElementById("buy-ticket").disabled = false
    document.getElementById("buy-ticket").classList.remove("sold-out") 
  }
  document.querySelector('#poster').src = movieObj.poster
  document.querySelector('#poster').alt = movieObj.title
  document.querySelector('#title').innerHTML = movieObj.title
  document.getElementById("title").dataset.capacity = movieObj.capacity
  document.getElementById("title").dataset.sold = movieObj.tickets_sold
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
        if (item.capacity === item.tickets_sold){
          li.classList.add("sold-out")
        }
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

function loadMovieByID(id){
  fetch(`${url}/${id}`)
  .then(res => res.json())
  .then(data => {
    // data.forEach(element => {console.log(element.title)
    displayFirstMovie(data)
    
  })
}

function sellTicket() {
  const filmID = document.getElementById('title').dataset.id
  const capacity = parseInt(document.getElementById("title").dataset.capacity)
  let ticketsSold = parseInt(document.getElementById("title").dataset.sold)
  let remainingTickets = capacity - ticketsSold
  remainingTickets -= 1
  document.getElementById("ticket-num").textContent = remainingTickets
  document.getElementById("title").dataset.sold = ticketsSold + 1

    fetch(`${url}/${filmID}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            tickets_sold: ticketsSold + 1
          })
    })
    .then(res => res.json())
    .then(movieObj => movieObj)
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

