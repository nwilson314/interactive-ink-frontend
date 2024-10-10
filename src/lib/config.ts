import { browser } from '$app/environment';

let API_BASE_URL: string;

if (browser) {
  // Running in the browser
  API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
} else {
  // Running on the server
  API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000';
}

export { API_BASE_URL };
