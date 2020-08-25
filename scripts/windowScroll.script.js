console.log("windowScroll.script.js works !");

const topSections = [
   612,
   1142.4000244140625,
   1707.199951171875,
];

let btns = [
   document.querySelector('a[href="#portfolio"'),
   document.querySelector('a[href="#about"'),
   document.querySelector('a[href="#contact"'),
]

window.addEventListener("scroll", function () {
   var y = window.scrollY;
   // console.log(y);

   switch (true) {
      case (y >= topSections[0] && y < topSections[1]):
         // console.log("PORTFOLIO");
         updateBtn(btns[0]);
         break;
      case (y >= topSections[1] && y < topSections[2]):
         // console.log("QUI SUIS-JE ?");
         updateBtn(btns[1]);
         break;
      case (y >= topSections[2]):
         // console.log("CONTACT");
         updateBtn(btns[2]);
         break;
      default:
         // console.log("THOMAS BOIDUN");
         resetBtn();
         break;
   }
})

function resetBtn() {
   btns.forEach(btn => {
      btn.classList.replace('btn-info', 'btn-dark');
   })
}

function updateBtn(btn) {
   resetBtn();
   btn.classList.replace('btn-dark', 'btn-info');
}