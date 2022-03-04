import './Select.css';
import { ExpandIcon } from '..';
import { SelectLogic } from './SelectLogic';

interface Props {
  options: [Number, any][];
  value: number | string;
  label: string;
  onChange: (val: number) => void;
}

export const Select = ({ options, value, label, onChange }: Props) => {
  const { getName, expanded, toggleExpand, optionsRef, handleSelect } = SelectLogic({ options, value, onChange });
  return (
    <div className='select-container' onClick={toggleExpand}>
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