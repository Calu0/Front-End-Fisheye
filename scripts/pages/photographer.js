
let photographerId = new URLSearchParams(window.location.search).get("id");


// Récupère les datas du photographer 

async function getPhotographer() {

    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    const photographer = photographers.find((photographer) => photographer.id == photographerId);
    return ({
        photographer: { ...photographer }
    })
}

async function displayBanner(photographer) {

    console.log(photographer);
    const photographerHeader = document.querySelector(".photograph-header");
    const headerBtn = document.querySelector(".contact_button");

    // création des éléments de la banner dans le DOM

    const divTitle = document.createElement('div');
    divTitle.setAttribute("class", "photographer_title");
    const h1 = document.createElement('h1');
    h1.textContent = photographer.name;
    const location = document.createElement('p');
    location.setAttribute("class", "photographer_location");
    location.textContent = photographer.city + "," + ' ' + photographer.country;
    const tagline = document.createElement('p');
    tagline.setAttribute("class", "photographer_tagline");
    tagline.textContent = photographer.tagline;
    const portrait = document.createElement('img');
    portrait.setAttribute("class", "photographer_portrait");
    portrait.setAttribute("src", `../../assets/photographers/${photographer.portrait}`);

    divTitle.appendChild(h1);
    divTitle.appendChild(location);
    divTitle.appendChild(tagline);


    photographerHeader.insertBefore(divTitle, headerBtn);
    photographerHeader.appendChild(portrait);



}


function updateOptions(selectedText) {
    const allOptions = ["Popularité", "Date", "Titre"];
    const sortOptions = document.querySelector(".sort_options");

    // supprime la liste des options  
    sortOptions.innerHTML = '';


    // recrée la liste des options de tri en omettant l'option sélectionnée 
    allOptions.map(option => {
        if (option !== selectedText) {
            const li = document.createElement("li");
            li.textContent = option;
            li.addEventListener("click", optionSelected);
            sortOptions.appendChild(li);
        }
    });
}

// Gestionnaire d'événements pour les options sélectionnées
function optionSelected(event) {
    const selectedText = event.target.textContent;
    sortBtn.textContent = selectedText;  // Met à jour le texte du bouton de tri

    updateOptions(selectedText);     // Met à jour la liste des options de tri

    // Tri des images en fonction de l'option sélectionnée
    if (selectedText === "Popularité") {
        displaySortedImages(sortByPopularity);
    } else if (selectedText === "Date") {
        displaySortedImages(sortByDate);
    } else if (selectedText === "Titre") {
        displaySortedImages(sortByTitle);
    }

    sortOptions.classList.remove("show_sort_options");
}

// Definition de l'option par défaut et mise à jour des options
const sortBtn = document.querySelector(".sort_button");
const defaultOption = "Date";
sortBtn.textContent = defaultOption;
updateOptions(defaultOption);

// Gestionnaire d'événements pour le bouton de tri
const sortOptions = document.querySelector(".sort_options");
sortBtn.addEventListener("click", () => {
    sortOptions.classList.toggle("show_sort_options");
});


// récupère les images filtrés par id du photographer

async function getImages() {


    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const images = data.media;
    const photographerImages = images.filter((image) => image.photographerId == photographerId);
    return ({
        photographerImages: [...photographerImages]
    })
}

// display images 

async function displayImages(photographer) {

    const imagesSection = document.querySelector(".images-catalog");
    photographer.forEach((image) => {
        const mediaModel = mediaTemplate(image);
        const mediaDOM = mediaModel.getMediaDOM();
        imagesSection.appendChild(mediaDOM);
    });

}

// display likes and price in price_tag

function displayLikesAndPrice(photographerImages) {
    const price_tag = document.querySelector(".price_tag");
    const likes = document.querySelector(".total_likes");
    const price = document.querySelector(".price");


    console.log(photographerImages.map((image) => image.likes));

    likes.textContent = photographerImages.map((image) => image.likes).reduce((a, b) => a + b, 0);
    price.textContent = photographerImages.map((image) => image.price).reduce((a, b) => a + b, 0) + "€ /jour";

}

// add like on click on heart icon 

function addLike() {
    const heartIcon = document.querySelectorAll(".heart_icon");
    const likes = document.querySelector(".photo_card_likes_number").textContent;

    heartIcon.forEach((icon) => {
        icon.addEventListener("click", () => {
            likes++;
            console.log(likes);
        });
    });

}




// init 

async function init() {


    const { photographer } = await getPhotographer();

    const { photographerImages } = await getImages();

    displayBanner(photographer);
    displayImages(photographerImages);
    displayLikesAndPrice(photographerImages);


}

init()