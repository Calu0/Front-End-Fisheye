import { getPhotographer } from "../pages/photographer.js";

const modalContainer = document.getElementById("modal_container");


function trapTabKey(e) {
    const focusableElements = modalContainer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else /* tab */ {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}


function displayModal(photographerName) {
    const modalContainer = document.getElementById("modal_container");
    const photographerNameElement = modalContainer.querySelector(".photographer_name");
    photographerNameElement.textContent = photographerName;

    modalContainer.style.display = "flex";
    modalContainer.querySelector('input').focus();
    document.addEventListener('keydown', handleEscapeKey);
    modalContainer.addEventListener('keydown', trapTabKey);

}

function closeModal() {
    const modalContainer = document.getElementById("modal_container");
    modalContainer.style.display = "none";
    document.removeEventListener('keydown', handleEscapeKey);
    modalContainer.removeEventListener('keydown', trapTabKey);
    document.querySelector(".contact_button").focus();
}


// permet de fermer la modale avec la touche echap
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}
function submitForm(e) {
    e.preventDefault();
    const form = document.getElementById("contact_form");

    // Récupération et traitement des valeurs du formulaire
    const formData = new FormData(form);
    const formValues = {};
    for (const [key, value] of formData.entries()) {
        formValues[key] = value;
    }
    console.log(formValues);

    closeModal();
}

document.getElementById("contact_form").addEventListener("submit", submitForm);


// Gestionnaire d'événement pour ouvrir la modale
export function addModalOpenEvent() {
    const contactButton = document.querySelector(".contact_button");
    contactButton.addEventListener("click", () => {

        getPhotographer().then(({ photographer }) => {
            displayModal(photographer.name);
        });
    });
}

// Gestionnaire d'événement pour fermer la modale
export function addModalCloseEvent() {
    const closeModalButton = document.getElementById("close_modal_btn");
    closeModalButton.addEventListener("click", closeModal);
}