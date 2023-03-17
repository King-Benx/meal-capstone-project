const sanitizeData = async () => {
  const sanitizedData = [];
  const BASE_URL = 'https://api.tvmaze.com/shows';

  const data = await fetch(BASE_URL, {
    method: 'GET',
  }).then((response) => response.json());
  for (let i = 0; i < data?.length; i += 1) {
    const {
      id, name, summary, image,
    } = data[i];
    sanitizedData.push({
      id: id.toString(),
      name,
      description: summary,
      url: image.original,
      likes: 10,
      comments: [
        {
          date: '01/01/2023',
          name: 'John Doe',
          comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda recusandae dolore',
        },
      ],
    });
  }
  return sanitizedData;
};

export default sanitizeData;