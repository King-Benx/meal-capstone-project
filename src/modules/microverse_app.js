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
    });
  return likes.json();
};

export const getComments = async (itemId) => {
  const id = await createApp();
  const comments = await fetch(`${BASE_URL}/${id}/comments?item_id=${itemId}`,
    {
      method: 'GET',
    });
  return comments.json();
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
