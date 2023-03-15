import '../styles/style.scss';

const mainContent = document.getElementById('mainSection');

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
            <button id=${id}>Comments</button>
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

const initialize = (element) => {
  const dummyData = [
    {
      id: 1,
      name: 'Meal 1',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 2,
      name: 'Meal 2',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 3,
      name: 'Meal 3',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 4,
      name: 'Meal 4',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 5,
      name: 'Meal 5',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 6,
      name: 'Meal 6',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 7,
      name: 'Meal 7',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 8,
      name: 'Meal 8',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 9,
      name: 'Meal 9',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 10,
      name: 'Meal 10',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 11,
      name: 'Meal 11',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
    {
      id: 12,
      name: 'Meal 12',
      url: 'https://placehold.co/200x200/png',
      likes: 10,
    },
  ];
  populateView(dummyData, element);
};

document.addEventListener('DOMContentLoaded', () => initialize(mainContent));