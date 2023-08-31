import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_fjvS2AbWJ0VTz9dg8ZLcNtaTj1cZnQZM1YRJoe8ypCkcJBVGdRE36mBh5K2ACaLQ";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}
export function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('select.breed-select');
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url)
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      throw error;
    });
}