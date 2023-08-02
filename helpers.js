// helpers.js

// Global variables
let switchCounter = 1;
let canvases = [];
let canvasSets = [];
let selectedCanvas;
let previousCanvas;
let selectedObject;
let selectedText;
let myCanvas;
let imagesList = [];
let canvasData;
let contador = 1;
let fabricTextIG;
let modoEdicionIsActive = false;
let canvasDataWithCanvasFirst = [];
let addedCanvas = false;
let imagesDataFront = [];
let promptInput;
let valuePromptInput;
let canvasesSelected;
let allCanvas = [];
let allObjects = [];
let deselectCanvas = false;
let checkboxSelectCarouselList = [];
let numberOfCarrus;
let loadingGenerations = false;
let carruselUnpublished = [];
var confirmationModal = document.getElementById("confirmationModal");
var confirmationModalTitle = document.getElementById("confirmationModalTitle");
var confirmationModalContent = document.getElementById("confirmationModalContent");
var confirmationAction;

export function isSelectedCanvas() {
    return !!selectedCanvas
}

// Función para cerrar el modal de confirmación
export function closeConfirmationModal() {
    confirmationModal.style.display = "none";
}

// Función que se ejecuta al confirmar la acción
export function confirmAction() {
    if (typeof confirmationAction === "function") {
        confirmationAction(); // Ejecutar la función almacenada al confirmar
    }
    closeConfirmationModal();
}

// Función para eliminar el objeto del canvas de la lista allObjects
function deleteObjectFromAllObjects(canvasToDelete) {
    allObjects = allObjects.filter((obj) => obj.canvas !== canvasToDelete);
}

// Función para abrir el modal de confirmación y configurar su contenido
export function showConfirmationModal(title, content, actionFunction) {
    confirmationModalTitle.textContent = title;
    confirmationModalContent.textContent = content;
    confirmationAction = actionFunction; // Almacenar la función a ejecutar al confirmar
    confirmationModal.style.display = "block";
}

export function deleteCanvas() {

    // Buscar el contenedor con la clase "canvas-selected"
    var parentContainer = document.querySelector('.canvas-selected');
    var canvasHTML = selectedCanvas.lowerCanvasEl;

    // Verificar si el contenedor existe y tiene un padre
    if (parentContainer && parentContainer.parentNode) {
        // Buscar el contenedor abuelo 'big-container'
        var bigContainerX = canvasHTML.closest('.big-container');

        // Eliminar el contenedor del DOM
        parentContainer.parentNode.removeChild(parentContainer);

        // Verificar si el contenedor abuelo 'big-container' todavía tiene canvas adentro
        var canvasInsideBigContainer = bigContainerX.querySelectorAll('canvas');

        if (canvasInsideBigContainer.length === 0) {
            // Si no tiene canvas adentro, eliminar el contenedor 'big-container'
            bigContainerX.parentNode.removeChild(bigContainerX);
            console.log("El contenedor 'big-container' ha sido eliminado.");

            // actualizar publicar(x)
            numberOfCarrus--;
            updateAdditionalText(numberOfCarrus)
            // si llega a 0, desactivar el boton "publicar" y recargar la pagina
            if (numberOfCarrus === 0) {
                location.reload();
            }
        }
    }

    canvases = canvases.filter((canvasObj) => canvasObj.canvas !== selectedCanvas);
    console.log(canvases)

    deleteObjectFromAllObjects(selectedCanvas);
    // Establecer selectedCanvas en null para eliminar la referencia al elemento canvas
    selectedCanvas = null;
}


function updateAdditionalText(numberOfCarrus) {
    const additionalText = `Publicar (${numberOfCarrus})`;
    // Aquí puedes usar additionalText como desees, por ejemplo, asignarlo a un elemento en el DOM
    // Por ejemplo:
    const publishButton = document.getElementById('save-image-button');
    publishButton.textContent = additionalText;
}

function handlePublish(switchInput) {

    let switchId = switchInput.id;
    let carruselNumber = +switchId.match(/\d+$/)[0];

    let containerDiv = switchInput.closest('.big-container');

    let saveImageButton = document.getElementById('save-image-button');

    if (switchInput.checked) {
        console.log('Switch seleccionado');
        // aquí acceder a los canvas correspondientes para re-agregarlos a todos lados (si es que ya no lo estaban)
        containerDiv.style.opacity = '1';
        let index = carruselUnpublished.indexOf(carruselNumber);
        if (index !== -1) {
            // Si el switchId está en el array, eliminarlo
            carruselUnpublished.splice(index, 1);
            updateAdditionalText(numberOfCarrus - carruselUnpublished.length);


        }

    } else {
        console.log('Switch deseleccionado');
        containerDiv.style.opacity = '0.4';
        carruselUnpublished.push(carruselNumber);
        updateAdditionalText(numberOfCarrus - carruselUnpublished.length);



    }

    saveImageButton.classList.toggle("disabled-button", carruselUnpublished.length === numberOfCarrus);
    console.log(carruselUnpublished)
}


export function deselectAllCanvas(canvasContainerOp) {

    let checkbox = document.getElementById('checkbox-input');
    if (checkbox.checked) {
        checkbox.checked = false;
        canvasContainerOp.style.opacity = 1;
    }
}

export function deselectableAllCanvas(canvasContainerOp) {

    canvasContainerOp.style.opacity = 1;

    deselectCanvas = true;

    if (selectedCanvas?.wrapperEl.classList.contains('canvas-selected')) {
        selectedCanvas.wrapperEl.classList.remove('canvas-selected');
    }

    if (selectedCanvas) {
        selectedCanvas.discardActiveObject();
    }

    allObjects.forEach((object) => {
        // Desactivar la propiedad 'selectable' para todos los objetos
        object.set('selectable', false);

        /* Restaurar la propiedad 'selectable' a true solo para objetos de texto
        if (object instanceof fabric.Textbox) {
          object.set('selectable', true);
          
        }*/
    });



    allCanvas.forEach((canvas) => {
        canvas.renderAll();
    })

    return deselectCanvas;

}

export function toggleClickedStyle(element, value, option) {

    var canvasContainerOp = document.getElementById('canvasContainer');

    const elementId = element.id; // Obtener el ID del elemento

    let checkbox = document.getElementById(elementId);

    if (!checkbox.checked) {


        return;
    } else {


        //deselectableAllCanvas(canvasContainerOp);
        //element.classList.add('clicked');

        const bigContainer = element.closest('.big-container');
        const bigContainerId = bigContainer.getAttribute('id');
        const containerNum = parseInt(bigContainerId.split('_')[1]);

        const filteredCanvases = canvases.filter(item => item.num_carrusel === 'carrusel_' + containerNum);

        // bloquear todos los canvitas pero los filtered dejarlos en opacidad 1

        filteredCanvases.forEach((canvas) => {
            let currentCanvas = canvas.canvas

            const objects = currentCanvas.getObjects();

            objects.forEach(object => {
                if (object instanceof fabric.Textbox && object.customProperty !== 'IgUser') {

                    if (option === "color") {
                        object.set('fill', value);
                    } else if (option === "font") {
                        object.set('fontFamily', value);
                    } else if (option === "bold") {
                        object.set('fontWeight', object.get('fontWeight') === 'bold' ? 'normal' : 'bold');
                    } else if (option === "border") {

                        let strokeWidth = object.get('strokeWidth');
                        object.set('strokeWidth', strokeWidth !== 1 ? 1 : 1.3);
                        object.set('stroke', strokeWidth === 1 ? 'black' : '');
                    } else if (option === "deleteText") {
                        console.log("borrando texto")

                        currentCanvas.remove(object);


                    } else {
                        console.log("done");
                    }


                }

            });
            currentCanvas.renderAll();

        })

    }
}

export function iniciarBloqueadoMenuEdicion() {
    deselectCanvas = true;

    if (selectedCanvas?.wrapperEl.classList.contains('canvas-selected')) {
        selectedCanvas.wrapperEl.classList.remove('canvas-selected');
    }

    if (selectedCanvas) {
        selectedCanvas.discardActiveObject();
    }

    allObjects.forEach((object) => {
        object.set('selectable', false);
    });
}

export function activarCanvas() {
    deselectCanvas = false;
    allObjects.forEach((object) => {

        object.set('selectable', true);
    });
}

export function reloadGenerate() {

    // desaperecer botones edicion y publicar y reaparecerlos luego del timeout
    switchCounter = 0;
    canvases = [];
    canvasSets = [];
    selectedCanvas;
    previousCanvas;
    selectedObject;
    selectedText;
    myCanvas;
    imagesList = [];
    canvasData;
    contador = 1;
    fabricTextIG;
    modoEdicionIsActive = false;
    canvasDataWithCanvasFirst = [];
    addedCanvas = false;
    imagesDataFront = [];
    promptInput;
    valuePromptInput;
    canvasesSelected;
    allCanvas = [];
    allObjects = [];
    deselectCanvas = false;
    checkboxSelectCarouselList = [];
    numberOfCarrus;

    // generar -> borrar anterior (recargar todo como si fuera de nuevo)
    const imageContainerX = document.getElementById('imageContainer');

    const canvasContainerXX = document.getElementById('canvasContainer');

    const imageListUl = document.getElementById('imageList');


    imageContainerX.textContent = '';
    canvasContainerXX.textContent = '';
    imageListUl.textContent = '';

    numberOfCarrus = 0;
    updateAdditionalText(numberOfCarrus);

}

var sleepES5 = function (ms) {
    var esperarHasta = new Date().getTime() + ms;
    while (new Date().getTime() < esperarHasta) continue;
}


export function generateImage() {

    console.log("loading...")
    // hacer cositas cuando esté cargando...
    loadingGenerations = true;

    // desaparecer anterior container
    let containerInputMenu = document.getElementById("container-content");
    containerInputMenu.style.display = 'none';

    // LOADING SKELETON


    setTimeout(() => {
        // SACAR LOADING SKELETON
        console.log("loaded")


        iniciarBloqueadoMenuEdicion();

        // agradar footer
        let footer = document.getElementById("footer");
        footer.style.display = 'inline-flex';


        promptInput = document.getElementById("prompt-input");

        // Obtener el valor del input
        valuePromptInput = promptInput.value;

        // poner el menu abajo
        let menuCanvas = document.getElementById('menu-canvas');
        menuCanvas.style.display = 'flex';


        // Obtener el valor del input de formato
        let formatSelect = document.getElementById('formatSelect');
        let format = parseInt(formatSelect.value);

        let access_token_g = localStorage.getItem('access');

        axios.post('https://mikai.onrender.com/image-generation/generate', {
            subject: JSON.stringify({
                subject: valuePromptInput
            })
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(access_token_g)
            }
        })
            .then(response => {

                if (response.status === 200) {

                    // Si el estado de la respuesta es 200, continúa con el programa
                    console.log("ok!")
                } else if (response.statusText === 'Unauthorized') {
                    logoutUser();
                    console.log("Unauthorized")
                }
                else {
                    // Si el estado no es 200, muestra un mensaje de error o realiza alguna acción adecuada
                    console.log("err")
                }
                const data = response.data;
                console.log(data)

                // SABER CUANTOS CARRUS SON Y AGREGARLO A "PUBLICAR (4)"
                numberOfCarrus = Object.keys(data.gpt_response).length;
                updateAdditionalText(numberOfCarrus);
                //

                let imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';

                data.image_generated.forEach((image, index) => {

                    let imgElement = document.createElement('img');
                    imgElement.src = image.image

                    imgElement.onload = function () {
                        let canvasContainer = document.getElementById('canvasContainer');
                        let canvasElement = document.createElement('canvas');
                        let containerCE = document.createElement('div');
                        containerCE.classList.add('big-container');
                        containerCE.setAttribute('id', 'big-container_' + contador);


                        canvasElement.id = 'canvas-' + index;


                        containerCE.appendChild(canvasElement);

                        let selectThisCarru = document.createElement('input');
                        selectThisCarru.type = 'checkbox';
                        selectThisCarru.classList.add('select-this-carru');
                        selectThisCarru.setAttribute('id', 'miParrafo' + contador);

                        // Crea el elemento label
                        let labelElement = document.createElement('label');

                        // Establece la propiedad 'for' del label para que coincida con el atributo 'id' del input
                        labelElement.setAttribute('for', 'miParrafo' + contador);

                        // Agrega el texto que deseas mostrar en el label
                        labelElement.innerText = 'Select this carrousel';

                        let descriptionTitle = document.createElement('P');
                        descriptionTitle.textContent = 'Description'



                        // Agregar un evento de clic al párrafo
                        /*
                        selectThisCarru.addEventListener('click', function() {
                            // Cambiar el estilo cuando el párrafo es clickeado
                            if (selectThisCarru.classList.contains('clicked')) {
                                selectThisCarru.classList.remove('clicked');
                            } else {
                                selectThisCarru.classList.add('clicked');
                            }
                        });
                        */

                        /*
                        selectThisCarru.addEventListener('click', function() {
                            toggleClickedStyle(selectThisCarru)
                        })
                        */


                        canvasContainer.appendChild(containerCE);



                        let canvasWidth = imgElement.width;
                        let canvasHeight = imgElement.height;

                        let canvasFirst = new fabric.Canvas('canvas-' + index, {
                            width: canvasWidth,
                            height: canvasHeight
                        });


                        //canvases[index] = canvas;
                        console.log(data.gpt_response)
                        let actualImg = imgElement.src;
                        imagesList.push(actualImg)

                        let idea_actual = "idea" + (index + 1);
                        let front_image_text = data.gpt_response[idea_actual].image_text;

                        let image_description = data.gpt_response[idea_actual].image_description

                        imagesDataFront.push({ image_description: image_description })


                        // Crear un campo de texto de 250x250
                        // Crear un campo de texto de 250x250
                        let textField = document.createElement('textarea');
                        textField.classList.add('text-field');
                        textField.rows = 8; // Establecer el número de filas
                        textField.cols = 30; // Establecer el número de columnas
                        textField.value = image_description; // Establecer el contenido del campo de texto

                        let canvasDiv = document.createElement('div');
                        canvasDiv.classList.add('text-field-container');
                        containerCE.appendChild(canvasDiv);


                        // Añadir el campo de texto al contenedor div
                        let containerFirst = document.createElement('div');
                        containerFirst.classList.add('containerFirst');


                        //containerFirst.appendChild(selectThisCarru);
                        //containerFirst.appendChild(labelElement);
                        let containerDesc = document.createElement('div');
                        containerDesc.classList.add('containerDesc');

                        containerDesc.appendChild(textField);

                        containerDesc.appendChild(descriptionTitle);

                        // date time
                        let containerDatetime = document.createElement('div');
                        containerDatetime.classList.add('containerDatetime');
                        let datetimeTitle = document.createElement('P');
                        datetimeTitle.textContent = 'Fecha de publicación'

                        let datetimeInput = document.createElement('input');
                        datetimeInput.type = 'date'
                        datetimeInput.value = "2023-06-23" // que sea + un día por cada publicación (ver como hacerlo)
                        containerDatetime.appendChild(datetimeInput);
                        containerDatetime.appendChild(datetimeTitle);
                        //

                        // Crear el label para el switch
                        // Crear el contenedor principal del switch
                        const switchContainer = document.createElement('div');
                        switchContainer.classList.add('switch-container');

                        // Crear el input (checkbox) para el switch
                        const switchInput = document.createElement('input');
                        switchInput.type = 'checkbox';
                        switchInput.name = 'checkbox-publish';
                        switchInput.classList.add('checkbox-publish');
                        switchInput.id = 'checkbox-publish' + switchCounter;
                        switchInput.checked = true; // Por defecto, activado

                        const selectedText = document.createElement('label');
                        selectedText.htmlFor = switchInput.id;
                        selectedText.textContent = 'Publicar';
                        selectedText.classList.add('switch-label-text');

                        switchCounter++;


                        switchContainer.appendChild(selectedText);
                        switchContainer.appendChild(switchInput);

                        // Agregar el contenedor switchContainer al contenedor canvasDiv
                        canvasDiv.appendChild(switchContainer);

                        switchInput.addEventListener('click', () => handlePublish(switchInput))

                        // datetime
                        canvasDiv.appendChild(containerDatetime);
                        canvasDiv.appendChild(containerFirst);
                        canvasDiv.appendChild(containerDesc);

                        checkboxSelectCarouselList.push(containerFirst);



                        if (!canvasData || canvasData.canvas !== canvasFirst) {

                            canvasData = {
                                num_carrusel: "carrusel_" + contador,
                                image_position: 0,
                                canvas: canvasFirst,
                                publish: true
                            };



                            // Actualizamos canvasData.canvas para que haga referencia al contenedor en lugar del elemento canvas
                            //canvasData.canvas = container;

                            allCanvas.push(canvasFirst)
                            canvases.push(canvasData);
                            canvasDataWithCanvasFirst.push(canvasData)
                            contador = contador + 1;
                        }


                        configurarCanvas(canvasFirst, actualImg, true, format, front_image_text);

                        // CARRU
                        let canvasContainerDiv = canvasContainer.querySelector('.canvas-container');
                        // Establecer divs al carrusel


                        if (canvasContainer.children.length == 4) {



                            for (let j = 0; j <= 3; j++) {
                                var idea = "idea" + (j + 1)
                                let carrusel_actual = "carrusel_" + (j + 1)

                                //console.log(data.gpt_response[idea])
                                let newCont = document.createElement('div');
                                newCont.classList.add('cont-carrusel');


                                for (let i = 0; i <= 3; i++) {

                                    let carrusel = "carrusel_" + (i + 1)

                                    let image_position = i + 1

                                    let image_text_carru = data.gpt_response[idea][carrusel]

                                    let canv = canvasContainer.children[j];
                                    newCont.classList.add('cont-carrusel');

                                    // reemplazar este div por un canvas 250x250 fondo negro
                                    let canvasElement = document.createElement('canvas');
                                    canvasElement.width = 250;
                                    canvasElement.height = 250;
                                    canvasElement.classList.add('img-carrusel');

                                    canv.appendChild(newCont);
                                    canv.appendChild(canvasElement);

                                    // Configurar el nuevo canvas con fondo negro y texto "holis"
                                    let canvas = new fabric.Canvas(canvasElement, {
                                        width: canvasWidth,
                                        height: canvasHeight
                                    });
                                    //canvases.push(canvas);

                                    // Crear un nuevo objeto canvasData para cada canvas
                                    //canvasData.carrusel.carrus.push(canvas)

                                    canvasData = {
                                        num_carrusel: carrusel_actual,
                                        image_position: image_position,
                                        canvas: canvas,
                                        publish: true
                                    };


                                    //if (i == 0) {
                                    // canvasData.canvas = canvasFirst;
                                    //}
                                    allCanvas.push(canvas)
                                    canvases.push(canvasData);

                                    configurarCanvas(canvas, imagesList[j], false, format, image_text_carru);
                                }

                            }

                        }

                    };



                });
            })

    }, 1000);






}

export function configurarCanvas(canvas, backgroundImageSrc, original, format, image_text_carru) {
    // Limpiar el canvas antes de configurarlo
    canvas.clear();
    let fabricTextD;
    let rect;


    //canvas.setDimensions({ width: 250, height: 250 });

    if (format === 1) {


        if (!original) {
            let canvasRect;

            // Agregar la imagen de fondo con el filtro de desenfoque

            fabric.Image.fromURL(backgroundImageSrc, function (img) {

                img.scaleToWidth(canvas.width);


                img.filters.push(new fabric.Image.filters.Blur({
                    //blur: 0.2 // Valor del desenfoque (0 para sin desenfoque, aumenta para mayor desenfoque)
                }, { crossOrigin: 'Anonymous' }));
                img.applyFilters();
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

                // Agregar el rectángulo negro
                let rect = new fabric.Rect({
                    left: (512 - 360) / 2,   // Posición en X del rectángulo
                    top: (512 - 360) / 2,    // Posición en Y del rectángulo
                    width: 360, // Ancho del rectángulo
                    height: 360,// Altura del rectángulo
                    //rx: 20,
                    //ry: 20,
                    fill: '#121212',
                    selectable: false,
                    evented: false,
                });

                // Crear un círculo
                let photo = new fabric.Circle({
                    left: 236,       // Posición en X del círculo
                    top: 60,        // Posición en Y del círculo
                    radius: 20,     // Radio del círculo (20 en este caso)
                    selectable: false,
                    evented: false,
                    fill: new fabric.Pattern({
                        source: img.getElement(),
                        repeat: 'no-repeat'
                    })
                });

                // Crear un círculo

                let circle = new fabric.Circle({
                    left: 226,       // Posición en X del círculo
                    top: 50,        // Posición en Y del círculo
                    radius: 30,     // Radio del círculo (20 en este caso)
                    selectable: false,
                    evented: false,
                    fill: '#121212',
                });

                canvas.add(rect);
                canvas.add(circle);
                canvas.add(photo);
                rect.sendToBack();

            }, { crossOrigin: 'Anonymous' });
            // Agregar el texto "holis"
            fabricTextD = new fabric.Textbox(image_text_carru, {
                left: 90,
                top: 230,
                width: 330,
                fill: 'white',
                fontSize: 40,
                textAlign: 'center',
                textWrapping: 'auto',
                selectable: false,
                //plitByGrapheme: true
            });

            allObjects.push(fabricTextD)

            let numLines = fabricTextD.textLines.length;
            if (numLines >= 3) {
                // Reducir el tamaño del cuadro de texto para que quepa adecuadamente
                fabricTextD.top = 190;
            }

            else if (numLines == 1) {
                // Reducir el tamaño del cuadro de texto para que quepa adecuadamente
                fabricTextD.top = 250;
            }

            else if (numLines == 2) {
                // Reducir el tamaño del cuadro de texto para que quepa adecuadamente
                fabricTextD.top = 210;
            }



            fabricTextIG = new fabric.Textbox('@xShadowx', {
                left: 150,
                top: 120,
                width: 200,
                fill: 'white',
                fontSize: 20,
                fontWeight: 'lighter',
                textAlign: 'center',
                textWrapping: 'auto',
                selectable: false,
                //plitByGrapheme: true
            });

            fabricTextIG.customProperty = 'IgUser'

            allObjects.push(fabricTextIG)

            canvas.add(fabricTextD);
            canvas.add(fabricTextIG);
        } else {
            // Agregar la imagen de fondo sin filtro de desenfoque
            fabric.Image.fromURL(backgroundImageSrc, function (img) {


                img.scaleToWidth(canvas.width);

                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));


                // Crear un degradado lineal desde abajo hasta arriba
                let gradient = new fabric.Gradient({
                    type: 'linear',
                    coords: { x1: 0, y1: 0, x2: 0, y2: 50 }, // Definir las coordenadas del gradiente
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 0, 0, 0)' }, // Punto de inicio del gradiente (negro)
                        { offset: 1, color: 'rgba(0, 0, 0, 0.3)' }  // Punto final del gradiente (blanco)
                    ]
                });

                // Agregar el rectángulo negro
                let rect = new fabric.Rect({
                    top: 512 - 135,
                    width: 512, // Ancho del rectángulo
                    height: 135,// Altura del rectángulo
                    fill: gradient, // Color de relleno del rectángulo (negro)
                    selectable: false,
                    evented: false,
                });

                canvas.add(rect);
                rect.sendToBack();
            }, { crossOrigin: 'Anonymous' });
            // Agregar el texto "holis"
            fabricTextD = new fabric.Textbox(image_text_carru, {
                left: 19,
                top: 370,
                width: 470,
                fill: 'white',
                fontSize: 60,
                textAlign: 'center',
                textWrapping: 'auto',
                selectable: false,
            });
            allObjects.push(fabricTextD)

            let numLines = fabricTextD.textLines.length;
            if (numLines == 3) {
                // Reducir el tamaño del cuadro de texto para que quepa adecuadamente
                fabricTextD.fontSize = 40;
                fabricTextD.top = 400;

            }

            else if (numLines == 2) {
                fabricTextD.fontSize = 40;
                fabricTextD.top = 400;
            }

            else if (numLines == 1) {
                // Reducir el tamaño del cuadro de texto para que quepa adecuadamente
                fabricTextD.top = 400;
            }

            else if (numLines > 3) {
                // Reducir el tamaño del cuadro de texto para que quepa adecuadamente
                fabricTextD.fontSize = 40;
                fabricTextD.top = 340;
            }

            canvas.add(fabricTextD);

        }
    }


    else if (format === 2) {

        if (!original) {
            let canvasRect;

            // Agregar la imagen de fondo con el filtro de desenfoque

            fabric.Image.fromURL(backgroundImageSrc, function (img) {

                img.scaleToWidth(canvas.width);

                img.filters.push(new fabric.Image.filters.Blur({
                    //blur: 0.2 // Valor del desenfoque (0 para sin desenfoque, aumenta para mayor desenfoque)
                }, { crossOrigin: 'Anonymous' }));
                img.applyFilters();
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

                // Agregar el rectángulo negro
                let rect = new fabric.Rect({
                    left: 0,   // Posición en X del rectángulo
                    top: 0,    // Posición en Y del rectángulo
                    width: 250, // Ancho del rectángulo
                    height: 250,// Altura del rectángulo
                    //rx: 20,
                    //ry: 20,
                    fill: 'rgba(18, 18, 18, 0.4)',
                    selectable: false,
                    evented: false,
                });

                let marco = new fabric.Rect({
                    left: 35,   // Posición en X del rectángulo
                    top: 35,    // Posición en Y del rectángulo
                    width: 180, // Ancho del rectángulo
                    height: 180,// Altura del rectángulo
                    //rx: 20,
                    //ry: 20,
                    fill: 'transparent',
                    stroke: 'white',      // Color de borde blanco
                    strokeWidth: 1,
                    selectable: false,
                    evented: false,
                });

                // Crear un circulo foto perfil
                let photo = new fabric.Circle({
                    left: 105,       // Posición en X del círculo
                    top: 25,        // Posición en Y del círculo
                    radius: 15,     // Radio del círculo (20 en este caso)
                    selectable: false,
                    evented: false,
                    fill: new fabric.Pattern({
                        source: img.getElement(),
                        repeat: 'no-repeat'
                    })
                });

                // Crear un círculo

                let circle = new fabric.Circle({
                    left: 100,       // Posición en X del círculo
                    top: 20,        // Posición en Y del círculo
                    radius: 20,     // Radio del círculo (20 en este caso)
                    selectable: false,
                    evented: false,
                    fill: '#121212',
                });

                canvas.add(rect);
                canvas.add(marco);
                //canvas.add(circle);
                //canvas.add(photo);
                rect.sendToBack();

            }, { crossOrigin: 'Anonymous' });
            // Agregar el texto "holis"
            fabricTextD = new fabric.Textbox('Las leyendas son leyendas, porque representan eso.', {
                left: canvas.width - 215,
                top: canvas.height - 160,
                width: 180,
                fill: 'white',
                fontSize: 18,
                textAlign: 'center',
                textWrapping: 'auto',
                //plitByGrapheme: true
            });
            fabricTextIG = new fabric.Textbox('@xShadowx', {
                left: 30,
                top: 230,
                width: 180,
                fill: 'white',
                fontSize: 10,
                fontWeight: 'lighter',
                textAlign: 'center',
                textWrapping: 'auto',
                //plitByGrapheme: true
            });

            canvas.add(fabricTextD);
            canvas.add(fabricTextIG);
        } else {
            // Agregar la imagen de fondo sin filtro de desenfoque
            fabric.Image.fromURL(backgroundImageSrc, function (img) {

                img.scaleToWidth(canvas.width);

                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));


                // Crear un degradado lineal desde abajo hasta arriba
                let gradient = new fabric.Gradient({
                    type: 'linear',
                    coords: { x1: 0, y1: 0, x2: 0, y2: 50 }, // Definir las coordenadas del gradiente
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 0, 0, 0)' }, // Punto de inicio del gradiente (negro)
                        { offset: 1, color: 'rgba(0, 0, 0, 0.8)' }  // Punto final del gradiente (blanco)
                    ]
                });

                // Agregar el rectángulo negro
                let rect = new fabric.Rect({
                    top: canvas.height - 90,
                    width: 250, // Ancho del rectángulo
                    height: 90,// Altura del rectángulo
                    fill: gradient, // Color de relleno del rectángulo (negro)
                    selectable: false,
                    evented: false,
                });

                canvas.add(rect);
                rect.sendToBack();
            }, { crossOrigin: 'Anonymous' });
            // Agregar el texto "holis"
            fabricTextD = new fabric.Textbox('Las leyendas son leyendas, porque representan eso.', {
                left: canvas.width - 240,
                top: canvas.height - 80,
                width: 230,
                fill: 'white',
                fontSize: 20,
                textAlign: 'center',
                textWrapping: 'auto'
            });
            canvas.add(fabricTextD);

        }
    }


    fabricTextD.on('selected', function (options) {


        if (selectedCanvas !== options.target.canvas) {
            //console.log(selectedCanvas)
            //console.log(options.target.canvas)
        }

        if (selectedCanvas && selectedCanvas.wrapperEl.classList.contains('canvas-selected')) {
            if (selectedCanvas !== options.target.canvas) {
                selectedCanvas.discardActiveObject();

                selectedCanvas.wrapperEl.classList.remove('canvas-selected');
                selectedCanvas.renderAll();
            }
        }




        if (selectedObject) {
            if (selectedCanvas !== options.target.canvas) {
                selectedCanvas.discardActiveObject();

                selectedCanvas.wrapperEl.classList.remove('canvas-selected');
                selectedCanvas.renderAll();
                //selectedObject = null; // Reiniciar la variable selectedObject
            }

        }

        selectedObject = options.target;
        selectedCanvas = canvas;
        //selectedCanvas.renderAll()
    });

    // Agregar event listener para el evento 'input' del colorPicker
    let colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('input', changeTextColor);


    // Agregar event listener para el evento 'change' del fontSelect
    let fontSelect = document.getElementById('fontSelect');
    fontSelect.addEventListener('change', changeTextFont);





    canvas.on('mouse:down', function (options) {
        if (selectedCanvas && selectedCanvas !== canvas) {
            // Si hay un canvas previamente seleccionado y es diferente al actual:
            selectedCanvas.discardActiveObject();
            selectedCanvas.wrapperEl.classList.remove('canvas-selected');
            selectedCanvas.renderAll();
        }
        selectedCanvas = canvas;
        let canvasElement = selectedCanvas.lowerCanvasEl;

        if (!deselectCanvas) {
            selectedCanvas.wrapperEl.classList.add('canvas-selected'); // Agrega la clase CSS para resaltar el lienzo seleccionado
        }



        // BORRAR SELECCIÓN UNA VEZ QUE SE DESELECCIONA UN TEXT
        fabricTextD?.on('deselected', function () {
            //console.log("des")
            //console.log("aquí1")
            //fabricTextD = null;
            //selectedObject = null;
        });

        selectedObject?.on('deselected', function () {

            fabricTextD = null;
            selectedObject = null;
        });


    });
}

function changeTextColorAll(object) {
    let colorPicker = document.getElementById('colorPicker');
    let selectedColor = colorPicker.value;

    object.set('fill', selectedColor);
}



export function reactivarCanvas() {

    document.getElementById('add-text-button').classList.remove("disabled-button");
    var canvasContainerOp = document.getElementById('canvasContainer')
    canvasContainerOp.style.opacity = 1;
    deselectCanvas = false;
    allObjects.forEach((object) => {
        object.set('selectable', true);
    });
}

export function selectAllCanvas(value, option) {

    // quitar visibilidad de 'agregar texto'


    // si selectAllCarru esta seleccionado, deseleccionarlo

    var canvasContainerOp = document.getElementById('canvasContainer')
    // bloquear interactividad en todos los canvas

    // deseleccionar todos los objetos anteriores
    // si se selecciona un objeto, 'all canvas selected' se destilda
    let checkbox = document.getElementById('checkbox-input');
    if (!checkbox.checked) {

        document.getElementById('add-text-button').classList.remove("disabled-button");
        document.getElementById('delete-canvas').classList.remove("disabled-button");
        reactivarCanvas();

        return; // Salir de la función si el checkbox no está marcado
    }

    document.getElementById('add-text-button').classList.add("disabled-button");
    document.getElementById('delete-canvas').classList.add("disabled-button");

    deselectableAllCanvas(canvasContainerOp);
    //deselectAllCanvas(canvasContainerOp);


    selectedObject = null;

    //fabricTextD = null;

    // cambiar opacidad a todo el div

    canvasContainerOp.style.opacity = 0.8;


    allObjects.forEach((object) => {
        if (object instanceof fabric.Textbox && object.customProperty !== 'IgUser') {
            if (option === "color") {
                object.set('fill', value);
            } else if (option === "font") {
                object.set('fontFamily', value);
            } else if (option === "bold") {
                object.set('fontWeight', object.get('fontWeight') === 'bold' ? 'normal' : 'bold');
            } else if (option === "border") {
                let strokeWidth = object.get('strokeWidth');
                object.set('strokeWidth', strokeWidth !== 1 ? 1 : 1.3);
                object.set('stroke', strokeWidth === 1 ? 'black' : '');

            } else if (option === "deleteText") {
                object.set('visible', false)
            }
            else {
                console.log("done");
            }

            //object.canvas.renderAll(); // Renderizar el canvas después de aplicar los cambios
        }
    });
    allCanvas.forEach((canvas) => {
        canvas.renderAll();
    })


}


export function addText() {
    let textInput = document.getElementById('textInput');
    let text = textInput.value;
    let colorPicker = document.getElementById('colorPicker');
    let selectedColor = colorPicker.value;
    let fontSelect = document.getElementById('fontSelect');
    let selectedFont = fontSelect.value;
    fontSelect.addEventListener('change', changeTextFont);

    if (selectedCanvas && selectedCanvas.wrapperEl.classList.contains('canvas-selected')) {

        let fabricText = new fabric.Textbox(text, {
            left: 10,
            top: 10,
            fill: selectedColor,
            fontSize: 30,
            fontFamily: selectedFont
        });
        selectedCanvas.add(fabricText);

        allObjects.push(fabricText)

        fabricText.on('selected', function (options) {

            if (selectedCanvas !== options.target.canvas) {
                selectedCanvas.discardActiveObject();

                selectedCanvas.wrapperEl.classList.remove('canvas-selected');
                selectedCanvas.renderAll();
            }

            selectedObject = options.target;
            selectedCanvas = selectedObject.canvas;

            // borrar selección anterior si la hay
        });

        selectedCanvas.renderAll(); // Renderiza el lienzo para mostrar el texto agregado
    }
}

export function deleteText() {
    if (selectedObject && selectedCanvas) {
        selectedCanvas.remove(selectedObject);
        selectedCanvas.renderAll();
        allObjects = allObjects.filter(object => object != selectedObject);
        selectedObject = null;
    }
}

export function changeTextFont() {
    if (selectedCanvas && selectedObject) {
        let fontSelect = document.getElementById('fontSelect');
        let selectedFont = fontSelect.value;
        selectedObject.set('fontFamily', selectedFont);
        selectedCanvas.renderAll();
        selectedObject.on('deselected', function () {
            selectedObject = null;
        });
    }
}

export function changeTextColor() {
    if (selectedCanvas && selectedObject) {
        let colorPicker = document.getElementById('colorPicker');
        let selectedColor = colorPicker.value;
        selectedObject.set('fill', selectedColor);



        selectedCanvas.renderAll();

        selectedObject.on('deselected', function () {
            selectedObject = null;
        });
    }

}

export function toggleBold() {
    if (selectedCanvas && selectedObject instanceof fabric.Textbox) {
        let fontWeight = selectedObject.get('fontWeight');
        selectedObject.set('fontWeight', fontWeight === 'bold' ? 'normal' : 'bold');
        selectedCanvas.renderAll();
        selectedObject.on('deselected', function () {
            selectedObject = null;
        });
    }
}

export function toggleBorder() {
    if (selectedCanvas && selectedObject instanceof fabric.Textbox) {
        let strokeWidth = selectedObject.get('strokeWidth');
        selectedObject.set('strokeWidth', strokeWidth !== 1 ? 1 : 1.3);
        selectedObject.set('stroke', strokeWidth === 1 ? 'black' : '');
        selectedCanvas.renderAll();
        selectedObject.on('deselected', function () {
            selectedObject = null;
        });
    }
}

export function getDatetetimeInput() {
    // Obtener todos los elementos con la clase "containerDatetime"
    const containerDatetimeList = document.querySelectorAll('.containerDatetime');

    // Crear un array para almacenar los valores de las fechas
    const fechasPublicacion = [];

    // Iterar sobre cada elemento "containerDatetime"
    containerDatetimeList.forEach(containerDatetime => {
        // Obtener el input de tipo fecha dentro del contenedor actual
        const datetimeInput = containerDatetime.querySelector('input');

        // Obtener el ID del abuelo del datetimeInput
        const abuelo = datetimeInput.closest('[id]');

        const abueloId = abuelo ? abuelo.id : null;

        // Obtener el valor de la fecha del input actual y agregarlo al array
        fechasPublicacion.push({ id: abueloId, fecha: datetimeInput.value });
    });

    // Devolver el array con los IDs y fechas obtenidas
    return fechasPublicacion;
}


export function addPaddingIfNeeded(imageData) {
    let padding = imageData.length % 4;
    if (padding) {
        return imageData + '='.repeat(4 - padding);
    }
    return imageData;
}

export function saveImage() {

    // deshabilitar botón por posibles bugs
    let saveImageButton = document.getElementById("save-image-button");
    // Ocultar el botón
    saveImageButton.classList.add("disabled-button");
    //saveImageButton.disabled = true;

    // datetime
    //let datetimeInputList = getDatetetimeInput();

    // Crear un arreglo para almacenar las imágenes modificadas en base64
    let modifiedImages = [];
    // Recorrer todos los canvas modificados
    canvases.forEach(function (canvasDataDic, index) {

        //let canvasR = canvasDatax.canvas;
        let canvasx = canvasDataDic.canvas;
        // Convertir el contenido del canvas en base64
        let modifiedImageBase64 = canvasx.toDataURL({
            format: 'png', // Puedes cambiar el formato a 'jpeg' si lo deseas
            quality: 0.8 // Puedes ajustar la calidad de la imagen si lo deseas (valor entre 0 y 1)
        });
        // Agregar la imagen base64 al arreglo
        modifiedImages.push({ image: modifiedImageBase64, num_carrusel: canvasDataDic.num_carrusel, image_position: canvasDataDic.image_position });
    });

    // Suponiendo que tienes un array de imágenes codificadas en Base64 llamado "modifiedImages"
    //let cleanedImages = modifiedImages.map(imageData => imageData.replace(/\s/g, ''));
    //let paddedImages = cleanedImages.map(addPaddingIfNeeded);
    let access_token_g = localStorage.getItem('access');

    // Realizar la solicitud POST al backend para guardar las imágenes modificadas
    fetch('https://mikai.onrender.com/image-generation/save_images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(access_token_g)
        },
        body: JSON.stringify({
            images: modifiedImages,
            images_data: imagesDataFront,
            prompt: valuePromptInput,
            // datetime
            //dates: datetimeInputList,
            carruselUnpublished: carruselUnpublished
        })
    })
        .then(response => response.json())
        .then(data => {
            // Aquí puedes realizar alguna acción en caso de que la respuesta sea exitosa
            window.location.href = "/my-generations";
            /*
            console.log('Imágenes modificadas guardadas correctamente.');
            let containerGenerated = document.getElementById("generated-container");
            containerGenerated.innerHTML = '<h1>Imagenes programadas correctamente</h1>';
            */

        })
        .catch(error => {
            console.error('Error al guardar las imágenes modificadas:', error);
        });
}



export function modoEdicion() {

    

    console.log(getDatetetimeInput());

    var canvasContainerOp = document.getElementById('canvasContainer');

    if (!modoEdicionIsActive) {
        activarCanvas();


        checkboxSelectCarouselList.forEach((checkbox) => {

            //checkbox.style.display = 'flex';

        })
        //

        document.getElementById('container-editable').style.display = 'inline-flex';
        document.getElementById('container-editable').style.position = 'fixed';
        modoEdicionIsActive = true;
    } else {

        iniciarBloqueadoMenuEdicion();

        selectedCanvas?.discardActiveObject();
        selectedCanvas?.renderAll();

        checkboxSelectCarouselList.forEach((checkbox) => {


            //checkbox.style.display = 'none';
        })

        document.getElementById('container-editable').style.display = 'none';
        modoEdicionIsActive = false;

    }

}
