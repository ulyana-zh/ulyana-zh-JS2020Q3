
export { wallpapersArr, shuffle };

const numberImg = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', 
'10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.png', '21.png', '22.png'];

const base = './src/assets/images/';

function createArr() {
  for(let i = 0; i < numberImg.length; i++) {
    numberImg[i] = base + numberImg[i];
  }
  return numberImg;
}
createArr();
let wallpapersArr = shuffle(numberImg);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function preloadImages(array) {
  if (!preloadImages.list) {
      preloadImages.list = [];
  }
  const list = preloadImages.list;
  for (let i = 0; i < array.length; i++) {
      const img = new Image();
      img.onload = () => {
          let index = list.indexOf(this);
          if (index !== -1) {
              list.splice(index, 1);
          }
      }
      list.push(img);
      img.src = array[i];
  }
}

preloadImages(wallpapersArr);




