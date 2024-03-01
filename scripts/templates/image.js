export function mediaTemplate(data) {
    const { id, photographerId, image, video, title, likes, date, price } = data;

    const photo = `../../assets/media/${image}`;
    const videoSrc = `../../assets/media/${video}`;

    function getMediaDOM() {
        const article = document.createElement('article');
        article.setAttribute("class", "photo_card")
        article.setAttribute("aria-label", title);


        // Vérifie si le média est une photo ou une vidéo et retourne l'élément correct dans le DOM
        if (image) {
            const imgPhoto = document.createElement('img');
            imgPhoto.setAttribute("data-title", title);
            imgPhoto.setAttribute("class", "photo_card_img");
            imgPhoto.setAttribute("src", photo);
            imgPhoto.setAttribute("data-id", id);
            imgPhoto.setAttribute("alt", title);
            imgPhoto.setAttribute("data-title", title);
            imgPhoto.setAttribute("tabindex", "0");
            article.appendChild(imgPhoto);
        } else {
            const videoElement = document.createElement('video');
            videoElement.setAttribute("data-title", title);
            videoElement.setAttribute("class", "photo_card_img");
            videoElement.setAttribute("src", videoSrc);
            videoElement.setAttribute("data-id", id);
            videoElement.setAttribute("alt", title);
            article.appendChild(videoElement);
        }

        const divContent = document.createElement('div');
        divContent.setAttribute("class", "photo_card_content");
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        const divLikes = document.createElement('div');
        divLikes.setAttribute("class", "photo_card_likes");
        const pLikes = document.createElement('div');
        pLikes.setAttribute("class", "photo_card_likes_number");
        pLikes.setAttribute("data-id", id);
        pLikes.textContent = likes;
        const icon = document.createElement('img');
        icon.setAttribute("class", "heart_icon");
        icon.setAttribute("alt", "likes");
        icon.setAttribute("data-id", id);
        icon.setAttribute("src", "../../assets/icons/heart.svg");

        article.appendChild(divContent);
        divContent.appendChild(h2Title);
        divContent.appendChild(divLikes);
        divLikes.appendChild(pLikes);
        divLikes.appendChild(icon);

        return article;
    }

    return { id, photographerId, title, image, likes, date, price, getMediaDOM }
}
