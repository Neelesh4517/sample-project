import { api } from './client'

export async function listBooks() {
  const { data } = await api.get('/books')
  return data
}

export async function createBook(payload) {
  const { data } = await api.post('/books', payload)
  return data
}

export async function updateBook(id, payload) {
  await api.put(`/books/${id}`, payload)
}

export async function deleteBook(id) {
  await api.delete(`/books/${id}`)
}




