import React, { useState } from "react";
import { context } from "utils";

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="card__title-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

interface PropsTypes {
  children: string,
  editable?: boolean,
  onChange?(arg0: string): void
};

const CardTitle:React.FC<PropsTypes> = ({ children, editable, onChange }) => {
  const { query } : { query : string } = React.useContext<any>(context);
  const [value, setValue] = useState<string>(children || '');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onChange) {
      if (!value.trim()) {
        setValue(children);
        setIsEdit(false);
        alert('Input is empty');
        return;
      }
      onChange(value.trim());
      setValue(value.trim());
      setIsEdit(false);
    }
  };

  const Title = () => {
    const parts = children.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            className={part.toLowerCase() === query.toLowerCase() ? 'bg-yellow-400' : ''}
          >
            {part}
          </span>
        ))}
      </span>
    )
  };

  return (
    <>
      {(!!editable && isEdit) && (
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="card__title-input"
          onBlur={() => setIsEdit(false)}
        />
      )}
      {!isEdit && (
        <h2
          className="card__title group"
          onDoubleClick={() => !!editable && setIsEdit(true)}
          title={!!editable ? "Double click!" : ""}
        >
          <Title />
          {!!editable && <PencilIcon />}
        </h2>
      )}
    </>
  );
};

export default CardTitle;
