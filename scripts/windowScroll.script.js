console.log("windowScroll.script.js works !");

let btns = [
   document.querySelector('a[href="#portfolio"]'),
   document.querySelector('a[href="#about"]'),
   document.querySelector('a[href="#contact"]'),
]

let dropdowns = [
   document.querySelector('a.dropdown-item[href="#portfolio"]'),
   document.querySelector('a.dropdown-item[href="#about"]'),
   document.querySelector('a.dropdown-item[href="#contact"]'),
]

window.addEventListener("scroll", function () {
   let topSections = getTopSections(window.screen);

   var y = window.scrollY;
   // console.log(y);

   switch (true) {
      case (y >= topSections[0] && y < topSections[1]):
         // console.log("PORTFOLIO");
         updateBtn(btns[0], dropdowns[0]);
         break;
      case (y >= topSections[1] && y < topSections[2]):
         // console.log("QUI SUIS-JE ?");
         updateBtn(btns[1], dropdowns[1]);
         break;
      case (y >= topSections[2]):
         // console.log("CONTACT");
         updateBtn(btns[2], dropdowns[2]);
         break;
      default:
         // console.log("THOMAS BOIDUN");
         resetBtn();
         break;
   }
})

function getTopSections() {
   let sections = [
      {id: "profile", height: undefined},
      {id: "portfolio", height: undefined},
      {id: "about", height: undefined},
      {id: "contact", height: undefined},
   ];

   // Obtenir la hauteur des éléments
   sections.forEach(e => {
      e.height = document.getElementById(e.id).scrollHeight;
   })

   return [sections[0].height, sections[0].height + sections[1].height, sections[0].height + sections[1].height + sections[2].height];
}

function resetBtn() {
   btns.forEach(btn => {
      btn.classList.replace('btn-info', 'btn-dark');
   })
   dropdowns.forEach(btn => {
      btn.classList.remove('active');
   })
}

function updateBtn(btn, dropdown) {
   resetBtn();
   btn.classList.replace('btn-dark', 'btn-info');
   dropdown.classList.add('active');
}