import { ExpandIcon } from '..';
import { ColorSelectLogic } from './ColorSelectLogic';

interface Props {
  options: string[];
  value: string;
  label: string;
  index: number;
  onChange: (val: string, index: number) => void;
}

export const ColorSelect = ({ options, value, label, onChange, index }: Props) => {
  const { handleSelect, optionsRef, expanded, toggleExpand } = ColorSelectLogic({ onChange, index });

  return (
    <div className={`select-container ${value} `} onClick={toggleExpand}>
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