import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load More';
loadMoreButton.classList.add('load-more');
loadMoreButton.style.display = 'none';
document.body.appendChild(loadMoreButton);

const loadingIndicator = document.querySelector('#loading');
let lightbox = null;
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

  loadingIndicator.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loadingIndicator.style.display = 'none';

    if (data && data.hits.length > 0) {
      renderGallery(data.hits, galleryContainer);
      iziToast.success({ message: `Found ${data.totalHits} images!` });
      loadMoreButton.style.display = 'block';
      initLightbox();
    } else {
      iziToast.warning({ message: 'No images found. Try another query.' });
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    loadingIndicator.style.display = 'none';
    iziToast.error({ message: 'Failed to fetch images. Please try again later.' });
    console.error(error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  loadingIndicator.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loadingIndicator.style.display = 'none';

    if (data && data.hits.length > 0) {
      renderGallery(data.hits, galleryContainer);
      iziToast.info({ message: 'Loaded more images.' });
      refreshLightbox();
    } else {
      iziToast.info({ message: 'No more images to load!' });
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    loadingIndicator.style.display = 'none';
    iziToast.error({ message: 'Failed to load more images.' });
    console.error(error);
  }
});

function initLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
}

function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}