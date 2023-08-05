let creado = false;

export function chooseStyle(confirmationModalContainer, style) {

    if (!creado) {


        confirmationModalContainer.classList.remove('modal-content');
        confirmationModalContainer.classList.add(style);

        let formatContainer = document.getElementById('formats-container');

        let styleContainer = document.getElementById('styleContainer');
        
        let titleStyle = document.getElementById('titleStyle');
        titleStyle.textContent = 'Info'

        let imagesContainer = document.getElementById('imagesContainer');

        let allImagesInfo = document.createElement('div');
        allImagesInfo.classList.add('all-images');
        allImagesInfo.setAttribute('id', 'images-' + 'info');
        imagesContainer.appendChild(allImagesInfo);

        let urlImagesList = [
            'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975253/media/carousel-images/Ccarrusel_2-P0_beyn0m.png',
            'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975270/media/carousel-images/Ccarrusel_2-P4_zkz1ht.png',
            'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975268/media/carousel-images/Ccarrusel_2-P3_afztie.png',
            'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975267/media/carousel-images/Ccarrusel_2-P2_b2syiw.png',
            'https://res.cloudinary.com/dlqpkf6fd/image/upload/v1690975265/media/carousel-images/Ccarrusel_2-P1_zqy6va.png'
        ]

        for (let i = 0; i < 5; i++) {
            let img = document.createElement('img');
            img.src = urlImagesList[i];
            allImagesInfo.appendChild(img);
        }

        let allImagesBlack = document.createElement('div');
        allImagesBlack.classList.add('all-images');
        allImagesBlack.setAttribute('id', 'images-' + 'black');
        imagesContainer.appendChild(allImagesBlack);

        for (let i = 0; i < 5; i++) {
            let img = document.createElement('img');
            img.src = urlImagesList[i];
            allImagesBlack.appendChild(img);
        }
        creado = true;


    }
}
