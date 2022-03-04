import { useEffect, useState, useRef } from 'react';

interface Props {
  options: [Number, any][];
  value: number | string;
  onChange: (val: number) => void;
}

export const SelectLogic = ({ options, value, onChange }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let newValue = Number(e.currentTarget.dataset.value);
    onChange(newValue);
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
    // TODO: DOES THIS REMOVE EVENT LISTENER ?
    return () => { window.removeEventListener("click", close) }
  }, [expanded])

  const getName = () => {
    let item = options.find(item => item[0] === value);
    if (item) return item[1].title;
  }

  const toggleExpand = () => {
    setExpanded(current => !current);
  }

  return { handleSelect, close, getName, expanded, toggleExpand, optionsRef }
}