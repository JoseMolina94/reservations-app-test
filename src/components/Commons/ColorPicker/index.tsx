'use client'

import { ChangeEvent, useEffect, useState } from 'react';

type ColorPickerProps = {
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export default function ColorPicker (props: ColorPickerProps) {
  const {
    name,
    value = '#ff0000',
    onChange = (event: ChangeEvent<HTMLInputElement>) => {}
  } = props
  const [color, setColor] = useState<string>(value);
  const [loadingClient, setLoadingClient] = useState<boolean>(true)

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    onChange(event);
  };

  useEffect(() => {
    setLoadingClient(false)
  }, [])

  return ( 
    !loadingClient &&
      <div className='space-y-1'>
        <p className='text-xs'>Elige un color:</p>
        <input
          type="color"
          value={color}
          name={name}
          onChange={handleChange}
          className='w-full'
        />
      </div>
  );
};