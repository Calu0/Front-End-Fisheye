import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {

    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    return ({
        photographers: [...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getPhotographerCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}



async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    console.log(photographers);
    displayData(photographers);
}



init();

