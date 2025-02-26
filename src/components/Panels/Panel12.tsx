import React from 'react';
import { useEffect, useState } from 'react';
import NavigationButtons from '../NavigationButtons';
import CatItemCard from './components/CatItemCard';
import { CAT_ITEMS } from './constants/catItems';
import { Panel12Props } from './types/catItems';

const LOCAL_STORAGE_KEY = 'items';

const Panel12: React.FC<Panel12Props> = ({ nextStep, previousStep }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }
  }, []);

  const handleItemClick = (title: string) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-lg p-4 font-inter lg:max-w-5xl lg:p-6">
      <header className="mb-6 text-center lg:mb-8">
        <h1 className="mb-2 text-xl font-bold">What Cat Items Do You Own?</h1>
        <p className="lg:text-md mx-auto max-w-2xl text-sm text-darkGray">
          Let us know what cat-related items you have at home so we can tailor
          our tips and recommendations.
        </p>
      </header>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-24">
        {CAT_ITEMS.map((item) => (
          <CatItemCard
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.title)}
            onSelect={handleItemClick}
          />
        ))}
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={selectedItems.length === 0}
      />
    </div>
  );
};

export default Panel12;
