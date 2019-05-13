
const booksAPI = `https://www.googleapis.com/books/v1/volumes?q=${searchedForText}+inauthor:keyes&key=AIzaSyCGJTXSKXeWA2MByvqJvx2EZZ7BZB71FSE`;
const books = [];

fetch(booksAPI)
    .then(data => data.json())
    .then(response => books.push(...response.data));

function displayContent() {
    let htmlContent = '';
    let bookInfo;

    books.forEach(book => {
        bookInfo = book.volumeInfo 
    });
    console.log(bookInfo);
}