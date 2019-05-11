
(function() {
    console.log('working!')

    const form = document.querySelector('#searchForm');
    const searchField = document.querySelector('#searchInput');
    const responseContainer = document.querySelector('#responseContainer');

    // console.log(form, searchField, responseContainer);


    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const searchedForText = searchField.value;
        console.log(searchedForText)

        const booksAPI = `https://www.googleapis.com/books/v1/volumes?q=${searchedForText}+inauthor:keyes&key=AIzaSyCGJTXSKXeWA2MByvqJvx2EZZ7BZB71FSE`;
        fetch(booksAPI)
            .then(data => data.json())
            .then(addContent)
            .catch(e => requestError(e))

            function addContent(response) {
                let htmlContent = '';
                let books = response.items

                if(books) {
                    console.log(books)
                    htmlContent = '<ul>' + books.map(book => 
                        `<li>
                            <h3><a href="${book.volumeInfo.previewLink}" target="_blank">${book.volumeInfo.title}</a></h3>
                            <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${searchedForText}">
                            <p>${book.volumeInfo.authors}</p>
                            <p>${book.publishedDate}</p>
                        </li>`
                    ).join('') + '</ul>'

                    responseContainer.insertAdjacentHTML('afterbegin', htmlContent)

                }

            }

            function requestError(e) {
                console.log(e)
            }


    })

})()