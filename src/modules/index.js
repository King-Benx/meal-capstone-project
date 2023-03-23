import '../styles/style.scss';
import sanitizeData from './data.js';
import { createLike, getComments, createComment } from './microverse_app.js';
import { populateView, populateCardTable } from './render.js';
import counter from './helpers.js';

const mainContent = document.getElementById('mainSection');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.modal-close');
const cardImage = document.getElementById('card-image');
const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const itemId = document.getElementById('item-id');
const formName = document.getElementById('name');
const formComment = document.getElementById('comment');
const formSubmit = document.getElementById('submit');
const form = document.getElementById('form');
const commentNumber = document.getElementById('comment-number');
const showCount = document.getElementById('show-count');

const refresh = async () => {
  const shows = await sanitizeData();
  const count = counter(shows);
  showCount.innerText = count;
  populateView(shows, mainContent);
};

mainContent.addEventListener('click', async (e) => {
  const targetModal = e.target.closest('.open-modal');
  const targetLike = e.target.closest('.modal-likes');
  if (targetModal) {
    const apiData = await sanitizeData();
    const comments = await getComments(targetModal.id);
    const commentCount = counter(comments);
    const {
      id, name, url, description,
    } = apiData.filter((it) => it.id.toString() === targetModal.id)[0];
    cardImage.setAttribute('src', url);
    modalName.innerText = name;
    modalDescription.innerHTML = description;
    itemId.setAttribute('value', id);
    populateCardTable(comments);
    commentNumber.innerText = commentCount || 0;
    document.body.style = 'filter: blur(5px)';
    modal.showModal();
  }
  if (targetLike) {
    await createLike(targetLike.id);
    await refresh();
  }
});

closeModal.addEventListener('click', () => {
  document.body.style = 'filter:unset';
  modal.close();
});

formSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  await createComment(itemId.value, formName.value, formComment.value);
  const comments = await getComments(itemId.value);
  populateCardTable(comments);
  form.reset();
  await refresh();
});

document.addEventListener('DOMContentLoaded', async () => {
  await refresh();
});
