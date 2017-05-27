class FetchData {
  static async init(url) {
    const response = await FetchData.get(url);
    const data = await response.json();

    if (response.status !== 200) {
      throw data.message || response.statusText + response.status;
    }

    return data;
  }

  static async get(url) {
    const response = await fetch(url);
    return response;
  }
}

export default FetchData;
