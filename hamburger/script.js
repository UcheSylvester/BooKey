
const hamburger = document.querySelector('.hamburger');
const closeButton = document.querySelector('.btn-close');
const mainContent = document.querySelector('main');
const sideMenu = document.querySelector('.side-nav');

hamburger.addEventListener('click', openSideMenu);
closeButton.addEventListener('click', closeSideMenu);

function openSideMenu() {
    // increase the width of the side menu div by 250px
    // add a margin 250px to main to move it to the right

    // sideMenu.style.width = '250px';
    // mainContent.style.marginLeft = '250px';

    sideMenu.style.width = '100%';
    mainContent.style.marginTop = '230px'
}

function closeSideMenu() {
    // sideMenu.style.width = '0px';
    // mainContent.style.marginLeft = '0px'

    sideMenu.style.width = '0px';
    mainContent.style.marginTop = '0px'
}

