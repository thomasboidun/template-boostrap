console.log("sendForm.script.js works !");

// Définir l'adresse e-mail du destinataire
const mailto = "thomas.boidun@live.fr";

// Sélectionner le formulaire de contact dans le DOM.
let form = document.getElementById('contact-form');
// Ajouter un évènement sur le formulaire de contact lors de sa soumission.
form.addEventListener('submit', function () {
   // Déclarer l'objet et le corps du futur e-mail.
   let subject = "";
   let body = "";

   // Sélectionner les champs du formulaire de contact?
   let name = document.getElementById('name');
   let email = document.getElementById('email');
   let phone = document.getElementById('phone');
   let message = document.getElementById('message');

   // Vérifier si les champs sont vide.
   isEmpty([name.value, email.value, phone.value, message.value]);
   // Vérifier si les patterns des champs sont respectés
   checkPattern([name.value, email.value, phone.value]);

   // Définir l'objet de l'e-mail
   subject = `${name.value} vous a envoyé un message.`

   // Modifier le message pour gérer son affichafe dans la boîte mail de l'utilisateur
   const adaptedMessage = lineBreaking(message.value);

   // Défirnir le corps du message à partir des valeurs saisie par l'utilisateur.
   body = `${adaptedMessage}\f`;
   body += "\f";
   body += name.value + "\f";
   body += email.value + "\f";
   body += phone.value + "\f\f";

   // TODO : Avertir l'utilisateur de l'ouverture de sa boîte mail.
   console.log('Envoie du formulaire de contact.');
   // Définir l'attribut "action" et sa valeur au formulaire de contact afin de générer un nouvel e-mail dans la boîte mail de l'utilisateur
   form.setAttribute("action", `mailto:${mailto}?subject=${subject}&body=${body}`);
})

/**
 * Vérifier si les inputs sont vide.
 * Prend en paramètre un tableau contenant la valeur des inputs "name", "email", "phone" et "message".
 * Retourn une erreur si un des champs est vide ou true si tout les champs sont remplie.
 * @param {string[]} array 
 */
function isEmpty(array) {
   // Vérifier la valeur de chaque champ.
   array.forEach(element => {
      if (element === "" || element === " ") {
         // Si un champ est vide, avertir l'utilisateur.
         throw alert("Formulaire de contact invalide.");
      }
   });
   // Sinon OK.
   return true;
}

/**
 * Vérifier les patterns des inputs "name", "email" et "phone".
 * Prend en paramètre un tableau contenant la valeur des inputs "name", "email" et "phone".
 * Retourne une erreur si un des champs est invalide ou true tout les champs sont valide.
 * @param {string[]} array
 */
function checkPattern(array) {
   const namePattern = /^[a-zA-ZÀ-Ý-à-ÿ]+(([',. -][a-zA-ZÀ-Ý-à-ÿ ])?[a-zA-ZÀ-Ý-à-ÿ]*)*$/g;
   let nameOK = namePattern.test(array[0]);

   if (!nameOK) {
      throw alert("Le prénom saisie dans le formulaire est invalide.");
   }

   const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
   let emailOK = emailPattern.test(array[1]);

   if(!emailOK){
      throw alert("L'e-mail saisie dans le formulaire est invalide.");
   }

   const phonePattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
   let phoneOK = phonePattern.test(array[2]);

   if(!phoneOK){
      throw alert("Le numéro de téléphone saisie dans le formulaire est invalide.")
   }

   return true;
}

/**
 * Gèrer la mise en forme du message saisie par l'utilisateur pour l'adapter sur sa boîte mail.
 * Remplace les retours à la ligne "/n" par des "/f".
 * Prend en paramètre la valeur saisie dans le textarea "message".
 * Retourne une chaîne de caractère contenant le message de l'utilisateur modifié.
 * @param {string} string 
 */
function lineBreaking(string) {
   let array = string.split("");
   let message = "";
   array.forEach(element => {
      if (element === "\n") {
         element = "\f";
      }
      message += element;
   })
   return message;
}