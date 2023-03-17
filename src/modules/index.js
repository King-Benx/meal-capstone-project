import '../styles/style.scss';
import sanitizeData from './data.js';

const mainContent = document.getElementById('mainSection');

const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.modal-close');
const cardImage = document.getElementById('card-image');
const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const itemId = document.getElementById('item-id');
const tableBody = document.getElementById('table-body');

const createCard = (id, url, name, likes, element) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
         <div class="card-image">
            <img src=${url} alt="" />
          </div>
          <div class="card-body">
            <div class="card-name">
              <span>${name}</span>
            </div>
            <div class="card-likes">
              <svg
                fill="#919191"
                height="16px"
                width="16px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 471.701 471.701"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path
                      d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"
                    ></path>
                  </g>
                </g>
              </svg>
              <span>${likes} Likes</span>
            </div>
          </div>
          <div class="card-footer">
            <button id=${id} class="open-modal">Comments</button>
          </div>
    `;
  element.append(card);
};

const populateView = (data, element) => {
  element.innerHTML = '';
  for (let i = 0; i < data.length; i += 1) {
    const {
      id, url, name, likes,
    } = data[i];
    createCard(id, url, name, likes, element);
  }
};

const createTableRow = (date, name, comment) => {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
   <tr>
    <td>${date} ${name}:</td>
    <td>${comment}</td>
  </tr>
  `;
  tableBody.append(tableRow);
};

const populateCardTable = (data) => {
  tableBody.innerHTML = '';
  for (let i = 0; i < data.length; i += 1) {
    const { date, name, comment } = data[i];
    createTableRow(date, name, comment);
  }
};

mainContent.addEventListener('click', async (e) => {
  const target = e.target.closest('.open-modal');
  if (target) {
    const apiData = await sanitizeData();
    const {
      id, name, url, description, comments,
    } = apiData.filter((it) => it.id.toString() === target.id)[0];
    cardImage.setAttribute('src', url);
    modalName.innerText = name;
    modalDescription.innerHTML = description;
    itemId.setAttribute('value', id);
    populateCardTable(comments);
    document.body.style = 'filter: blur(5px)';
    modal.showModal();
  }
});

closeModal.addEventListener('click', () => {
  document.body.style = 'filter:unset';
  modal.close();
});

const initialize = async (element) => populateView(await sanitizeData(), element);
document.addEventListener('DOMContentLoaded', () => initialize(mainContent));