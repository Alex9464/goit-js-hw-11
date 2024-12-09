import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let imagesPerPage = 20;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

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
    const data = await fetchImages(currentQuery, currentPage, imagesPerPage);

    if (data && data.hits.length > 0) {
      totalHits = data.totalHits;
      renderGallery(data.hits, galleryContainer);
      lightbox.refresh();

      iziToast.success({ message: `Found ${totalHits} images!` });

      if (data.hits.length < imagesPerPage || currentPage * imagesPerPage >= totalHits) {
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
    } 
  } catch (error) {
    console.error(error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage, imagesPerPage);

    if (data && data.hits.length > 0) {
      renderGallery(data.hits, galleryContainer);
      lightbox.refresh();

      if (currentPage * imagesPerPage >= totalHits) {
        loadMoreButton.style.display = 'none';
        iziToast.info({ message: 'No more images to load!' });
      }
    } else {
      iziToast.info({ message: 'No more images to load!' });
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch more images. Please try again later!' });
    console.error(error);
  }
});