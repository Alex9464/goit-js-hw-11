/**
 * @param {Object} image
 * @returns {string}
 */
  
  /**
   @param {Array} images
   */
  
  export function renderGallery(images) {
    const gallery = document.querySelector('#gallery');
    gallery.innerHTML = images.map(createImageCard).join('');
  }

  export function createImageCard(image) {
    return `
      <div class="photo-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `;
  }