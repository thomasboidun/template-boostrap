const NAME_PATTERN = /^(?=.{1,50}$)[a-zA-ZÀ-Ý-à-ÿ]+(?:['_.\s][a-zA-ZÀ-Ý-à-ÿ]+)*$/i;
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

$(function () {
  // console.log("contact-form.script.js works!");
  class Input {
    id;
    element;
    helper;
    status = false;

    constructor(id) {
      this.id = id;
      this.element = $(id);
      this.helper = $(id + 'Help');
    }
  }

  class Button {
    element;

    constructor(id) {
      this.element = $(id);
    }

    on() {
      this.element.removeAttr('disabled');
    }

    off() {
      this.element.attr('disabled', 'disabled');
    }
  }

  class Alert {
    element;

    constructor(id) {
      this.element = $(id);
    }

    success(string) {
      this.element.removeClass('alert-dark').addClass('alert-info').html(string);
    }

    error(string) {
      this.element.removeClass('alert-info').addClass('alert-dark').html(string);
    }
  }

  let inputs = [
    new Input('#name'), new Input('#email'), new Input('#message')
  ];

  let btn = new Button('#contact-form button[type=submit]');

  let alert = new Alert('#contact-form div.alert');

  inputs.forEach(input => {
    input.element.keyup(() => {
      if (isEmpty(input)) return validator();
      if (!checkPattern(input)) return validator();
      return validator();
    })
  })

  // Call of the event when submit the contact form
  $('#contact-form').submit((e) => {
    e.preventDefault();

    inputs.forEach(input => {
      // Vérifier si le champ est vide et qu'il respecte le pattern
      if (isEmpty(input)) return validator();
      if (!checkPattern(input)) return validator();
    })

    // console.log(empty, check);
    if(validator()) sendMessage(e.currentTarget);
    else alert.error("<strong>Oups !</strong> Le formulaire est invalide.");;
  })

  function isEmpty(input) {
    // Si le champ est vide
    if (input.element.val().trim().length === 0) {
      input.status = false;
      switch (input.id) {
        case '#name':
          input.helper.html("Le prénom est <strong>requis</strong> !").removeClass('text-muted').addClass('text-danger');
          break;
        case '#email':
          input.helper.html("L'adresse e-mail est <strong>requise</strong> !").removeClass('text-muted').addClass('text-danger');
          break;
        case '#message':
          input.helper.html("Le message est <strong>requis</strong> !").removeClass('text-muted').addClass('text-danger');
          break;
      }
      return true;
    } else {
      input.status = true;
      switch (input.id) {
        case '#name':
          input.helper.html("Entrez votre prénom.").removeClass('text-danger').addClass('text-muted');
          break;
        case '#email':
          input.helper.html("Entrez votre adresse e-mail.").removeClass('text-danger').addClass('text-muted');
          break;
        case '#message':
          input.helper.html("Entrez votre message.").removeClass('text-danger').addClass('text-muted');
          break;
      }
      return false;
    }
  }

  function checkPattern(input) {
    let check = null;
    switch (input.id) {
      case '#name':
        check = NAME_PATTERN.test(input.element.val());
        check ?
          input.helper.html("Entrez votre prénom.").removeClass('text-danger').addClass('text-muted') :
          input.helper.html("Le prénom est <strong>invalide</strong> !").removeClass('text-muted').addClass('text-danger');
        break;
      case '#email':
        check = EMAIL_PATTERN.test(input.element.val());
        check ?
          input.helper.html("Entrez votre adresse e-mail.").removeClass('text-danger').addClass('text-muted') :
          input.helper.html("L'adresse e-mail est <strong>invalide</strong> !").removeClass('text-muted').addClass('text-danger');
        break;
      case '#message':
        check = input.element.val().trim();
        check ?
          input.helper.html("Entrez votre message.").removeClass('text-danger').addClass('text-muted') :
          input.helper.html("Le message est <strong>invalide</strong> !").removeClass('text-muted').addClass('text-danger');
        break;
    }
    input.status = check;
    return check;
  }

  function validator() {
    let validator = 0;
    inputs.forEach(input => {
      if (input.status) validator++;
    })

    validator === inputs.length ?
      btn.on() : btn.off();

    if(validator === inputs.length) return true;
    else return false;
  }

  function sendMessage (form) {
    form.contact_number.value = Math.random() * 100000 | 0;

    emailjs.sendForm('id_c0nt4ctSrv', 'contact_form', form)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert.success("Message envoyé avec succès.");
   }, function(error) {
      console.log('FAILED...', error);
      alert.error("<strong>Oups !</strong> Une erreur est survenu lors de l'envoie de votre message...");
   });
  }
})