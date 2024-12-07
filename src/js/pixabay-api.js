const API_KEY = '47457730-c1e96e42c58ea46d8ed7b0f32';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function fetchImages(query) {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty.');
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.hits.length) {
      throw new Error('No images found for this query.');
    }

    return data.hits;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}