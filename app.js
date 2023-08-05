// app.js
import { isSelectedCanvas, confirmAction, closeConfirmationModal, generateImage, deselectableAllCanvas, reactivarCanvas, toggleClickedStyle, saveImage, showConfirmationModal, deleteCanvas, modoEdicion, addPaddingIfNeeded, toggleBorder, toggleBold, addText, changeTextColor, changeTextFont, deleteText, selectAllCanvas } from './helpers.js';


// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  let listCheckboxChecked = [];
  let deselectCanvas = false;

  

  const firstForm = document.getElementById("firstInputUser");

  

  firstForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formatIput = firstForm.elements["formatSelect"];
    const promptInput = firstForm.elements["prompt-input"];
    if (formatIput.value.trim() === "" || promptInput.value.trim() === "") {
      // Evitar que el formulario se envíe
      event.preventDefault();
      alert("El campo no puede estar vacío.");
    } else {
      // si el campo está lleno

      // deshabilita el boton 'Generate' para ahorrar bugs
      const generateButton = document.getElementById("generate-button");
      generateButton.classList.add("disabled-button");
      generateImage();
    }
  });


  // Event Listener para el botón "Modo Edición"
  document.getElementById('modo-edicion-button').addEventListener('click', modoEdicion);

  // Event Listener para seleccionar todos los canvas
  document.getElementById('checkbox-input').addEventListener('change', selectAllCanvas);

  // Event Listener para el botón "Publicar"
  document.getElementById('save-image-button').addEventListener('click', saveImage);

  // Event Listener para el botón "Agregar Texto"
  document.getElementById('add-text-button').addEventListener('click', addText);

  // Event Listener para el botón "Borrar Texto"
  document.getElementById('delete-text-button').addEventListener('click', deleteText);

  // Event Listener para el botón "Negrita"
  document.getElementById('toggle-bold-button').addEventListener('click', toggleBold);

  // Event Listener para el botón "Borde"
  document.getElementById('toggle-border-button').addEventListener('click', toggleBorder);

  // Event Listener para el input de color
  document.getElementById('colorPicker').addEventListener('input', changeTextColor);
  
  // Event listener para el choose style
  document.getElementById('chooseStyle').addEventListener('click', () => {
    showConfirmationModal('Elegir estilo', 'Ok?', function () {
      console.log("ok")
  }, 'modal-choose-style');
});

  

  document.getElementById('delete-canvas').addEventListener('click', () => {

    if (!isSelectedCanvas()) {
      
      return false;
    } 

    showConfirmationModal('Borrar Canvas', '¿Estás seguro?', function () {
      deleteCanvas();
    })
  });

  // Event Listener para el evento 'change' del fontSelect
  document.getElementById('fontSelect').addEventListener('change', changeTextFont);

  //
  document.getElementById('checkbox-input').addEventListener('click', (event) => {
    // deseleecionar todos los otros inputs


    listCheckboxChecked.forEach(checkbox => {
      if (checkbox !== event.target) {

        checkbox.checked = false;
        listCheckboxChecked = [];

      }
    });
    if (!listCheckboxChecked.includes(event.target)) {
      listCheckboxChecked.push(event.target);
    }
    //selectAllCanvas;
  });


  //



  //

  const colorPickerX = document.getElementById('colorPicker');
  colorPickerX.addEventListener('change', (event) => {

    const selectedColor = event.target.value;
    selectAllCanvas(selectedColor, "color");
  });

  document.getElementById('canvasContainer').addEventListener('click', function (event) {
    const targetElement = event.target;

    // Verificar si el objetivo (target) es un párrafo (<p>) dentro del contenedorDinamico

    if (targetElement.closest('.big-container') && targetElement.tagName === 'INPUT' && targetElement.type === 'checkbox' && targetElement.className !== 'checkbox-publish') {
      console.log("alo")
      // volver opacidad normal si estaban en 0.8
      var canvasContainerOp = document.getElementById('canvasContainer');

      if (!deselectCanvas) {
        deselectCanvas = deselectableAllCanvas(canvasContainerOp);

      } else {
        reactivarCanvas();
        deselectCanvas = false;
        return;
      }



      if (canvasContainerOp.style.opacity !== '1') {
        reactivarCanvas();
      }

      // si estan en deselected volver a la normalidad


      listCheckboxChecked.forEach(checkbox => {
        if (checkbox !== targetElement) {

          checkbox.checked = false;
          listCheckboxChecked = [];
        }
      });

      // Aquí realizas la acción que desees cuando se hace clic en un párrafo dentro del contenedorDinamico
      document.getElementById('colorPicker').addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        toggleClickedStyle(targetElement, selectedColor, "color");
      });

      document.getElementById('fontSelect').addEventListener('input', (event) => {
        const selectedFont = event.target.value;
        toggleClickedStyle(targetElement, selectedFont, "font");
      });

      document.getElementById('toggle-bold-button').addEventListener('click', (event) => {
        toggleClickedStyle(targetElement, event.target.value, "bold");
      });

      document.getElementById('toggle-border-button').addEventListener('click', () => {
        toggleClickedStyle(targetElement, "null", "border");

      });

      document.getElementById('delete-text-button').addEventListener('click', () => {
        
        toggleClickedStyle(targetElement, "null", "deleteText");

      });


      if (!listCheckboxChecked.includes(event.target)) {

        listCheckboxChecked.push(event.target);
        console.log(listCheckboxChecked)
      }
    }
  });
  //



  document.getElementById('fontSelect').addEventListener('change', (event) => {
    const selectedFont = event.target.value;
    selectAllCanvas(selectedFont, "font");
  });

  document.getElementById('toggle-bold-button').addEventListener('click', (event) => {
    selectAllCanvas(event.target.value, "bold");
  });

  document.getElementById('toggle-border-button').addEventListener('click', () => {
    selectAllCanvas("null", "border");

  });

  document.getElementById('delete-text-button').addEventListener('click', () => {
    selectAllCanvas("null", "deleteText");
  });


  // modal buttons
  const confirmButton = document.getElementById('confirm-button-modal');
  const cancelButton = document.getElementById('cancel-button-modal');

  confirmButton.addEventListener('click', confirmAction);
  cancelButton.addEventListener('click', closeConfirmationModal);

});
