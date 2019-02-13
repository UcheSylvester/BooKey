
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', function(e) {
    e.preventDefault();

    // TODO
    // get the input in the search box
    // define google books API
    
    // fetch the searched books

    // display the searched books


    // defining constant variables
    const searchText = searchInput.value;
    console.log(typeof searchText, searchText)
    const booksAPI = 'https://www.googleapis.com/books/v1/volurmes?q='

    // fetching data

    fetch(booksAPI+ searchText).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
    })




})