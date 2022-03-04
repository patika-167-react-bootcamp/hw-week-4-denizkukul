import { useEffect, useState, useRef } from 'react';
import { ExpandIcon } from '..';

interface Props {
  options: string[];
  value: string;
  label: string;
  onChange: (val: string, index: number) => void;
  index: number;
}

export const ColorSelect = ({ options, value, label, onChange, index }: Props) => {
  // const [currentValue, setCurrentValue] = useState<number | null>(value);
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState<string | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let newValue = e.currentTarget.dataset.value;
    newValue && onChange(newValue, index);
    newValue && setColor(newValue);
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

  return (
    <div className={`select-container ${color} `} onClick={() => setExpanded(current => !current)}>
      <div className='select'>
        <div>{value === '' ? label : value}</div>
        <ExpandIcon expanded={expanded} />
      </div>
      {
        expanded &&
        <div className='options' ref={optionsRef}>
          {
            options.map((option, i) => {
              return <div className={`option ${option}`} data-value={option} key={i} onClick={handleSelect}>{option}</div>
            })
          }
        </div>
      }
    </div>
  )
}