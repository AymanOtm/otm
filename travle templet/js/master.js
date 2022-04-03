// local storage for colors
let mainColor = localStorage.getItem("color_option");
//console.log(mainColor);
if (mainColor !== null) {
    //console.log("Its colorful");
    document.documentElement.style.setProperty("--main-color", mainColor);
    //remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");
        // add active class on element with data-color list item
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}
// random background option
let backgroundOption = true;
//control the background interval
let backgroundInterval;
//check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
//check if random background storage is not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach((element) => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

//Toggle Spin Class In Icon

document.querySelector(".toggle-set .fa-cog").onclick = function () {
    // Toggle Class fa-spin For rotation On Self
    this.classList.toggle("fa-spin");
    // Toggle Class open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
//console.log(colorsLi);
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        // console.log(e.target.dataset.color);
        //set color on root
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );

        //set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});
//Switch random backgrounds option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
randomBackEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// GEt Arry Of Images
let imagesArry = [
    "paris.jpg",
    "newland.jpg",
    "egypt.jpg",
    "germany.jpg",
    "holand.jpg",
    "istanbul.jpg",
    "dubai.jpg"
];

//function to randomize images
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imagesArry.length);
            // Change Background Image Url
            landingPage.style.backgroundImage =
                'url("images/' + imagesArry[randomNumber] + '")';
        }, 10000);
    }
}
randomizeImgs();

//select our services selector

let ourServices = document.querySelector(".our-service");
window.onscroll = function () {
    // service off set top
    let seviceOffsetTop = ourServices.offsetTop;
    // our service outer hieght
    let serviceOuterHeight = ourServices.offsetHeight;
    //window height
    let windowHeight = this.innerHeight;
    //window scroll top
    let windowScrollTop = this.pageYOffset;
    //this.console.log(windowScrollTop);
    if (windowScrollTop > seviceOffsetTop + serviceOuterHeight - windowHeight) {
        let allServices = document.querySelectorAll(
            ".services-box .service-progress span"
        );
        allServices.forEach((ourServices) => {
            ourServices.style.width = ourServices.dataset.progress;
        });
    }
};
// creating popup
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay
        overlay.className = "popup-overlay";
        //append overlay to body
        document.body.appendChild(overlay);
        //create popup box
        let popupBox = document.createElement("div");
        //add class to popup box
        popupBox.className = "popup-box";
        if (img.alt !== null) {
            //create heading
            let imgHeading = document.createElement("h3");
            // creat text for heading
            let imgText = document.createTextNode(img.alt);
            // append the text in heading
            imgHeading.appendChild(imgText);
            //append heading in popup box
            popupBox.appendChild(imgHeading);
        }
        // create img
        let popupImage = document.createElement("img");
        // set img src
        popupImage.src = img.src;
        //add img to popup box
        popupBox.appendChild(popupImage);
        // append the popup box to body
        document.body.appendChild(popupBox);

        //create close span
        let closeBtn = document.createElement("span");
        //create close btn
        let closeBtnText = document.createTextNode("X");
        // append text to close btn
        closeBtn.appendChild(closeBtnText);
        // add class to close btn
        closeBtn.className = "close-btn";
        // add close btn to popup box
        popupBox.appendChild(closeBtn);
    });
});
// close popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-btn") {
        // remove the current popup
        e.target.parentNode.remove();
        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});
//select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select all links

const allLinks = document.querySelectorAll(".links a");

function scrollToTar(tars) {
    tars.forEach((tar) => {
        tar.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
scrollToTar(allBullets);
scrollToTar(allLinks);

// handle active state
function handleActive(evnt) {
    evnt.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    // add active class on self
    evnt.target.classList.add("active");
}

// bullet option box
let bulletsSpan = document.querySelectorAll(".bullets_option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLLocalItem = localStorage.getItem("bullets_option") ;
if(bulletLLocalItem !== null){
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    });
    if(bulletLLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets_option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets_option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});

// Reset options buttun
document.querySelector(".reset_options").onclick = function(){
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("bullets_option");
    // reload
    window.location.reload();
};
// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
//stop propagation
toggleBtn.onclick = function(e) {
    e.stopPropagation();
}
toggleBtn.onclick = function () {
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};
//close menu from outside
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks){
        //check if menu is open
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
        }
    }); 
//stop propagation on menu
tLinks.onclick = function(e) {
    e.stopPropagation();
}