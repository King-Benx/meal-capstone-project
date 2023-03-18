import { getLikes } from './microverse_app.js';

const sanitizeData = async () => {
  const sanitizedData = [];
  const BASE_URL = 'https://api.tvmaze.com/shows';

  const [data, allLikes] = await Promise.all([
    await fetch(BASE_URL, {
      method: 'GET',
    }),
    await getLikes(),
  ]);
  const shows = await data.json();
  for (let i = 0; i < shows?.length; i += 1) {
    const {
      id, name, summary, image,
    } = shows[i];
    const likes = allLikes.filter((likes) => likes.item_id === id.toString()).length;
    sanitizedData.push({
      id: id.toString(),
      name,
      description: summary,
      url: image.original,
      likes,
      comments: [],
    });
  }
  return sanitizedData;
};

export default sanitizeData;
