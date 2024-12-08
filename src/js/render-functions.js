export function renderGallery(images, container) {
  if (!images || images.length === 0) {
    clearGallery(container);
    return;
  }

  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
      createPhotoCardMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })
    )
    .join('');

  container.innerHTML += markup;
}

export function clearGallery(container) {
  container.innerHTML = '';
}

function createPhotoCardMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <div class="photo-card">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${downloads}
        </p>
      </div>
    </div>
  `;
}