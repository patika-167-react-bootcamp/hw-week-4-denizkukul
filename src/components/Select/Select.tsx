import './Select.css';
import { useEffect, useState, useRef } from 'react';
import { ExpandIcon } from '..';

interface Props {
  options: [Number, any][];
  value: number | string;
  label: string;
  onChange: (val: number) => void;
}

export const Select = ({ options, value, label, onChange }: Props) => {
  // const [currentValue, setCurrentValue] = useState<number | null>(value);
  const [expanded, setExpanded] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let newValue = Number(e.currentTarget.dataset.value);
    onChange(newValue);
    // setCurrentValue(newValue);
    console.log(value);
  }

  const close = (e: MouseEvent) => {
    if (optionsRef.current && e.currentTarget !== optionsRef.current) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    if (expanded) {
      window.addEventListener("click", close);
    }
    else {
      window.removeEventListener("click", close);
    }
    return () => { window.removeEventListener("click", close) }
  }, [expanded])

  const getName = () => {
    let item = options.find(item => item[0] === value);
    if (item) return item[1].title;
  }

  return (
    <div className='select-container' onClick={() => setExpanded(current => !current)}>
      <div className='select'>
        <div>{value === 0 ? label : getName()}</div>
        <ExpandIcon expanded={expanded} />
      </div>
      {
        expanded &&
        <div className='options' ref={optionsRef}>
          {
            options.map((option, i) => {
              return <div className='option' data-value={option[0]} key={i} onClick={handleSelect}>{option[1].title}</div>
            })
          }
        </div>
      }
    </div>
  )
}