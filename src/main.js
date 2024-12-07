import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

async function onSearch(event) {
  event.preventDefault();
  const query = document.querySelector('#search-input').value.trim();

  document.querySelector('#loading').style.display = 'block';

  try {
    const images = await fetchImages(query);
    renderGallery(images);
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    document.querySelector('#loading').style.display = 'none';
  }
}

document.querySelector('#search-form').addEventListener('submit', onSearch);