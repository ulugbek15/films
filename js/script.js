const elList = document.querySelector('.films__card-wrapper');

// Form elements
const elForm = document.querySelector('.form');
const elInputSearch = selectElem('.films__input-serach', elForm);
const elSelect = selectElem('.films__select', elForm);
const elFilter = selectElem('.films__filter', elForm);

//Modal Elements
const elModal = selectElem('.modal');
const elModalContent = selectElem('.modal__content', elModal);
const elModalCloseBtn= selectElem('.modal__close-btn', elModal);
const elModalImg = selectElem('.modal__img', elModal);
const elModalTitle = selectElem('.modal__title', elModal);
const elModalGenreList = selectElem('.genre__list', elModal);
const elModalDescription = selectElem('.modal__description', elModal);

//Template Element
const elTemplate = document.querySelector('#template').content

elModalCloseBtn.addEventListener('click', () =>{
    elModal.classList.remove('modal-active')
})
elModal.addEventListener('click', evt =>{
    const modalId = evt.target.dataset.modal
    if(modalId == 1){
        elModal.classList.remove('modal-active')    
    }
})

// Movies Render
function renderMovies(filmsArr, element){
    element.innerHTML = null;
    
    filmsArr.forEach((film) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = film.poster
        selectElem('.films__card-title', cloneTemplate).textContent = film.title
        selectElem('.films__release-date', cloneTemplate).textContent = normalizeDate(film.release_date)
        selectElem('.films__release-date', cloneTemplate).datetime = normalizeDate(film.release_date)
        const elModalBtn = selectElem('.films__btn', cloneTemplate)
        elModalBtn.dataset.id = film.id
        elModalBtn.dataset.title = film.title
        
        elModalBtn.addEventListener('click', (evt) =>{
            elModal.classList.add('modal-active')
            const filmId = evt.target.dataset.id;
            let result = filmsArr.find(elem => elem.id === filmId)
            elModalImg.setAttribute('src', result.poster)
            elModalImg.setAttribute('width', 300)
            elModalImg.setAttribute('height', 350)
            elModalTitle.textContent = result.title
            elModalDescription.textContent = result.overview
            elModalGenreList.innerHTML = null
            result.genres.forEach(elem =>{
                let newLi = createDOM('LI')
                newLi.textContent = elem
                elModalGenreList.appendChild(newLi)
            })
        })
        
        element.appendChild(cloneTemplate);
    })
}

renderMovies(films, elList);


//Genres Render
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

    const sortAlph = foundFilms.sort((a, b) =>{
        if(a.title > b.title){
            return 1
        }else if(a.title < b.title){
            return -1
        }else{
            return 0
        }
    });

    const sortDate = foundFilms.sort((a, b) => a.release_date - b.release_date);

    // Sort films
    if(filterValue === 'all'){
         foundFilms
    }else if(filterValue === 'a_z'){
        sortAlph
    }else if(filterValue === 'z_a'){
        sortAlph.reverse()
    }else if(filterValue === 'old_new'){
        sortDate
    }else if(filterValue === 'new_old'){
        sortDate.reverse()
    }
    
    elInputSearch.value = null;
    
    renderMovies(foundFilms, elList);
});