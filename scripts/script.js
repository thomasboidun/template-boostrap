console.log("script.js works !");

const mailto = "thomas.boidun@live.fr";

let form = document.getElementById('contact-form');

form.addEventListener('submit', function () {

   let subject = "";
   let body = "";

   let name = document.getElementById('name');
   let email = document.getElementById('email');
   let phone = document.getElementById('phone');
   let message = document.getElementById('message');

   isEmpty([name.value, email.value, phone.value, message.value]);

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
   array.forEach(element => {
      if (element === "" || element === " ") {
         console.log(element);
         throw alert("Formulaire de contact invalide.");
      }
   });
   return true;
}


function lineBreaking(string) {
   let array = string.split('');
   let message = "";
   array.forEach(element => {
      if (element === "\n") {
         element = "\f";
      }
      message += element;
   })
   return message;
}