"use strict";

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

        responseContainer.innerHTML = '<div id="loading"></div>';

        console.dir(responseContainer);
        const loadingBox = document.querySelector('#loading');


        function rotate() {

            // setting the speed based on the current time, so as time increases, so does the rotate speed
            // I THINK THERE IS STILL BETTER WAYS OF DOING THIS
            const speed = new Date().getMilliseconds();
            // console.log(speed)
            const currentDegree = (speed / 1000) * 360;

            loadingBox.style.transform = `rotate(${currentDegree}deg)`;
            // console.log(currentDegree)

        }

        setInterval(rotate, 10)


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
                // console.log(books)

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
            console.dir(responseContainer)
            console.log(responseContainer.hasChildNodes())

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

    // SIDE BAR

    const hamburger = document.querySelector('.hamburger');
    const closeButton = document.querySelector('.btn-close');
    const mainContent = document.querySelector('main');
    const sideMenu = document.querySelector('.side-nav');

    // When the hamburger is clicked, we call openSideMenu
    hamburger.addEventListener('click', openSideMenu);
    
    // Opens sideMenu by increasing its width and bringing down the main content
    function openSideMenu() {
        sideMenu.style.width = '100%';
        mainContent.style.marginTop = '260px';

        // mainContent.style.marginTop = '300px';
    }

    closeButton.addEventListener('click', closeSideMenu);
    
    function closeSideMenu() {
        sideMenu.style.width = '0px';
        mainContent.style.marginTop = '0px'
    }



})()

// function rotate() {
//     const loadingBox = document.querySelector('#loading');
//     console.log('hi')
//     // console.log(window.getComputedStyle(loadingBox).transform)

//     // setting the speed based on the current time, so as time increases, so does the rotate speed
//     const speed = new Date().getMilliseconds()
//     const currentDegree = (speed / 1000) * 360;
//     // time = time ++
//     // console.log(time, currentDegree)

//     loadingBox.style.transform = `rotate(${currentDegree}deg)`;
//     // const currentDegree = loadingBox.style.transform;
//     // console.log(currentDegree)
    
// }

// setInterval(rotate, 100)
// rotate()