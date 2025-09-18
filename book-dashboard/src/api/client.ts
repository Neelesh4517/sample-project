import axios from 'axios'

// Replace with your crudcrud endpoint base
// Example: https://crudcrud.com/api/xxxxxxxxxxxxxxx
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})


