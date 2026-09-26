import { useEffect, useState } from "react";

export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result =
          typeof fetcher === "function"
            ? await fetcher()
            : await fetch(fetcher).then((res) => {
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                return res.json();
              });

        if (!ignore) setData(result);
      } catch (err) {
        if (!ignore) setError(err.message || "Something went wrong.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [fetcher]);

  return { data, loading, error };
}
