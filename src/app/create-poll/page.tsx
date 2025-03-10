import CreatePollForm from '@/components/CreatePullForm'
import React from 'react'

const CreatePoll = () => {
  return (
    <div className="container mx-auto">
      <div className='flex flex-col justify-center items-center mb-8'>
        <h2 className='text-2xl font-bold'>Create a New Poll</h2>
        <p>
          Your poll will automatically expire and vanish after the selected
          time.
        </p>
      </div>
      <CreatePollForm />
    </div>
  );
}

export default CreatePoll