/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')
const mymap = L.map('mapid').setView([-1.45502, -48.5024], 12) //Definição do mapa para a home

// url api
const api_url = 
      "https://192.168.0.27:8000/todos";
  
// Defining async function
async function getapi(api_url) {
    
    // Storing response
    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(api_url);

var temp = parseFloat(getapi(api_url));
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
  if(temp>=2 && temp<=8){
  return "<p>A temperatura está adequada para armazenamento de vacinas!</p>"
}
else{
  return "!!!ALERTA!!! A temperatura não está adequada para armazenamento e conservação de vacinas! !!!RISCO!!!"
}
}

/* Chamada do Leaflet */


var nomes = [2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4,  3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3, 4.4,  4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8];
var name = nomes[Math.ceil(Math.random() * (nomes.length - 1))];
var name2 = nomes[Math.ceil(Math.random() * (nomes.length - 1))];
var num = parseFloat(name);
var num2 = parseFloat(name2);

function diagnosticoTemp(num){
if(num>=2 && num<=8){
  return "<p>A temperatura está adequada para armazenamento e conservação de vacinas!</p>"
}
else{
  return "!!!ALERTA!!! A temperatura não está adequada para armazenamento e conservação de vacinas! !!!RISCO!!!"
}
}

function diagnosticoTemp(num2){
if(num2>=2 && num2<=8){
  return "<p>A temperatura está adequada para armazenamento de vacinas!</p>"
}
else{
  return "!!!ALERTA!!! A temperatura não está adequada para armazenamento e conservação de vacinas! !!!RISCO!!!"
}
}


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)

L.marker([-1.45502, -48.5024])
  .addTo(mymap)
  .bindPopup(getapi(api_url) + "ºC." + show(data))
  .openPopup()

L.marker([-1.46990, -48.4500])
  .addTo(mymap)
  .bindPopup(name2 + "ºC." + diagnosticoTemp(name2))
  .openPopup()

L.marker([-1.41502, -48.4500])
  .addTo(mymap)
  .bindPopup(name + "ºC." + diagnosticoTemp(name))
  .openPopup()

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

