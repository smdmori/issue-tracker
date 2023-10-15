'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiErrorAlt } from 'react-icons/bi'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState('')

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Icon>
            <BiErrorAlt />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setError('An unexpected error occurred.')
          console.log(error);
        }
      })}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage