
(function() {

    // fetch('http://api.cloudpublish.co.uk/')
    // .then(data => data.json())
    // .then(r => console.log(r))

    const form = document.querySelector('#searchForm');
    const searchField = document.querySelector('#searchInput');
    const responseContainer = document.querySelector('#responseContainer');
    const backToTop = document.querySelector('.back-to-top')

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

        /*** ADDING CONTENTS FOR DISPLAY ***/
        function addContent(response) {
            let htmlContent = '';
            const books = response.items;

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
                const errorMessage =  `<p class="text-center error-message">Sorry.... There is no books for <em>${searchedForText}</em>. Check back later</p>`;
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
                            <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}" class="card-img-top" alt="${searchedForText}">
                            <figcaption><strong>${book.volumeInfo.authors ? book.volumeInfo.authors : ''}</strong> <br> &#128197 <em>${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : ''}</em></figcaption>
                            </figure>
                            <div class="card-body">
                                <h3 class="card-title"><a href="${book.volumeInfo.previewLink}" target="_blank">${book.volumeInfo.title}</a></h3>
                                <h4 class="subtitle">${book.volumeInfo.subtitle ? book.volumeInfo.subtitle : searchedForText}</h4>
                                <p class="card-text">${book.searchInfo ? book.searchInfo.textSnippet : 'A books on ' + searchedForText}</p>
                                
                            </div>                            
                        </div>
                    </li>`
                ).join('') + '</ul>'
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent)


        }

        // WHEN REQUEST FAILS

        function requestError(e) {
            const errorMessage = `<div class="text-center error-message">A <em><strong>${e.message}</strong></em> occured... Please, check internet connection and try again</div>`;
            // console.dir(e, e.message)

            if (!responseContainer.hasChildNodes()) {
                responseContainer.insertAdjacentHTML('afterbegin', errorMessage);
            } else {
                responseContainer.firstElementChild.remove();

                responseContainer.insertAdjacentHTML('afterbegin', errorMessage);
            }
        }
    })


    // FOR THE BACK TO TOP BUTTON

    // window.addEventListener('scroll', function(e) {
    //     console.log('working');
    // })

    window.addEventListener('scroll', () => (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? backToTop.classList.remove('hide') : backToTop.classList.add('hide'));

    backToTop.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })



})()