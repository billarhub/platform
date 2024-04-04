import React from 'react';

interface AvatarLetterProps {
  name: string;
}

function AvatarLetter({ name }: AvatarLetterProps) {
  const initial = name[0].toUpperCase();

  const colors = [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`h-32 w-32 rounded-lg md:text-4xl text-xl text-white flex items-center justify-center ${randomColor}`}
    >
      {initial}
    </div>
  );
}

export default AvatarLetter;
