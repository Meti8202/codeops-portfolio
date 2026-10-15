export const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      const error = new Error("Request failed");
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
