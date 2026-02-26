const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const AUTH_STORAGE_KEY = 'joke_app_auth';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const getAuthHeader = () => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.token ? { Authorization: `Bearer ${parsed.token}` } : {};
    } catch {
      return {};
    }
  }
  return {};
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = data?.error || data?.message || `HTTP error ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data;
};

const api = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  },

  async post(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  async put(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  async delete(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  },

  jokes: {
    getAll: () => api.get('/jokes'),
    getById: (id) => api.get(`/jokes/${id}`),
    getRandom: () => api.get('/jokes/random'),
    create: (data) => api.post('/jokes', data),
    update: (id, data) => api.put(`/jokes/${id}`, data),
    delete: (id) => api.delete(`/jokes/${id}`),
  },
};

export { ApiError };
export default api;
