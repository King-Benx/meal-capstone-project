const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export const createApp = async () => {
  const id = localStorage.getItem('CapstoneAppId');
  let appId = id;
  if (!id) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
    });
    const data = await response.text();
    localStorage.setItem('CapstoneAppId', data);
    appId = data;
  }
  return appId;
};

export const getLikes = async () => {
  const id = await createApp();
  const likes = await fetch(`${BASE_URL}/${id}/likes`,
    {
      method: 'GET',
    });
  let data = [];
  try {
    data = await likes.json();
  } catch (err) {
    data = [];
  }
  return data;
};

export const getComments = async (itemId) => {
  const id = await createApp();
  const comments = await fetch(`${BASE_URL}/${id}/comments?item_id=${itemId}`,
    {
      method: 'GET',
    });
  const data = await comments.json();
  return data;
};

export const createLike = async (id) => {
  const appId = await createApp();
  const likes = await fetch(`${BASE_URL}/${appId}/likes`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: id,
      }),
    });
  return likes;
};

export const createComment = async (id, name, comment) => {
  const appId = await createApp();
  const comments = await fetch(`${BASE_URL}/${appId}/comments`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: id,
        username: name,
        comment,
      }),
    });
  return comments;
};
