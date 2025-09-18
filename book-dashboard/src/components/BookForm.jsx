import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, DialogActions, DialogContent, Grid, MenuItem, TextField } from '@mui/material'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  year: z.coerce.number().int().min(0, 'Year must be valid'),
  status: z.enum(['Available', 'Issued'])
})

const BookForm = ({ defaultValues, onCancel, onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || '',
      author: defaultValues?.author || '',
      genre: defaultValues?.genre || '',
      year: defaultValues?.year || new Date().getFullYear(),
      status: defaultValues?.status || 'Available'
    }
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Author" {...register('author')} error={!!errors.author} helperText={errors.author?.message} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Genre" {...register('genre')} error={!!errors.genre} helperText={errors.genre?.message} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth type="number" label="Published Year" {...register('year')} error={!!errors.year} helperText={errors.year?.message} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Status" defaultValue={'Available'} {...register('status')} error={!!errors.status} helperText={errors.status?.message}>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Issued">Issued</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">Cancel</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
      </DialogActions>
    </Box>
  )
}

export default BookForm




