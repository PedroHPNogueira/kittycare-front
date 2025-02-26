import React from 'react';
import { CatItem } from '../types/catItems';

interface CatItemCardProps {
  item: CatItem;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

const CatItemCard: React.FC<CatItemCardProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(item.title)}
      className={`flex cursor-pointer items-start items-center rounded-2xl border-2 p-4 transition-all duration-300 lg:p-5 ${
        isSelected ? 'bg-lightBlue border-primaryBlue' : 'border-lightGray2'
      }`}
    >
      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primaryBlue">
        <img src={item.icon} alt={`${item.title} icon`} className="h-12 w-12" />
      </div>
      <div className="flex-1">
        <h3 className="text-md mb-1 font-semibold">{item.title}</h3>
        <p className="text-sm text-darkGray">{item.description}</p>
      </div>
      <div
        className={`ml-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 lg:h-6 lg:w-6 ${
          isSelected ? 'border-primaryBlue' : 'border-lightGray2'
        }`}
      >
        {isSelected && (
          <span className="h-3 w-3 rounded-full bg-primaryBlue lg:h-3 lg:w-3" />
        )}
      </div>
    </div>
  );
};

export default CatItemCard;
