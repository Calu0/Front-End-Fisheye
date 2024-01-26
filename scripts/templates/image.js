function mediaTemplate(data) {

    const { id, photographerId, image, video, title, likes, date, price } = data;


    const photo = `../../assets/media/${image}`;
    const videoSrc = `../../assets/media/${video}`;

    function getMediaDOM() {


        const article = document.createElement('article');
        article.setAttribute("class", "photo_card")

        // check if the media is a photo or a video and return the correct element in the DOM

        if (image) {
            const imgPhoto = document.createElement('img');
            imgPhoto.setAttribute("class", "photo_card_img")
            imgPhoto.setAttribute("src", photo);
            article.appendChild(imgPhoto);
        }
        else {
            const video = document.createElement('video');
            video.setAttribute("class", "photo_card_img")
            video.setAttribute("src", videoSrc);
            article.appendChild(video);
        }

        const divContent = document.createElement('div');
        divContent.setAttribute("class", "photo_card_content")
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        const divLikes = document.createElement('div');
        divLikes.setAttribute("class", "photo_card_likes")
        const pLikes = document.createElement('div');
        pLikes.setAttribute("class", "photo_card_likes_number")
        pLikes.textContent = likes;
        const icon = document.createElement('img');
        icon.setAttribute("class", "heart_icon");
        icon.setAttribute("src", "../../assets/icons/heart.svg");



        article.appendChild(divContent);
        divContent.appendChild(h2Title);
        divContent.appendChild(divLikes);
        divLikes.appendChild(pLikes);
        divLikes.appendChild(icon);
        console.log(article);
        return (article);

    }

    return { id, photographerId, title, image, likes, date, price, getMediaDOM }

}