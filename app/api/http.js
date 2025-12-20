export async function requestJson(input, init) {
  const res = await fetch(input, init);
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && typeof data.message === "string"
        ? data.message
        : `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}
