import '../styles/style.scss';
import sanitizeData from './data.js';
import { createLike, getComments, createComment } from './microverse_app.js';
import { populateView, populateCardTable } from './render.js';

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

const refresh = async () => populateView(await sanitizeData(), mainContent);

mainContent.addEventListener('click', async (e) => {
  const targetModal = e.target.closest('.open-modal');
  const targetLike = e.target.closest('.modal-likes');
  if (targetModal) {
    const apiData = await sanitizeData();
    const comments = await getComments(targetModal.id);
    const {
      id, name, url, description,
    } = apiData.filter((it) => it.id.toString() === targetModal.id)[0];
    cardImage.setAttribute('src', url);
    modalName.innerText = name;
    modalDescription.innerHTML = description;
    itemId.setAttribute('value', id);
    populateCardTable(comments);
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
  form.reset();
  document.body.style = 'filter:unset';
  modal.close();
  await refresh();
});

document.addEventListener('DOMContentLoaded', async () => {
  await refresh();
});
