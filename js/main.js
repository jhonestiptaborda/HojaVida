/*=========SHOW MENU=========*/
const showMenu = (toggleId,navId)=>{
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    //validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

/*=========REMOVE MENU MOBILE=====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    //When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*=========SCROLL SELECTIONS ACTIVE LINK=====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageXOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop -50;

        sectionId = current.getAttribute('id');
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*='+ sectionId +']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*='+ sectionId +']').classList.remove('active-link')
        }
    })
}

/*=========SHOW SCROLL TOP=====*/
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll');else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop)

/*=========dark light theme========*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

//we obtain the current them that the interface has by validating the dark them clas//
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark':'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon':'bx-sun';

// we validate if the user previously chose a topic
if(selectedTheme){
    // if the validation is fullfilled, we ask what the issue was to know if we actived or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click',()=>{
    //Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    // we save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme',getCurrentTheme())
    localStorage.setItem('selected-icon',getCurrentIcon())

})

/* Reduce el tamaño a A4*/

function scaleCv(){
    document.body.classList.add('scale-cv')
}

function removeScale(){
    document.body.classList.remove('scale-cv')
}

/*============Generate PDF================================*/
//PDF generatedlet 
let areaCv = document.getElementById('area-cv');

let resumeButton = document.getElementById('resume-button');

//Html2pdf options
let opt = {
    margin:  0, 
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF:{ format: 'a4', orientation: 'portrait' }
};// funtion to call areaCv and Html2pdf options

function generateResume(){html2pdf(areaCv, opt)}

// when the button is clicked, it executes the three fiunctons

resumeButton.addEventListener('click',()=>{
    //1. The class .scale-cv is added to the body, where it reduces the size of the page
    scaleCv(); 
    //2. the PDF is generated
    generateResume();
    //3. The .scale-cv class is removed from the body after 5 seconds to return to
    setTimeout(removeScale,5000)
})

