
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
                    // checking for initial search results and removing them
                    if(responseContainer.hasChildNodes()) {
                        responseContainer.firstElementChild.remove()
                        displayBooks(books)
                    } else {
                        displayBooks(books)
                    }

                } else {
                    const errorMessage =  `<p class="text-center">Sorry.... There is no books for <em>${searchedForText}</em>. Check back later</p>`;
                    // checking for initial search results and removing them
                    if(responseContainer.hasChildNodes()) {
                        responseContainer.firstElementChild.remove()
                        htmlContent = errorMessage
                    } else {
                        htmlContent = errorMessage;
                    }
                }

                // TO DISPLAY BOOKS ON THE PAGE
                function displayBooks(books) {
                    htmlContent = '<ul>' + books.map(book => 
                        `<li>
                            <div class="card">
                                <figure>
                                <img src="${book.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="${searchedForText}">
                                <figcaption>${book.volumeInfo.authors} ${book.volumeInfo.publishedDate}</figcaption>
                                </figure>
                                <div class="card-body">
                                    <h3 class="card-title"><a href="${book.volumeInfo.previewLink}" target="_blank">${book.volumeInfo.title}</a></h3>
                                    <span>${book.volumeInfo.subtitle ? book.volumeInfo.subtitle : ''}</span>
                                    <p class="card-text">${book.searchInfo ? book.searchInfo.textSnippet : searchedForText}</p>
                                    
                                </div>                            
                            </div>
                        </li>`
                    ).join('') + '</ul>'
                }

                responseContainer.insertAdjacentHTML('afterbegin', htmlContent)


            }

            function requestError(e) {
                console.log(e)
            }


    })

})()