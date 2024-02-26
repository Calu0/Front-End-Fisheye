function displayModal(photographerName) {
    const modalContainer = document.getElementById("modal_container");
    const photographerNameElement = modalContainer.querySelector(".photographer_name");
    photographerNameElement.textContent = photographerName;

    modalContainer.style.display = "flex";
    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal() {
    const modalContainer = document.getElementById("modal_container");
    modalContainer.style.display = "none";
    document.removeEventListener('keydown', handleEscapeKey);
}


// allow to close modal with escape key
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

function submitForm() {
    const form = document.getElementById("contact_form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Récupération des valeurs de chaque champ du formulaire
        const formData = new FormData(form);
        const formValues = {};
        for (const [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        console.log(formValues);

        closeModal();
    });
}


// Gestionnaire d'événement pour ouvrir la modale
function addModalOpenEvent() {
    const contactButton = document.querySelector(".contact_button");
    contactButton.addEventListener("click", () => {
        // Appelle getPhotographer pour obtenir les informations du photographe
        getPhotographer().then(({ photographer }) => {
            displayModal(photographer.name);
        });
    });
}

// Gestionnaire d'événement pour fermer la modale
function addModalCloseEvent() {
    const closeModalButton = document.getElementById("close_modal_btn");
    closeModalButton.addEventListener("click", closeModal);
}