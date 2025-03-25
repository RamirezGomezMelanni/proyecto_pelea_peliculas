const fetchData = async(searchTerm) => {
    const response = await axios.get('http://omdbapi.com', {
        params: {
            apikey: '690f7a18',
            s: 'avengers'
        }
    })
    if(response.data.Error){
        return []
    }
    console.log(response.data)
}
//fetchData()

const root = document.querySelector('.autocomplete')
root.innerHTML = `
<label><b>busqueda de peliculas</b></label>
<input class="input" />
<div class="dropdown"
<div class="dropdown-menu">
<div class="dropdown-content results"></div>
</div>
</div>`
const input = document.querySelector("input")
const dropdown = document.querySelector('.dropdown')
const resultsWeapper = document.querySelector('.results')

const debonce = (func, delay = 1000) => {
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const onInput = async(event) => {
    const movies = await fetchData(event.target.value)
    console.log("MOVIES: ", movies)

    if(!movies.length){
        dropdown.classList.remove('is-active')
        return
    }
    resultsWeapper.innerHTML= ''
    dropdown.classList.add('is-active')

    for (let movie of movies){
        const opinion = document.createElement('a')
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster

        opinion.classList.add('dropdown-item')
        opinion.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.title}
        `
        opinion.addEventListener('click', () => {
            dropdown.classList.remove('is-active')
            input.value = movie.title
            onMovieSelect(movie)
        })
        resultsWeapper.appendChild(opinion)
    }
}
