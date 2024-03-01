import { displaySortedImages, sortByDate, sortByPopularity, sortByTitle } from "../utils/sort.js";
import { addModalOpenEvent, addModalCloseEvent } from "../utils/contactForm.js";

let photographerId = new URLSearchParams(window.location.search).get("id");


// Récupère les datas du photographer 

export async function getPhotographer() {

    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    const photographer = photographers.find((photographer) => photographer.id == photographerId);
    return ({
        photographer: { ...photographer }
    })
}

async function displayBanner(photographer) {


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
    portrait.setAttribute("alt", photographer.name);
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

    // Supprime la liste des options existantes
    sortOptions.innerHTML = '';

    // Ajoute de nouvelles options en omettant celle sélectionnée
    allOptions.forEach(option => {
        if (option !== selectedText) {
            const li = document.createElement("li");
            li.textContent = option;
            li.setAttribute("tabindex", "0");
            li.setAttribute("class", "sort_option"); // Assurez-vous que la classe est correcte
            li.addEventListener("click", optionSelected);
            li.addEventListener("keydown", optionSelected);
            sortOptions.appendChild(li);
        }
    });
}


// Gestionnaire d'événements pour les options sélectionnées
function optionSelected(event) {
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
        const selectedText = event.target.textContent;
        sortBtn.textContent = selectedText;
        updateOptions(selectedText);

        if (selectedText === "Popularité") {
            displaySortedImages(sortByPopularity);
        } else if (selectedText === "Date") {
            displaySortedImages(sortByDate);
        } else if (selectedText === "Titre") {
            displaySortedImages(sortByTitle);
        }

        sortOptions.classList.remove("show_sort_options");
    }
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

export async function getImages() {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const images = data.media;
    const photographerImages = images.filter((image) => image.photographerId == photographerId);
    return ({
        photographerImages: [...photographerImages]
    })
}


// affiche les likes et le prix total dans la section price_tag

function displayLikesAndPrice(photographerImages) {

    const likes = document.querySelector(".total_likes");
    const price = document.querySelector(".price");

    likes.textContent = photographerImages.map((image) => image.likes).reduce((a, b) => a + b, 0);
    price.textContent = photographerImages.map((image) => image.price).reduce((a, b) => a + b, 0) + "€ /jour";

}


export function addLikesToImage() {
    const heartIcons = document.querySelectorAll(".heart_icon")

    heartIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            // Mise à jour du nombre de likes pour l'image sélectionnée
            const imageId = icon.getAttribute("data-id");
            const likesDOM = document.querySelector(`.photo_card_likes_number[data-id="${imageId}"]`);
            let likes = likesDOM.textContent;
            likes++;
            likesDOM.textContent = likes;

            // Mise à jour du total des likes
            const totalLikesDOM = document.querySelector(".total_likes");
            let totalLikes = totalLikesDOM.textContent;
            totalLikes++;
            totalLikesDOM.textContent = totalLikes;
        });

        icon.setAttribute("tabindex", "0");
        icon.setAttribute("aria-label", "Ajouter un like");
        icon.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                icon.click();
            }
        });
    });
}


// init 

async function init() {

    const { photographer } = await getPhotographer();
    const { photographerImages } = await getImages();

    displayBanner(photographer);
    displaySortedImages(sortByDate);
    displayLikesAndPrice(photographerImages);

    addModalOpenEvent();
    addModalCloseEvent();
}

init()

