const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export const createApp = async () => {
  const id = localStorage.getItem('CapstoneAppId');
  let appId = id;
  if (!id) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.text());
    localStorage.setItem('CapstoneAppId', response);
    appId = response;
  }
  return appId;
};

export const getLikes = async () => {
  const id = await createApp();
  const likes = await fetch(`${BASE_URL}/${id}/likes`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json).catch(() => []);
  return likes;
};

export const getComments = async () => {
  const id = await createApp();
  const comments = await fetch(`${BASE_URL}/${id}/comments`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  return comments;
};