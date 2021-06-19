import React from "react";

interface PropsTypes {
  children: string,
  className?: string,
  edit?: boolean,
  setEdit?(arg0 : boolean): void
};

const style = "mt-4 text-gray-900 title-font text-lg font-medium";

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400 group-hover:opacity-100 opacity-0 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

export const CardTitle:React.FC<PropsTypes> = ({ children, className, edit, setEdit }) => (
  <>
    {(!!setEdit && edit) && <input value={children} className={style} onBlur={() => setEdit(false)} />}
    {!edit && (
      <h2
        className={`${style} ${className}`}
        onDoubleClick={() => !!setEdit && setEdit(true)}
        title={!!setEdit ? "Double click!" : ""}
      >
        {children}
        {!!setEdit && <PencilIcon />}
      </h2>
    )}
  </>
);
