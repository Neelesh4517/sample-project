import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBook, deleteBook, listBooks, updateBook } from '../api/books'

export function useBooks() {
  return useQuery({ queryKey: ['books'], queryFn: () => listBooks({}) })
}

export function useCreateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] })
  })
}

export function useUpdateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] })
  })
}

export function useDeleteBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] })
  })
}




