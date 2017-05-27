import fetchMock from 'fetch-mock';
import FetchData from '../src/scripts/utilities/fetchData';

const items = {
  key: 'value',
};

const url = 'http://nav.com';

describe('Fetching data', () => {
  it('Get data', async () => {
    fetchMock.get(url, items);

    const response = await FetchData.get(url);
    const result = await response.json();

    expect(JSON.stringify(result)).toEqual(JSON.stringify(items));
  });

  it('Return data', async () => {
    fetchMock.get(url, items);

    const result = await FetchData.init(url);

    expect(JSON.stringify(result)).toEqual(JSON.stringify(items));
  });
});
