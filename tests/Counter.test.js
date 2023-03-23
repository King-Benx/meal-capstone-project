import counter from '../src/modules/helpers.js';

describe('Counter test', () => {
  test('counter returns number of shows or comments', () => {
    const comments = [{
      item_id: 1,
      username: 'John Doe',
      comment: 'comment 1',
    }, {
      item_id: 1,
      username: 'J B',
      comment: 'comment 2',
    }];

    const shows = [{
      item_id: 1,
      name: 'show 1',
      description: 'show 1 description',
    }, {
      item_id: 2,
      name: 'show 2',
      description: 'show 2 description',
    }];

    expect(counter(comments)).toBe(2);
    expect(counter(shows)).toBe(2);
  });
});