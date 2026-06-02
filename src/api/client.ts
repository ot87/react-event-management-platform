const BASE_URL = "http://localhost:3001";

type FetchMethod = "GET" | "POST" | "PATCH";

export async function fetchData(
  method: FetchMethod,
  endpoint: string,
  payload?: unknown,
) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      ...(method === "GET"
        ? {}
        : {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Fetch failed", { cause: error });
  }
}
