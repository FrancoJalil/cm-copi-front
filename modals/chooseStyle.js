import { closeConfirmationModal } from '../helpers.js'

let creado = false;

export let stylesJSON = {
    styles: [
        {
            title: 'blackMark',
            images: [
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975270/media/carousel-images/Ccarrusel_2-P4_zkz1ht.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975268/media/carousel-images/Ccarrusel_2-P3_afztie.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975267/media/carousel-images/Ccarrusel_2-P2_b2syiw.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975265/media/carousel-images/Ccarrusel_2-P1_zqy6va.png'
            ]
        },
        {
            title: 'transparentMark',
            images: [
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975270/media/carousel-images/Ccarrusel_2-P4_zkz1ht.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975268/media/carousel-images/Ccarrusel_2-P3_afztie.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975267/media/carousel-images/Ccarrusel_2-P2_b2syiw.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975265/media/carousel-images/Ccarrusel_2-P1_zqy6va.png'
            ]
        },
        {
            title: 'info3',
            images: [
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975270/media/carousel-images/Ccarrusel_2-P4_zkz1ht.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975268/media/carousel-images/Ccarrusel_2-P3_afztie.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975267/media/carousel-images/Ccarrusel_2-P2_b2syiw.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975265/media/carousel-images/Ccarrusel_2-P1_zqy6va.png'
            ]
        }
    ]
}

// style selected
export function putSelectedStyle() {
    let selectedStyle = localStorage.getItem('selectedStyle');
    if (!selectedStyle) {

        // set default style
        selectedStyle = stylesJSON.styles[0]

    } else {
        selectedStyle = JSON.parse(selectedStyle);
    }
    
    let styleImagesList = selectedStyle.images;
    let selectedTitleContainer = document.getElementById('titleStyleGenerate');
    let allImagesContainer = document.getElementById('allImagesGenerate');

    selectedTitleContainer.textContent = selectedStyle.title;

    // Limpiar el contenedor antes de agregar las nuevas imágenes
    while (allImagesContainer.firstChild) {
        allImagesContainer.removeChild(allImagesContainer.firstChild);
    }


    for (let i = 0; i < styleImagesList.length; i++) {
        let img = document.createElement('img');
        img.src = styleImagesList[i];
        allImagesContainer.appendChild(img);
    }

    // close modal
    closeConfirmationModal();

}

export function chooseStyleOnClick(styleJSON) {

    localStorage.setItem('selectedStyle', JSON.stringify(styleJSON));
    putSelectedStyle();
}

export function chooseStyle(confirmationModalContainer, style, confirmationModalTitle, confirmationModalContent) {

    if (!creado) {

        document.getElementById('confirm-button-modal').style.display = 'none';
        document.getElementById('cancel-button-modal').textContent = 'X';
        document.getElementById('cancel-button-modal').style.position = 'absolute';

        confirmationModalContainer.classList.remove('modal-content');
        confirmationModalContainer.classList.add(style);

        for (let i = 0; i < stylesJSON.styles.length; i++) {

            let imagesList = stylesJSON.styles[i].images;

            let container = document.getElementById('modalContent');

            let formatContainer = document.createElement('div');
            formatContainer.setAttribute('id', 'formatsContainer' + stylesJSON.styles[i].title);
            formatContainer.classList.add('formats-container');
            formatContainer.classList.add('formats-container-modal');
            container.appendChild(formatContainer);


            let styleContainer = document.createElement('div');
            styleContainer.setAttribute('id', 'styleContainer' + stylesJSON.styles[i].title);
            styleContainer.classList.add('style-container');
            formatContainer.appendChild(styleContainer);

            let titleStyle = document.createElement('h4');
            titleStyle.setAttribute('id', 'titleStyle' + stylesJSON.styles[i].title);
            titleStyle.textContent = stylesJSON.styles[i].title;
            styleContainer.appendChild(titleStyle);

            let imagesContainer = document.createElement('div');
            imagesContainer.setAttribute('id', 'imagesContainer' + stylesJSON.styles[i].title);
            imagesContainer.classList.add('images-container');
            styleContainer.appendChild(imagesContainer);

            let images_button_container = document.createElement('div');
            images_button_container.setAttribute('id', 'images_button_container' + stylesJSON.styles[i].title);
            images_button_container.classList.add('images_button_container');
            styleContainer.appendChild(images_button_container);

            let allImages = document.createElement('div');
            allImages.setAttribute('id', 'allImages' + stylesJSON.styles[i].title);
            allImages.classList.add('all-images');
            images_button_container.appendChild(allImages);

            let selectButton = document.createElement('button');
            formatContainer.setAttribute('id', 'selectButton' + stylesJSON.styles[i].title);
            selectButton.classList.add('select-button');
            selectButton.textContent = 'Select'
            selectButton.addEventListener('click', function () {
                chooseStyleOnClick(stylesJSON.styles[i]);
            });
            images_button_container.appendChild(selectButton);

            for (let i = 0; i < imagesList.length; i++) {
                let img = document.createElement('img');
                img.src = imagesList[i];
                allImages.appendChild(img);
            }


        }
        creado = true;

    }
}

