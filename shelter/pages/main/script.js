//Burger menu 

const burger = document.querySelector('.hamburger'),
nav = document.querySelector('.navigation'),
links = document.querySelectorAll('.navigation li'),
overlay = document.querySelector('.overlay'),
logo = document.querySelector('.header__logo'),
body = document.querySelector('body');

function slider() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('navigation-active');
    burger.classList.toggle('hamburger-active');
    overlay.classList.toggle('overlay-active');
    logo.classList.toggle('header__logo-active');
    body.classList.toggle('fixed-position');
    links.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinksFade .5s ease forwards ${index/4 + 0.3}s`;
      }
    })
  })
  overlay.addEventListener('click', () => {
    nav.classList.toggle('navigation-active');
    burger.classList.toggle('hamburger-active');
    overlay.classList.toggle('overlay-active');
    logo.classList.toggle('header__logo-active');
    body.classList.toggle('fixed-position'); 
    links.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinksFade .5s ease forwards ${index/4 + 0.3}s`;
      }
    })
  })
}

slider();








//Popup

// const popup = document.querySelectorAll('.layout-columns__item'),
// //body = document.querySelector(body);

// let unlock = true;

// const timeout = 800;

// popup.addEventListener('click', (e) => {

// })














// // Формирование псевдослучайного набора питомцев
// let pets = []; // 8
// let fullPetsList = []; // 48

// const request = new XMLHttpRequest();
// request.open('GET', '../../pets.json');
// request.onload = () => {request.response};
// fetch('../../pets.json').then(res => res.json()).then(list => {
//   pets = list;

//   fullPetsList = (() => {
//     let tempArr = [];

//     for (let i = 0; i < 6; i++) {
//       const newPets = pets;

//       for (let j = pets.length; j > 0; j--) {
//         let randInd = Math.floor(Math.random() * j);
//         const randElem = newPets.splice(randInd, 1)[0];
//         newPets.push(randElem);
//       }

//       tempArr = [...tempArr, ...newPets];
//     }
//     return tempArr;
//   })();

//   fullPetsList = sort863(fullPetsList);

//   createPets(fullPetsList);

//   //document.querySelector("#currentPage").innerText = (currentPage+1).toString();

//   for (let i = 0; i < (fullPetsList.length / 6); i++) {
//     const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);
//   }
// })

// const createPets = (petsList) => {
//   const elem = document.querySelector('.layout-columns');
//   elem.innerHTML += createElements(petsList);
// }

// createElements = (petsList) => {
//   let str = '';
//   for (let i = 0; i < petsList.length; i++) {
//     str += `<div class="layout-columns__item">
//     <div class="item-image"><img src=" ${petsList[i].img }"></div>
//     <p class="item-title">${petsList[i].name}</p>
//     <div class="item-button"><button class="button button_bordered button_item">Learn more</button></div></div>`
//   }
//   return str;
// }

// request.send();

// const sort863 = (list) => {
//   let unique8List = [];
//   let length = list.length;
//   for (let i = 0; i < length / 8; i++) {
//     const uniqueStepList = [];
//     for (j = 0; j < list.length; j++) {
//       if (uniqueStepList.length >= 8) {
//         break;
//       }
//       const isUnique = !uniqueStepList.some((item) => {
//         return item.name === list[j].name;
//       });
//       if (isUnique) {
//         uniqueStepList.push(list[j]);
//         list.splice(j, 1);
//         j--;
//       }
//     }
//     unique8List = [...unique8List, ...uniqueStepList];
//   }
//   list = unique8List;


//   list = sort6recursively(list);

//   return list;
// }

// const sort6recursively = (list) => {
//   const length = list.length;

//   for (let i = 0; i < (length / 6); i++) {
//     const stepList = list.slice(i * 6, (i * 6) + 6);

//     for (let j = 0; j < 6; j++) {
//       const duplicatedItem = stepList.find((item, ind) => {
//         return item.name === stepList[j].name && (ind !== j);
//       });

//       if (duplicatedItem !== undefined) {
//         const ind = (i * 6) + j;
//         const which8OfList = Math.trunc(ind / 8);

//         list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

//         sort6recursively(list);
//       }
//     }
//   }

//   return list;
// }

//Slider

// let currentPage = 0;
// document.querySelector('.button-arrow_left').addEventListener('click', (e) => {
//   if (currentPage > 0) {
//     currentPage--;
//     console.log(currentPage+1);
//   }
//   document.querySelector(".layout-columns").style.left = `calc(2000px - ${190 * currentPage}px)`;
//   //document.querySelector("#currentPage").innerText = (currentPage+1).toString();

// });

// document.querySelector('.button-arrow_right').addEventListener('click', (e) => {
//   if (currentPage < (document.querySelector(".layout-columns").offsetHeight / 190) - 1) {
//     currentPage++;
//     //console.log(currentPage+1);
//   }

//   document.querySelector(".layout-columns").style.right = `calc(2000px - ${190 * currentPage}px)`;
//   //document.querySelector("#currentPage").innerText = (currentPage+1).toString();
// });



// let itemsPerPage = 8;

// const checkItemsPerPage = () => {
//   if (document.querySelector("body").offsetWidth > 768 && document.querySelector("body").offsetWidth < 1280) {
//     itemsPerPage = 6;

//   }
// }
// (fullPetsList / itemsPerPage)


// let items = document.querySelectorAll('.layout-columns__item');
// let currentPage = 0;
// let isEnabled = true;

// function changeCurrentPage(n) {
// 	currentPage = (n + items.length) % items.length;
// }

// function hideItem(direction) {
// 	isEnabled = false;
// 	items[currentPage].classList.add(direction);
// 	items[currentPage].addEventListener('animationend', function() {
// 		this.classList.remove('active-slide', direction);
// 	});
// }

// function showItem(direction) {
// 	items[currentPage].classList.add('next', direction);
// 	items[currentPage].addEventListener('animationend', function() {
// 		this.classList.remove('next', direction);
// 		this.classList.add('active-slide');
// 		isEnabled = true;
// 	});
// }

// function nextItem(n) {
// 	hideItem('to-left');
// 	changeCurrentPage(n + 1);
// 	showItem('from-right');
// }

// function previousItem(n) {
// 	hideItem('to-right');
// 	changeCurrentItem(n - 1);
// 	showItem('from-left');
// }

// document.querySelector('.button-arrow_left').addEventListener('click', function() {
// 	if (isEnabled) {
// 		previousItem(currentPage);
// 	}
// });

// document.querySelector('.button-arrow_right').addEventListener('click', function() {
// 	if (isEnabled) {
// 		nextItem(currentPage);
// 	}
// });
