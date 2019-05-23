"use strict";

(function() {

    const form = document.querySelector('#searchForm');
    const searchField = document.querySelector('#searchInput');
    const responseContainer = document.querySelector('#responseContainer');
    const backToTop = document.querySelector('.back-to-top')


    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const searchedForText = searchField.value;

        const sortOptions = Array.from(document.querySelectorAll('input[type="radio"]'));
        console.log(sortOptions)

        /**
        ASSIGNING THE SORT BY VALUE 

        let sortBy;
        sortOptions.forEach(sortOption => sortOption.checked ? sortBy = sortOption.value : '');
        **/

        // OR using map and converting it to string using the join method
        const sortBy = (sortOptions.map(sortOption => sortOption.checked ? sortOption.value : '')).join('');        
        console.log(sortBy)

        responseContainer.innerHTML = '<div id="loading"></div>';

        // ROTATING LOADING CIRCLE
        const loading = document.querySelector('#loading');
        let increasing = true,
            currentDegree = 0,
            increment = 50;

        function rotate() {
            if(increasing) {
                currentDegree += increment;
                loading.style.transform = `rotate(${currentDegree}deg)`
            }
        }

        setInterval(rotate, 100);

        console.log(searchedForText)

        // const booksAPI = `https://www.googleapis.com/books/v1/volumes?q=${searchedForText}+inauthor:keyes&key=AIzaSyCGJTXSKXeWA2MByvqJvx2EZZ7BZB71FSE`;
        const booksAPI = `https://www.googleapis.com/books/v1/volumes?q=${searchedForText}&orderBy=${sortBy}&printType=all&maxResults=30&key=AIzaSyCGJTXSKXeWA2MByvqJvx2EZZ7BZB71FSE`;
        
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
                // WHEN THERE IS NO BOOKS 
                const errorMessage =  `<p class="text-center error-message">Sorry.... There is no books for <em>${searchedForText}</em>. <em><strong><a href="https://www.google.com/search?tbm=bks&q=${searchedForText}" target="_blank">Search deeper</a></strong></em></p>`;
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
                htmlContent = '<ul>' + (books.map(book => 
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
                ).join('') + 
                `<p class="google-search">Couldn't find what you are looking for? <a href="https://www.google.com/search?tbm=bks&q=${searchedForText}" target="_blank">Search deeper</p>`) 
                + '</ul>'
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent)


        }

        // WHEN REQUEST FAILS DUE TO NETWORK ERRORS

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

    window.addEventListener('scroll', () => (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? backToTop.classList.remove('hide') : backToTop.classList.add('hide'));

    
    backToTop.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    // HEADER

    // const header = document.querySelector('header');

    // window.addEventListener('scroll', function() {

    //     let lastScrollTop = 0;
    //     let currentPosition = document.documentElement.scrollTop;
    //     // console.log(currentPosition)
    //     if(currentPosition > lastScrollTop) {
    //         header.style.display = 'none';
    //     } else {
    //         header.style.display = 'inline-block'
    //     }

    //     lastScrollTop = (currentPosition <= 0) ? 0 : currentPosition;
    // })



    // SIDE (HAMBURGER) BAR

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
        mainContent.style.marginTop = '0px';
    
    }



})()

