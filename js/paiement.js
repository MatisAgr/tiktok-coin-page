/****************************************************************************************************************/
/***** Script pour la pop-up de paiement *****/
/****************************************************************************************************************/
// Variable pour stocker le nombre de pièces sélectionnées
var selectedCoinQuantity = 0;

// Fonction pour mettre à jour le nombre de pièces sélectionnées
function updateCoinQuantity(quantity) {
  selectedCoinQuantity = quantity;
  document.getElementById('coin-quantity').textContent = selectedCoinQuantity;
}

function openPaymentPopup() {
  // Récupérer les informations nécessaires
  var accountName = document.querySelector('.input2').value;
  var coinQuantity = selectedCoinQuantity;
  var coinPrice = document.getElementById('total-amount').textContent;

  // Mettre à jour les éléments de la pop-up
  document.getElementById('account-name').textContent = accountName;
  document.getElementById('coin-quantity').textContent = coinQuantity + ' Pièces';
  document.getElementById('coin-price').textContent = '€ ' + coinPrice;
  document.getElementById('coin-price2').textContent = '€ ' + coinPrice;

  // Afficher la pop-up
  document.getElementById('payment-popup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block'; // Afficher l'overlay
}

// Sélectionner les boutons de sélection de pièces
var coinButtons = document.querySelectorAll('.grid-item');

// Ajouter un gestionnaire d'événements au clic sur les boutons de sélection de pièces
coinButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var coinQuantity = parseInt(button.querySelector('.coin-number').getAttribute('value'));
    updateCoinQuantity(coinQuantity);
  });
});


// Sélectionner le bouton "Recharger"
var rechargeButton = document.getElementById('recharge-button');

// Ajouter un gestionnaire d'événements au clic sur le bouton
rechargeButton.addEventListener('click', openPaymentPopup);

// Créer l'élément pour le conteneur de la croix de fermeture
var closeContainer = document.createElement('div');
closeContainer.id = 'close-container';

// Créer l'élément pour la croix de fermeture
var closePopup = document.createElement('span');
closePopup.id = 'close-popup';
closePopup.textContent = '✕';
closePopup.style.cursor = 'pointer'; // Mettre le curseur en forme de main
closePopup.style.fontWeight = 'bold'; // Mettre la croix en gras
closePopup.style.marginLeft = '53rem'; // Augmenter la taille de la croix

// Sélectionner la fenêtre pop-up
var paymentPopup = document.getElementById('payment-popup');


closePopup.addEventListener('click', function () {
    // Masquer la pop-up
    paymentPopup.style.display = 'none';
    document.body.classList.remove('popup-open'); // Supprimer la classe pour rétablir le fond normal
        // Masquer la pop-up
        paymentPopup.style.display = 'none';
    // Masquer l'overlay
    document.getElementById('overlay').style.display = 'none';
});

// Ajouter la croix dans le conteneur
closeContainer.appendChild(closePopup);

// Ajouter le conteneur avec la croix en haut à droite de la fenêtre pop-up
paymentPopup.insertBefore(closeContainer, paymentPopup.firstChild);


// Sélectionner la case à cocher et le bouton "Payer Maintenant"
var acceptCheckbox = document.getElementById('accept-checkbox');
var payButton = document.querySelector('.pay-button');

// Désactiver le bouton "Payer Maintenant" au chargement de la page
payButton.disabled = true;

// Ajouter un gestionnaire d'événements au chargement de la page
window.addEventListener('load', function() {
    // Vérifier si la case à cocher est cochée
    if (acceptCheckbox.checked) {
        // Activer le bouton "Payer Maintenant"
        payButton.disabled = false;
    }
});

// Ajouter un gestionnaire d'événements au changement d'état de la case à cocher
acceptCheckbox.addEventListener('change', function() {
    // Vérifier si la case à cocher est cochée
    if (acceptCheckbox.checked) {
        // Activer le bouton "Payer Maintenant"
        payButton.disabled = false;
    } else {
        // Désactiver le bouton "Payer Maintenant"
        payButton.disabled = true;
    }
});

function Payment() {
  var payButton = document.querySelector('.pay-button');
  var popupPayment = document.getElementById('payment-popup');
  var loadingSpinner = document.querySelector('.loading-spinner');

  // Désactiver le bouton "Payer Maintenant"
  payButton.disabled = true;

  // Ajouter la classe "loading" au bouton pour afficher le style de chargement
  payButton.classList.add("loading");

  // Afficher la pop-up de chargement en premier plan
  popupPayment.style.display = "block";

  setTimeout(function() {
    // Continuer l'animation de chargement
    loadingSpinner.style.display = "block";

    // Ouvrir la page "paypal.html" dans une nouvelle fenêtre
    window.open("paypal.html", "_blank", "width=550,height=650");

    setTimeout(function() {
      // Réactiver le bouton "Payer Maintenant"
      payButton.disabled = false;

      // Supprimer la classe "loading" du bouton pour arrêter l'animation de chargement
      payButton.classList.remove("loading");

      // Cacher la pop-up de chargement
      popupPayment.style.display = "none";

      // Afficher la pop-up de validation du paiement
      showPaymentConfirmationPopup();

    }, 2345); // 2354ms = 1,954s (ajuster la durée en millisecondes selon vos besoins)

  }, 3456); // 3,456ms = 3,456s (ajuster la durée en millisecondes selon vos besoins)
}


function showPaymentConfirmationPopup() {
  
  var paymentConfirmationPopup = document.getElementById('payment-confirmation-popup');
  var closePopup = document.createElement('span');
  closePopup.id = 'close-popup';
  closePopup.textContent = '✕';
  closePopup.style.cursor = 'pointer'; // Mettre le curseur en forme de main
  closePopup.style.fontWeight = 'bold'; // Mettre la croix en gras
  closePopup.style.marginLeft = '53rem'; // Augmenter la taille de la croix

  closePopup.addEventListener('click', function () {
    // Fermer la pop-up de paiement validé
    paymentConfirmationPopup.style.display = 'none';
    // Masquer l'overlay
    document.getElementById('overlay').style.display = 'none';
  });
  

  // Ajouter la croix dans la pop-up
  paymentConfirmationPopup.insertBefore(closePopup, paymentConfirmationPopup.firstChild);

  // Afficher la pop-up de paiement validé
  paymentConfirmationPopup.style.display = 'block';
  // Afficher l'overlay
  document.getElementById('overlay').style.display = 'block';

  // Ajouter un gestionnaire d'événements pour le clic en dehors de la pop-up
  document.getElementById('overlay').addEventListener('click', function () {
    // Fermer la pop-up de paiement validé
    paymentConfirmationPopup.style.display = 'none';
    // Masquer l'overlay
    document.getElementById('overlay').style.display = 'none';
  });
  
}



function closePaymentConfirmationPopup() {
  var paymentConfirmationPopup = document.getElementById("payment-confirmation-popup");
  var overlay = document.getElementById("overlay");

  // Cacher la pop-up de confirmation du paiement et l'overlay
  paymentConfirmationPopup.style.display = "none";
  overlay.style.display = "none";
}


// Ajouter un gestionnaire d'événements pour le clic en dehors de la pop-up
window.addEventListener('click', function(event) {
  // Récupérer l'élément cliqué
  var target = event.target;

  // Vérifier si l'élément cliqué est en dehors de la pop-up et du bouton Recharger
  if (target !== paymentPopup && target !== rechargeButton && !paymentPopup.contains(target)) {
    // Masquer la pop-up
    paymentPopup.style.display = 'none';
    // Masquer l'overlay
    document.getElementById('overlay').style.display = 'none';
  }
});