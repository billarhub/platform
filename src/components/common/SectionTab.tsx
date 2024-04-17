import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TTabOption = {
  label: string;
  key: string;
};

interface SectionTabProps {
  options: TTabOption[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

function SectionTab({
  options,
  selectedOption,
  setSelectedOption,
}: SectionTabProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateUrlParam = (tab: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('tab', tab);
    const search = currentParams.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  React.useEffect(() => {
    if (options.length > 0) {
      const firstOption = options[0].key;
      setSelectedOption(firstOption);
      updateUrlParam(firstOption);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedOption(tab);
    updateUrlParam(tab);
  };

  return (
    <div className="flex w-full flex-row justify-center md:justify-start gap-3 mb-6">
      {options.map((option, index, array) => (
        <div key={option.key}>
          <button
            className={`py-2 font-bold uppercase ${
              selectedOption === option.key ? 'text-primary-500' : 'text-black'
            }`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setSelectedOption(option.key);
              handleTabClick(option.key);
            }}
          >
            {option.label}
          </button>
          {index !== 0 && index < array.length - 1 && (
            <div className="flex justify-center items-center">
              <div className="border-r-[3px] h-5 w-px border-lightGray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SectionTab;
