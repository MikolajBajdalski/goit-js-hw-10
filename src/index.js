import {
  fetchBreeds,
  populateBreedSelect,
  fetchCatByBreed
} from "./js/cat-api";

const breedSelect = document.querySelector('select.breed-select');
const catInfo = document.querySelector('.cat-info');
const imgCatInfo = document.querySelector('.img__cat-info')
const textCatInfo = document.querySelector('.text__cat-info')
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

function showLoader() {
  breedSelect.style.display = "none";
  loader.style.display = "block";
}

function hideLoader() {
  breedSelect.style.display = "block";
  loader.style.display = "none";
}

function showError(errorMessage) {
  errorText.textContent = errorMessage;
  errorText.style.display = "block";
  hideLoader();
  breedSelect.style.display = "none";
}

function hideError() {
  errorText.style.display = "none";
}

showLoader();

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    hideLoader();
  })
  .catch(error => {
    console.error(error);
    showError("Oops! Something went wrong! Try reloading the page!");
  });

function handleBreedSelectChange() {
  const selectedBreedId = this.value;

  showLoader();
  hideError();

  if (imgCatInfo.hasChildNodes()) {
    imgCatInfo.innerHTML = '';
  }

  if (textCatInfo.hasChildNodes()) {
    textCatInfo.innerHTML = '';
  }

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      h2.textContent = catData.breeds[0].name;

      const description = document.createElement("p");
      description.innerHTML = `${catData.breeds[0].description}`;

      const temperament = document.createElement("p");
      temperament.innerHTML = `<strong>Temperament:</strong> ${catData.breeds[0].temperament}`;

      img.src = catData.url;
      img.alt = "Cat Image";
      imgCatInfo.appendChild(img);
      textCatInfo.appendChild(h2);
      textCatInfo.appendChild(description);
      textCatInfo.appendChild(temperament);

      hideLoader();
    })
    .catch(error => {
      console.error(error);
      showError("Oops! Something went wrong while fetching cat data!");
    });
}

breedSelect.addEventListener('change', handleBreedSelectChange);