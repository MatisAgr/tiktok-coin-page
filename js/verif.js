/***************************************************************************************************************/
/***** Script pour la pop-up de vérif et chargement *****/
/****************************************************************************************************************/

function simulatePayment() {
  var payButton = document.querySelector('.pay-button');
  
  // Désactiver le bouton "Payer Maintenant"
  payButton.disabled = true;

  // Ajouter la classe "loading" au bouton pour afficher le style de chargement
  payButton.classList.add("loading");

  setTimeout(function() {
    // Réactiver le bouton "Payer Maintenant"
    payButton.disabled = false;

    // Supprimer la classe "loading" du bouton pour arrêter l'animation de chargement
    payButton.classList.remove("loading");
    
    // Effectuer les actions souhaitées après le chargement
    // Par exemple, afficher un message de succès ou rediriger vers une autre page
    // Code à ajouter ici...

  }, 5000); // 5000ms = 5s (ajuster la durée en millisecondes selon vos besoins)
}

var payButton = document.querySelector('.pay-button');

payButton.addEventListener('click', simulatePayment);


document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".buttonwaw");
    const popupLeft = document.getElementById("popup-left");
    const popupRight = document.getElementById("popup-right");
  
    button.addEventListener("click", function(event) {
      const rect = button.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const buttonWidth = rect.width;
  
      if (clickX < buttonWidth / 2) {
        popupLeft.style.display = "block";
        popupRight.style.display = "none";
  
        // Afficher l'animation de chargement pour la pop-up gauche
        popupLeft.classList.add("loading");
  
        setTimeout(function() {
          popupLeft.classList.remove("loading");
          popupLeft.querySelector(".popup-text").textContent = "Erreur : Cet utilisateur ne vous a pas envoyé de cadeau !";
        }, 4543); // 4543ms = 4,543s
      } else {
        popupRight.style.display = "block";
        popupLeft.style.display = "none";
  
        // Afficher l'animation de chargement pour la pop-up droite
        popupRight.classList.add("loading");
  
        setTimeout(function() {
          popupRight.classList.remove("loading");
          popupRight.querySelector(".popup-text").textContent = "Validation réussie : Cet utilisateur vous a bien envoyé un cadeau !";
        }, 1212); // 1212ms = 1,212s
      }
    });
  
    document.addEventListener("click", function(event) {
      if (
        event.target !== popupLeft &&
        !popupLeft.contains(event.target) &&
        event.target !== button &&
        event.target !== popupRight &&
        !popupRight.contains(event.target)
      ) {
        popupLeft.style.display = "none";
        popupRight.style.display = "none";
      }
    });
  });
  