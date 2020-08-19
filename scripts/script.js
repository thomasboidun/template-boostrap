console.log("script.js works !");

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
   // Vérifier les champs
   checkPattern([name.value, email.value, phone.value]);

   subject = `${name.value} vous a envoyé un message.`

   const adaptedMessage = lineBreaking(message.value);

   body = `${adaptedMessage}\f`;
   body += "\f";
   body += name.value + "\f";
   body += email.value + "\f";
   body += phone.value + "\f\f";

   console.log('Envoie du formulaire de contact.');
   form.setAttribute("action", `mailto:${mailto}?subject=${subject}&body=${body}`);
})

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
      throw alert("Le numéro de téléphone saisie dans le formulaire est invalide")
   }

   return true;
}

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