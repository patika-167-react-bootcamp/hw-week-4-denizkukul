import { useEffect, useRef, useState } from "react";

interface Props {
  index: number;
  onChange: (val: string, index: number) => void;
}

export const ColorSelectLogic = ({ onChange, index }: Props) => {
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
    // TODO: DOES THIS REMOVE EVENT LISTENER ?
    return () => { window.removeEventListener("click", close) }
  }, [expanded])

  const toggleExpand = () => {
    setExpanded(current => !current);
  }

  return { expanded, toggleExpand, optionsRef, color, handleSelect }
}