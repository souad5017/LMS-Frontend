
const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}, token = null) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`
        }),
        ...options.headers
      }
    });
  } catch {
    const error = new Error(
      "Impossible de contacter le serveur. Vérifiez votre connexion."
    );
    error.status = 0;
    throw error;
  }

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    const error = new Error(data.message || "Session expired");
    error.status = 401;
    throw error;
  }

  if (response.status === 403) {
    const error = new Error("Accès refusé");
    error.status = 403;
    throw error;
  }

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    throw error;
  }

  return data;
}
