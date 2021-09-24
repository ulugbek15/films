const elList = document.querySelector('.films__card-wrapper');
const elForm = document.querySelector('.form');
const elInputSearch = selectElem('.films__input-serach', elForm);
const elSelect = selectElem('.films__select', elForm);
const elFilter = selectElem('.films__filter', elForm);
const elTemplate = document.querySelector('#template').content

function renderMovies(filmsArr, element){
    element.innerHTML = null;
    
    filmsArr.forEach((film) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = film.poster
        selectElem('.films__card-title', cloneTemplate).textContent = film.title
        selectElem('.films__release-date', cloneTemplate).textContent = normalizeDate(film.release_date)
        selectElem('.films__release-date', cloneTemplate).datetime = normalizeDate(film.release_date)
        
        element.appendChild(cloneTemplate);
    })
}

renderMovies(films, elList);

function renderGenres(filmArr, element){
    
    let result = [];
    
    filmArr.forEach((film) => {
        film.genres.forEach(genre =>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })
    
    result.forEach(genre =>{
        let newOption = createDOM('option');
        newOption.textContent = genre;
        newOption.value = genre;
        
        element.appendChild(newOption)
    })
}

renderGenres(films, elSelect)

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = elInputSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const filterValue = elFilter.value.trim();
    
    const regex = new RegExp(inputValue, 'gi');
    
    const filteredFilms = films.filter((film) => film.title.match(regex));
    
    let foundFilms = [];
    
    if(selectValue === 'All'){
        foundFilms = filteredFilms
    }else{
        foundFilms = filteredFilms.filter(film => film.genres.includes(selectValue))
    }

    
    if(filterValue === 'all'){
        foundFilms
    }else if(filterValue === 'a_z'){
        foundFilms.sort((a, b) =>{
            if(a.title > b.title){
                return 1
            }else if(a.title < b.title){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'z_a'){
        foundFilms.sort((a, b) =>{
            if(a.title > b.title){
                return -1
            }else if(a.title < b.title){
                return 1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'old_new'){
        foundFilms.sort((a, b) =>{
            if(a.release_date > b.release_date){
                return -1
            }else if(a.release_date < b.release_date){
                return 1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'new_old'){
        foundFilms.sort((a, b) =>{
            if(a.release_date > b.release_date){
                return 1
            }else if(a.release_date < b.release_date){
                return -1
            }else{
                return 0
            }
        })
    }
    
    elInputSearch.value = null;
    
    renderMovies(foundFilms, elList);
});

// function renderMovies(filmsArr, element){

//     element.innerHTML = null

// filmsArr.map((film) =>{
//     const cloneTemplate = elTemplate.cloneNode(true)

// document.querySelector('')
//         let newLi = document.createElement('li');
//         let newImg = document.createElement('img');
//         let newTitle = document.createElement('h2');
//         let newGenerList = document.createElement('ul');
//         let newTime = document.createElement('time');
//         let newButton = document.createElement('button');

//         newLi.setAttribute('class', 'films__card');
//         newImg.setAttribute('class', 'films__img');
//         newGenerList.setAttribute('class', 'films__genre-list')
//         newImg.setAttribute('src', film.poster);
//         newTitle.setAttribute('class', 'films__card-title');
//         newTitle.textContent = film.title;
//         newButton.setAttribute('class', 'films__btn');
//         newButton.textContent = 'Show more';

//         let date = new Date(film.release_date);
//         let month = date.getMonth() +1;
//         let day = date.getDate();
//         let year = date.getFullYear();

//         newTime.textContent = month + '.' + day + '.' + year
//         newTime.setAttribute('datetime', month + '.' + day + '.' + year);

//         // function renderGenres(fimArr, element){
//         //     fimArr.map(film => {
//         //         let newGenerListItem = document.createElement('li');
//         //         newGenerListItem.setAttribute('class', 'films__genre');
//         //         newGenerListItem.textContent = film;
//         //         element.appendChild(newGenerListItem)
//         //     })
//         // }

//         // renderGenres(film.genres, newGenerList)

//         newLi.appendChild(newImg)
//         newLi.appendChild(newTitle)
//         // newLi.appendChild(newGenerList)
//         newLi.appendChild(newTime)
//         newLi.appendChild(newButton)

//         element.appendChild(cloneTemplate)
//     })
// }

// renderMovies(films, elList)

// function renderGenresSelect(film, element){

//     const result = [];

//     film.forEach(element => {
//         element.genres.forEach(genre =>{
//             if(!result.includes(genre)){
//                 result.push(genre)
//             }
//         })
//     });

//     result.forEach(genre =>{
//         const newOption = document.createElement('option');
//         newOption.value = genre;
//         newOption.textContent = genre;
//         element.appendChild(newOption);
//     })
// }

// renderGenresSelect(films, elSelect)


// elForm.addEventListener('submit', (e) =>{
//     e.preventDefault()

//     let inputValue = elInputSearch.value.trim();
//     let selectGenresValue = elSelect.value.trim();
//     let selectFilters = elFilter.value.trim();

//     console.log(selectFilters)

//     let regex = new RegExp(inputValue, 'gi');

//     let filteredFilms = films.filter(film => film.title.match(regex));

//     let foundFilms = [];

//     if(selectGenresValue === 'All'){
//         foundFilms = filteredFilms
//     }else{
//         foundFilms = filteredFilms.filter(film => film.genres.includes(selectGenresValue))
//     }

//     elInputSearch.value = null;

//     renderMovies(foundFilms, elList)
// })