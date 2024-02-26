function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    console.log(portrait)
    const picture = `assets/photographers/${portrait}`;

    function getPhotographerCardDOM() {

        const article = document.createElement('article');
        article.setAttribute("class", "photographer_card")
        const redirect = document.createElement('a');
        redirect.setAttribute("href", `photographer.html?id=${data.id}`);
        redirect.setAttribute("class", "photographer_card_link")
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const div = document.createElement('div');
        div.setAttribute("class", "photographer_card_info")
        const pCountry = document.createElement('p');
        pCountry.setAttribute("class", "photographer_card_info_location")
        pCountry.textContent = city + "," + country;
        const pTagline = document.createElement('p');
        pTagline.setAttribute("class", "photographer_card_info_tagline")
        pTagline.textContent = tagline;
        const pPrice = document.createElement('p');
        pPrice.setAttribute("class", "photographer_card_info_price")
        pPrice.textContent = price + "€/jour";


        redirect.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);
        div.appendChild(pCountry);
        div.appendChild(pTagline);
        div.appendChild(pPrice);

        return (redirect);
    }


    return { name, picture, city, country, tagline, price, getPhotographerCardDOM, id }
}

