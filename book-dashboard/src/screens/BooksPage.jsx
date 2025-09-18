import React, { useMemo, useState } from 'react'
import { useBooks, useCreateBook, useDeleteBook, useUpdateBook } from '../hooks/useBooks'
import {
  Box, Button, Dialog, IconButton, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import BookForm from '../components/BookForm'
import { toast } from 'sonner'

const PAGE_SIZE = 10

const BooksPage = () => {
  const { data: books = [], isLoading } = useBooks()
  const createBook = useCreateBook()
  const updateBook = useUpdateBook()
  const deleteBook = useDeleteBook()

  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return books.filter(b =>
      (s === '' || b.title?.toLowerCase().includes(s) || b.author?.toLowerCase().includes(s)) &&
      (genre === '' || b.genre === genre) &&
      (status === '' || b.status === status)
    )
  }, [books, search, genre, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleAdd = () => { setEditing(null); setOpen(true) }
  const handleEdit = (b) => { setEditing(b); setOpen(true) }
  const handleDelete = async (b) => {
    const ok = confirm(`Delete "${b.title}"?`)
    if (!ok || !b._id) return
    try {
      await deleteBook.mutateAsync(b._id)
      toast.success('Book deleted')
    } catch (e) {
      toast.error('Failed to delete')
    }
  }

  const handleSubmit = async (values) => {
    try {
      if (editing && editing._id) {
        await updateBook.mutateAsync({ id: editing._id, data: values })
        toast.success('Book updated')
      } else {
        await createBook.mutateAsync(values)
        toast.success('Book added')
      }
      setOpen(false)
    } catch (e) {
      toast.error('Failed to save')
    }
  }

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>Book Management</Typography>

      <Toolbar disableGutters sx={{ gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField size="small" label="Search by Title or Author" value={search} onChange={e => setSearch(e.target.value)} />
        <TextField size="small" select label="Genre" value={genre} onChange={e => setGenre(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Fiction">Fiction</MenuItem>
          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
          <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
          <MenuItem value="Romance">Romance</MenuItem>
        </TextField>
        <TextField size="small" select label="Status" value={status} onChange={e => setStatus(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Issued">Issued</MenuItem>
        </TextField>
        <Box flex={1} />
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAdd}>Add Book</Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
            ) : paged.length === 0 ? (
              <TableRow><TableCell colSpan={6}>No books found</TableCell></TableRow>
            ) : (
              paged.map(b => (
                <TableRow key={b._id || b.title} hover>
                  <TableCell>{b.title}</TableCell>
                  <TableCell>{b.author}</TableCell>
                  <TableCell>{b.genre}</TableCell>
                  <TableCell>{b.year}</TableCell>
                  <TableCell>{b.status}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(b)} size="small"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(b)} size="small" color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} />
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <Typography px={3} pt={2} variant="h6">{editing ? 'Edit Book' : 'Add Book'}</Typography>
        <BookForm defaultValues={editing ?? undefined} onCancel={() => setOpen(false)} onSubmit={handleSubmit} />
      </Dialog>
    </Box>
  )
}

export default BooksPage




