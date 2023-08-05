let creado = false;

let stylesJSON = {
    styles: [
        {
            title: 'info',
            images: [
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975270/media/carousel-images/Ccarrusel_2-P4_zkz1ht.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975268/media/carousel-images/Ccarrusel_2-P3_afztie.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975267/media/carousel-images/Ccarrusel_2-P2_b2syiw.png',
                'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975265/media/carousel-images/Ccarrusel_2-P1_zqy6va.png'
            ]
        },
        {
            title: 'info2',
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

export function chooseStyle(confirmationModalContainer, style) {

    if (!creado) {
        confirmationModalContainer.classList.remove('modal-content');
        confirmationModalContainer.classList.add(style);

        for (let i = 0; i < stylesJSON.styles.length; i++) {

            let imagesList = stylesJSON.styles[i].images;

            let container = document.getElementById('modalContent');
            
            let formatContainer = document.createElement('div');
            formatContainer.setAttribute('id', 'formatsContainer' + stylesJSON.styles[i].title);
            formatContainer.classList.add('formats-container');
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

            let allImages = document.createElement('div');
            allImages.setAttribute('id', 'allImages' + stylesJSON.styles[i].title);
            allImages.classList.add('all-images');
            imagesContainer.appendChild(allImages);

            for (let i = 0; i < imagesList.length; i++) {
                let img = document.createElement('img');
                img.src = imagesList[i];
                allImages.appendChild(img);
            }


        }
        creado = true;

    }
}
