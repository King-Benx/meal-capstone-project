import { getLikes } from './microverse_app.js';

const sanitizeData = async () => {
  const sanitizedData = [];
  const BASE_URL = 'https://api.tvmaze.com/shows';

  const [allLikes, data] = await Promise.all([
    await getLikes(),
    await fetch(BASE_URL, {
      method: 'GET',
    }).then((response) => response.json()),
  ]);

  for (let i = 0; i < data?.length; i += 1) {
    const {
      id, name, summary, image,
    } = data[i];
    sanitizedData.push({
      id: id.toString(),
      name,
      description: summary,
      url: image.original,
      likes: allLikes.filter((likes) => likes.item_id === id.toString()).length,
      comments: [],
    });
  }
  return sanitizedData;
};

export default sanitizeData;
