///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(resolve => {
    console.log(`waiting ${seconds} seconds`);
    setTimeout(resolve, seconds * 1000);
  });
};

const hideImage = function (element) {
  console.log('hiding image');
  element.style.display = 'none';
};

const displayImage = function (image) {
  const images = document.querySelector('.images');
  images.append(image);
  console.log('showing image');
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.setAttribute('src', imgPath);
    img.classList.add('parallel');
    console.log('loading image');
    img.addEventListener('load', function (event) {
      displayImage(event.target);
      resolve(event.target);
    });
    img.addEventListener('error', reject);
  });
};

const loadNPause = async function () {
  try {
    const createImage1 = await createImage('../img/img-1.jpg');
    await wait(2);
    hideImage(createImage1);

    const createImage2 = await createImage('../img/img-2.jpg');
    await wait(2);
    hideImage(createImage2);

    const createImage3 = await createImage('../img/img-3.jpg');
    await wait(2);
    hideImage(createImage3);
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async imageUrl => {
      return createImage(imageUrl);
    });

    console.log(imgs);

    const result = await Promise.all(imgs);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const imageArr = ['../img/img-1.jpg', '../img/img-2.jpg', '../img/img-3.jpg'];
loadAll(imageArr);
