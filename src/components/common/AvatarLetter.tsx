import React from 'react';

interface AvatarLetterProps {
  name: string;
  lastName?: string;
}

function AvatarLetter({ name, lastName }: AvatarLetterProps) {
  const initial = name[0].toUpperCase();
  const lastNameInitial = lastName ? lastName[0].toUpperCase() : null;

  const colors = [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  const randomColor = React.useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [name]);

  return (
    <div
      className={`h-100 md:h-32 w-32 rounded-lg md:text-4xl text-xl text-white flex items-center justify-center ${randomColor}`}
    >
      {initial}{lastNameInitial}
    </div>
  );
}

export default React.memo(AvatarLetter);
