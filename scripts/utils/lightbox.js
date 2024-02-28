function displayLightbox() {
    const medias = Array.from(document.querySelectorAll(".photo_card_img"));
    const lightboxElement = document.querySelector(".lightbox");
    const lightboxImage = lightboxElement.querySelector(".lightbox_image");
    const lightboxVideo = lightboxElement.querySelector(".lightbox_video");
    const lightboxClose = lightboxElement.querySelector(".lightbox_close");
    const lightboxPrev = lightboxElement.querySelector(".lightbox_prev");
    const lightboxNext = lightboxElement.querySelector(".lightbox_next");
    const lightboxTitle = lightboxElement.querySelector(".lightbox_image_title");

    let currentIndex = 0;

    // Permet de naviguer dans la lightbox avec les flèches du clavier

    function handleArrowKey(e) {
        if (e.key === 'ArrowRight') {
            navigateToNextMedia();
        } else if (e.key === 'ArrowLeft') {
            navigateToPrevMedia();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }

    function navigateToNextMedia() {
        currentIndex = (currentIndex + 1) % medias.length;
        updateLightboxMedia(medias[currentIndex]);
    }

    function navigateToPrevMedia() {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        updateLightboxMedia(medias[currentIndex]);
    }

    // Update la lightbox avec le média donné
    function updateLightboxMedia(media) {
        lightboxTitle.textContent = media.getAttribute("data-title");
        if (media.tagName === 'IMG') {
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxImage.src = media.src;
            lightboxImage.alt = media.getAttribute("data-title");
        } else if (media.tagName === 'VIDEO') {
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';
            lightboxVideo.src = media.src;
            lightboxVideo.alt = media.getAttribute("data-title");
            lightboxVideo.load();
        }
    }

    // Ajoute un écouteur d'événement sur chaque média pour ouvrir la lightbox

    medias.forEach((media, index) => {
        media.addEventListener('click', () => {
            currentIndex = index;
            lightboxElement.classList.add("lightbox_displayed");
            updateLightboxMedia(media);
            document.addEventListener('keydown', handleArrowKey);
        });

        media.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {
                currentIndex = index;
                lightboxElement.classList.add("lightbox_displayed");
                updateLightboxMedia(media);
                document.addEventListener('keydown', handleArrowKey);
            }
        });
    });


    function closeLightbox() {
        lightboxElement.classList.remove("lightbox_displayed");
        document.removeEventListener('keydown', handleArrowKey);
    }

    lightboxNext.onclick = navigateToNextMedia;
    lightboxPrev.onclick = navigateToPrevMedia;
    lightboxClose.onclick = closeLightbox;

}
