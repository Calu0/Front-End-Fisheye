import { getImages, addLikesToImage, } from '../pages/photographer.js';
import { mediaTemplate } from '../templates/image.js';
import { displayLightbox } from './lightbox.js';

export function sortByPopularity(photographerImages) {
    return photographerImages.sort((a, b) => {
        if (a.likes < b.likes) {
            return 1;
        } else if (a.likes > b.likes) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function sortByDate(photographerImages) {
    return photographerImages.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        } else if (a.date < b.date) {
            return 1;
        } else {
            return 0;
        }
    });
}


export function sortByTitle(photographerImages) {
    return photographerImages.sort((a, b) => {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
}

export async function displaySortedImages(sortFunction) {
    let { photographerImages } = await getImages();

    photographerImages = sortFunction(photographerImages);

    clearAndDisplayImages(photographerImages);
}

function clearAndDisplayImages(images) {
    const imagesSection = document.querySelector(".images-catalog");
    imagesSection.innerHTML = ''; // Efface les images existantes pour afficher les nouvelles

    images.forEach((image) => {
        const mediaModel = mediaTemplate(image);
        const mediaDOM = mediaModel.getMediaDOM();
        imagesSection.appendChild(mediaDOM);
    });

    addLikesToImage();
    displayLightbox();
}


