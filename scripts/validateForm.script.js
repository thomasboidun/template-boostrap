console.log("validateForm.script.js works !");

let inputs = [
   {
      ref : document.getElementById('name'),
      OK : false,
   },
   {
      ref : document.getElementById('email'),
      OK : false,
   },
   {
      ref : document.getElementById('phone'),
      OK : false,
   },
   {
      ref : document.getElementById('message'),
      OK : false,
   },
];


inputs.forEach(input => {
   input.ref.addEventListener("keyup", function () {
      validator(this);
      return check(inputs);
   });
});


function validator(input) {
   switch (input) {
      case inputs[0].ref:
         const namePattern = /^[a-zA-ZÀ-Ý-à-ÿ]+(([',. -][a-zA-ZÀ-Ý-à-ÿ ])?[a-zA-ZÀ-Ý-à-ÿ]*)*$/g;
         let nameValidator = namePattern.test(input.value);
         isOK(input, nameValidator);
         inputs[0].OK = nameValidator;
         break;
      case inputs[1].ref:
         const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
         let emailValidator = emailPattern.test(input.value);
         isOK(input, emailValidator);
         inputs[1].OK = emailValidator;
         break;
      case inputs[2].ref:
         const phonePattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
         let phoneValidator = phonePattern.test(input.value);
         isOK(input, phoneValidator);
         inputs[2].OK = phoneValidator;
         break;
      case inputs[3].ref:
         let messageValidator = undefined;
         input.value.trim().indexOf("<") !== -1 || input.value.length !== 0 ? messageValidator = true : messageValidator = false;
         isOK(input, messageValidator);
         inputs[3].OK = messageValidator;
         break;

      default:
         break;
   }
}

function isOK(input, OK) {
   if (!OK) {
      input.classList.remove("success");
      input.classList.add("error");
   } else {
      input.classList.remove("error");
      input.classList.add("success");
   }
}

function check(inputs){
   let btn = document.querySelector("button[type='submit'].btn.btn-info.btn-lg");
   let check = 0;
   inputs.forEach(input => {
      input.OK ? check += 1 : check = check;
   })
   check === 4 ? btn.removeAttribute("disabled") : btn.setAttribute("disabled", "disabled");
}