import { closeConfirmationModal } from '../helpers.js'
import { BLACK_MARK, TRANSPARENT_MARK, SOLO_POST } from "../utils/styles.js";

let creado = false;

let CARRUSEL = 'Carrusel';
let SOLO = 'Solo';

export let stylesJSON = {
    styles: [
        {
            title: BLACK_MARK,
            type: CARRUSEL,
            post_description: "ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ",
            images: [
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975270/media/carousel-images/Ccarrusel_2-P4_zkz1ht.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975268/media/carousel-images/Ccarrusel_2-P3_afztie.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975267/media/carousel-images/Ccarrusel_2-P2_b2syiw.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975265/media/carousel-images/Ccarrusel_2-P1_zqy6va.png',
            ]
        },
        {
            title: TRANSPARENT_MARK,
            type: CARRUSEL,
            post_description: "ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ",
            images: [

                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1691337682/media/carousel-images/Ccarrusel_4-P0_eqzjaf.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1691337703/media/carousel-images/Ccarrusel_4-P4_zjyecn.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1691337702/media/carousel-images/Ccarrusel_4-P3_ea8pdd.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1691337700/media/carousel-images/Ccarrusel_4-P2_rocw0b.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1691337699/media/carousel-images/Ccarrusel_4-P1_wm8zwr.png'
            ]
        },
        {
            title: SOLO_POST,
            type: SOLO,
            post_description: "ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ",
            images: [
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png'
            ]
        }
    ]
}

// style selected
export function putSelectedStyle() {
    let selectedStyle = localStorage.getItem('selectedStyle');
    if (!selectedStyle) {
        // set default style
        selectedStyle = stylesJSON.styles[0];
        localStorage.setItem('selectedStyle', JSON.stringify(selectedStyle));

    } else {
        selectedStyle = JSON.parse(selectedStyle);
    }

    let styleImagesList = selectedStyle.images;
    let selectedTitleContainer = document.getElementById('titleStyleGenerate');
    let allImagesContainer = document.getElementById('allImagesGenerate');
    let descPostTA = document.getElementById('descPostTA');
    descPostTA.textContent = selectedStyle.post_description;

    selectedTitleContainer.textContent = selectedStyle.title;

    // Limpiar el contenedor antes de agregar las nuevas imágenes
    while (allImagesContainer.firstChild) {
        allImagesContainer.removeChild(allImagesContainer.firstChild);
    }

    allImagesContainer.appendChild(descPostTA)

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
        const selectPost = document.getElementById("selectPost");

        for (let i = 0; i < stylesJSON.styles.length; i++) {


            //if (stylesJSON.styles[i].type === selectPost.value) {

            let imagesList = stylesJSON.styles[i].images;

            let container = document.getElementById('modalContent');

            let formatContainer = document.createElement('div');
            formatContainer.setAttribute('id', 'formatsContainer' + stylesJSON.styles[i].title);
            formatContainer.classList.add('formats-container');
            formatContainer.classList.add('formats-container-modal');
            container.appendChild(formatContainer);

            //
            formatContainer.classList.add(stylesJSON.styles[i].type);
            //
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

            const descCaru = document.createElement('textarea');
            descCaru.classList.add('text-field-mg');
            descCaru.textContent = stylesJSON.styles[i].post_description;
            descCaru.readOnly = true;
            allImages.appendChild(descCaru);

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
            //}


        }
        creado = true;

    }

    const selectPost = document.getElementById("selectPost");

    selectPost.value = localStorage.getItem('modal-style-type');

    // Agrega un event listener para el evento "change"
    const changeEvent = new Event('change', { bubbles: true });
    
    selectPost.addEventListener("change", function () {
        const selectedValue = selectPost.value;
        console.log(selectedValue);

        if (selectedValue === 'Solo') {
            localStorage.setItem('modal-style-type', 'Solo');
            console.log("Dentro de solo");
            // esconder los type Carrusel
            // Obtén una referencia al contenedor 'formatContainer' por su ID o de alguna otra manera
            const selectButtonblackMark = document.getElementById('modalContent');

            if (selectButtonblackMark) {
                // Encuentra todos los elementos con la clase 'Carrusel' dentro del contenedor
                const carruselElements = selectButtonblackMark.getElementsByClassName('Carrusel');
                const soloElements = selectButtonblackMark.getElementsByClassName('Solo');

                console.log(carruselElements);

                // Itera sobre los elementos y establece su estilo 'display' en 'none'
                for (let i = 0; i < carruselElements.length; i++) {
                    carruselElements[i].style.display = 'none';
                }

                for (let i = 0; i < soloElements.length; i++) {
                    soloElements[i].style.display = 'block';
                }

            }



        } else if (selectedValue === 'Carrusel') {
            localStorage.setItem('modal-style-type', 'Carrusel');
            console.log("Dentro de carrusel");
            // esconder los type Carrusel
            // Obtén una referencia al contenedor 'formatContainer' por su ID o de alguna otra manera
            const selectButtonblackMark = document.getElementById('modalContent');

            if (selectButtonblackMark) {

                // Encuentra todos los elementos con la clase 'Carrusel' dentro del contenedor
                const carruselElements = selectButtonblackMark.getElementsByClassName('Carrusel');
                const soloElements = selectButtonblackMark.getElementsByClassName('Solo');

                console.log(soloElements);
                // Itera sobre los elementos y establece su estilo 'display' en 'none'
                for (let i = 0; i < carruselElements.length; i++) {
                    carruselElements[i].style.display = 'block';
                }

                for (let i = 0; i < soloElements.length; i++) {
                    soloElements[i].style.display = 'none';
                }

            }
        }
    });

    selectPost.dispatchEvent(changeEvent);
}

