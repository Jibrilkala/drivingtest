import React from 'react';

const ControlButtons = ({ activeQuestion, nextQuestion, prevQuestion, totalQuestions }) => {

  return (
    <div className='my-4 flex justify-between'>
      {activeQuestion > 0 && (
        <button onClick={prevQuestion} className='w-1/2 py-2 px-4 bg-gray-500 text-white rounded cursor-pointer'>
          Previous
        </button>
      )}
      <button onClick={nextQuestion} className='w-1/2 py-2 px-4 ml-auto bg-gray-500 text-white rounded cursor-pointer'>
        {activeQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default ControlButtons;
