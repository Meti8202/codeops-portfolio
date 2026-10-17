export const fetcher = (url) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) {
      const error = new Error("Request failed");
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
