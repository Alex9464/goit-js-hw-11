import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.querySelector('#search-input').value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery(galleryContainer);

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data && data.hits.length > 0) {
      renderGallery(data.hits, galleryContainer);
      iziToast.success({ message: `Found ${data.totalHits} images!` });
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error(error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data && data.hits.length > 0) {
      renderGallery(data.hits, galleryContainer);
    } else {
      iziToast.info({ message: 'No more images to load!' });
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error(error);
  }
});

document.querySelector('#search-form').addEventListener('submit', onSearch);