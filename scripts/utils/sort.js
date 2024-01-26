function sortByPopularity(photographerImages) {
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

function sortByDate(photographerImages) {
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


function sortByTitle(photographerImages) {
    return photographerImages.sort((a, b) => {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();

        if (titleA < titleB) {
            return -1; // a vient avant b
        }
        if (titleA > titleB) {
            return 1; // a vient après b
        }
        return 0; // a et b sont égaux
    });
}

async function displaySortedImages(sortFunction) {
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
}


