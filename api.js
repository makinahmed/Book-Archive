let inputBook = document.getElementById('input-field')
let searchBtn = document.getElementById('search-btn')
let bookDetail = document.getElementById('book-detail')
let searchNumber = document.getElementById('search-number')
let resultNotFound = document.getElementById('wrong-input');

// loading data 
const loadBooks = () => {

    let searchText = inputBook.value;
    if (inputBook.value === '') {
        inputBook.value = ''
        return;
    }
    resultNotFound.innerText = ''
    bookDetail.innerHTML = ''
    searchNumber.classList.add('d-none')
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            if (data.num_found === 0) {
                resultNotFound.innerText = 'No Result Found!!'
                return;
            }
            else {
                displayBook(data)
                searchNumber.classList.remove('d-none')
            }
        })
        .finally(() => {
            inputBook.value = ''
        })
}
// display books 
const displayBook = (books) => {
    searchNumber.innerText = `Total Results Found : ${books.numFound}`
    books.docs.forEach((book => {
        let div = document.createElement('div')
        div.classList.add("card")
        div.innerHTML = `
                <div class="card-body">
                    <img src="${displayImage(book.cover_i)}"/>
                    <p  class="card-title">BOOK NAME: <small>${book.title}</small> </p>
                    <p>AUTHOR NAME: <small>${book.author_name ? book.author_name : "Author Name Not Found!"}</small> </p>
                    <p>BOOK PUBLISHER: <small>${book.publisher ? book.publisher : "Publisher Name Not Found!"}</small> </p>
                    <p class="">FIRST PUBLISH DATE: <small>${book.first_publish_year ? book.first_publish_year : "First Publish Year Not Found!"}</small> </p>
                </div >
            </div >
        `
        bookDetail.appendChild(div)
    }));
}

// display images 
const displayImage = (cover_i) => {
    const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    return url;
}
