/****************************************************************************************************************/
/***** Script pour le montant personnalisé *****/
/****************************************************************************************************************/
function toggleCustomInput() {
  function removeCommas(number) {
    return number.replace(/,/g, ''); // Supprimer les virgules de la valeur
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Ajouter les virgules tous les 3 chiffres
  }

  var customText = document.getElementById('custom-text');
  var customDescription = document.getElementById('custom-description');
  var customCase = document.getElementById('custom-case');
  var customInput = document.createElement('input');
  customInput.setAttribute('type', 'text');
  customInput.setAttribute('id', 'custom-input');
  customInput.setAttribute('class', 'montant');

  customInput.addEventListener('input', function () {
    var inputValue = removeCommas(customInput.value); // Supprimer les virgules de la valeur
    var isValid = /^\d+$/.test(inputValue); // Vérifier si la valeur est composée uniquement de chiffres

    if (!isValid) {
      customInput.value = ''; // Réinitialiser la valeur si elle contient des caractères non numériques
    } else {
      var montant = parseInt(inputValue); // Convertir la valeur en entier

      // Mettre à jour la valeur affichée dans l'input avec les virgules
      customInput.value = formatNumberWithCommas(montant);

      if (customInput.value === '') {
        customDescription.innerText = '30 - 2,500,000';
      } else if (montant < 30) {
        customDescription.innerHTML = '<span style="color: red;">&#10005; Minimum : 30</span>';
      } else if (montant > 2500000) {
        customDescription.innerHTML = '<span style="color: red;">&#10005; Maximum : 2,500,000</span>';
      } else {
        customDescription.innerText = '€ ' + formatPrice(montant * costPerPiece); // Mettre à jour le montant total en euros
      }

      if (montant < 30 || montant > 2500000) {
        customText.classList.add('active');
        customCase.classList.remove('valide');
        customCase.classList.add('invalid');
      } else {
        customText.classList.remove('active');
        customCase.classList.remove('invalid');
        customCase.classList.add('valide');
      }

      updateTotalPrice(montant); // Mettre à jour le prix total en fonction du montant personnalisé
    }
  });

  customInput.addEventListener('focus', function () {
    if (customInput.value === '') {
      customDescription.innerText = '30 - 2,500,000';
    }
  });

  customInput.addEventListener('keypress', function (event) {
    var key = event.keyCode || event.which;
    var isDigit = /\d/.test(String.fromCharCode(key)); // Vérifier si la touche enfoncée est un chiffre

    if (!isDigit) {
      event.preventDefault(); // Empêcher l'entrée de caractères non numériques
    }
  });

  if (customText.innerText === 'Personnalisé') {
    customText.innerText = '';
    customText.appendChild(customInput);
    customDescription.innerText = '';
    customInput.focus();
  } else {
    customText.innerText = 'Personnalisé';
    customDescription.innerText = 'Montants élevés pris en charge';
    updateTotalPrice(0); // Réinitialiser le prix total lorsque le montant personnalisé est désactivé
  }
}

function updateCoinQuantity(quantity) {
  document.getElementById('coin-quantity').textContent = quantity + ' Pièces';
}

function updateTotalPrice(customAmount) {
  var totalAmountElement = document.getElementById('total-amount');

  if (customAmount === 0.85) {
    totalAmountElement.textContent = '0.85';
  } else if (customAmount === 4.15) {
    totalAmountElement.textContent = '4.15';
  } else if (customAmount === 8.29) {
    totalAmountElement.textContent = '8.29';
  } else if (customAmount === 16.49) {
    totalAmountElement.textContent = '16.49';
  } else if (customAmount === 41.25) {
    totalAmountElement.textContent = '41.25';
  } else if (customAmount === 82.09) {
    totalAmountElement.textContent = '82.09';
  } else if (customAmount === 205.19) {
    totalAmountElement.textContent = '205.19';
  } else if (customAmount >= 30 && customAmount <= 2500000) {
    var totalAmount = customAmount * costPerPiece;
    totalPrice = totalAmount;
    totalAmountElement.textContent = formatPrice(totalAmount);
    updateCoinQuantity(customAmount);
  } else {
    totalAmountElement.textContent = '0.00';
  }
}

function showInput() {
  var buttonContainer = document.getElementById('custom-button-container');
  buttonContainer.innerHTML = '';

  var inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('class', 'custom-input');
  inputElement.setAttribute('placeholder', 'Entrer le texte');
  inputElement.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) { // Pressed Enter key
      createButton(inputElement.value);
    }
  });

  var buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'custom-button');
  buttonElement.textContent = 'Valider';
  buttonElement.addEventListener('click', function () {
    createButton(inputElement.value);
  });

  buttonContainer.appendChild(inputElement);
  buttonContainer.appendChild(buttonElement);

  inputElement.focus();
}

function createButton(text) {
  var buttonContainer = document.getElementById('custom-button-container');
  buttonContainer.innerHTML = '';

  var buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'custom-button');
  buttonElement.textContent = text;
  buttonElement.addEventListener('click', showInput);

  buttonContainer.appendChild(buttonElement);
}

var totalPrice = 0.00;
var costPerPiece = 0.012;

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',');
}

function customPurchase() {
  var customAmountInput = document.getElementById('custom-amount');
  var customAmount = parseInt(customAmountInput.value);
  if (!isNaN(customAmount)) {
    updateTotalPrice(customAmount);
    customAmountInput.value = '';
  }
}




