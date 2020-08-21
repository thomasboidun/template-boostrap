console.log("sendForm.script.js works !");

// Sélectionner le formulaire de contact dans le DOM.
let form = document.getElementById('contact-form');

// Ajouter un évènement sur le formulaire de contact lors de sa soumission.
form.addEventListener('submit', function () {
   // Sélectionner les champs du formulaire de contact?
   let name = document.getElementById('name');
   let email = document.getElementById('email');
   let phone = document.getElementById('phone');
   let message = document.getElementById('message');

   // Vérifier si les champs sont vide. Si oui alerter l'utilisateur.
   let nameIsEmpty = isEmpty(name.value);
   if (nameIsEmpty) { return alert("Formulaire de contact invalide.\n Veuillez saisir votre prénom dans le champ correspondant."); };
   let emailIsEmpty = isEmpty(email.value);
   if (emailIsEmpty) { return alert("Formulaire de contact invalide.\n Veuillez saisir votre adresse e-mail dans le champ correspondant.") };
   let phoneIsEmpty = isEmpty(phone.value);
   if (phoneIsEmpty) { return alert("Formulaire de contact invalide.\n Veuillez saisir votre numéro de téléphone dans le champ correspondant.") };
   let messageIsEmpty = isEmpty(message.value);
   if (messageIsEmpty) { return alert("Formulaire de contact invalide.\n Veuillez saisir votre message dans le champ correspondant.") };

   // Vérifier si les patterns des champs sont respectés. Sinon alerter l'utilisateur.
   let patternIsOK = checkPattern(name.value, email.value, phone.value);
   if (!patternIsOK) { return alert("Formulaire de contact invalide.") };

   // Si verif OK, générer un nouvel email
   let newMail = generateEmail(name.value, email.value, phone.value, message.value);

   // TODO : Avertir l'utilisateur de l'ouverture de sa boîte mail.

   // Définir l'attribut "action" et sa valeur au formulaire de contact afin de générer un nouvel e-mail dans la boîte mail de l'utilisateur
   form.setAttribute("action", `mailto:${newMail.mailto}?subject=${newMail.subject}&body=${newMail.body}`);

   return console.log('Envoie du formulaire de contact.');
})

/**
 * Vérifier si une input est vide.
 * Prend en paramètre la valeur d'un input.
 * Retourne true si la valeur est vide et false si le champ ne l'est pas.
 * @param {string} string 
 */
function isEmpty(string) {
   // Vérifier la chaîne de caractère.
   if (string.trim() === "") { return true; }
   // Sinon OK.
   return false;
}

/**
 * Vérifier les patterns des inputs "name", "email" et "phone".
 * Prend en paramètre la valeur des inputs "name", "email" et "phone".
 * Retourne une erreur si un des champs est invalide ou true si tout les champs sont valide.
 * @param {string} namme
 * @param {string} email
 * @param {string} phone
 */
function checkPattern(name, email, phone) {
   const namePattern = /^[a-zA-ZÀ-Ý-à-ÿ]+(([',. -][a-zA-ZÀ-Ý-à-ÿ ])?[a-zA-ZÀ-Ý-à-ÿ]*)*$/g;
   let nameOK = namePattern.test(name);
   if (!nameOK) { return false; }

   const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
   let emailOK = emailPattern.test(email);
   if (!emailOK) { return false; }

   const phonePattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
   let phoneOK = phonePattern.test(phone);
   if (!phoneOK) { return false; }

   return true;
}

/**
 * Générer un nouvel e-mail.
 * Prend en paramètre la valeur saisie dans les champs "name", "email", "phone", et "message".
 * Retourne le nouvel e-mail.
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @param {string} message
 */
function generateEmail(name, email, phone, message) {
   let newMail = {
      mailto : "thomas.boidun@live.fr",
      subject : "",
      body : "",
   };

   // Définir l'objet de l'e-mail
   newMail.subject = `${name} vous a envoyé un message.`;

   // Modifier le message pour gérer son affichafe dans la boîte mail de l'utilisateur
   const adaptedMessage = lineBreaking(message);

   // Défirnir le corps du message à partir des valeurs saisie par l'utilisateur.
   newMail.body = `${adaptedMessage}\f`;
   newMail.body += "\f";
   newMail.body += name + "\f";
   newMail.body += email + "\f";
   newMail.body += phone + "\f\f";

   return newMail;
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