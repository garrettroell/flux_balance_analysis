import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

// export const GlobalFilter = ({ filter, setFilter, content }) => {
//   const [value, setValue] = useState(filter);
//   const onChange = useAsyncDebounce(value => {
//     setFilter(value || undefined);
//   }, 1000);
//   return (
//     <Input
//       maxWidth="300px"
//       placeholder={`Filter ${content}`}
//       focusBorderColor="purple.600"
//       value={value || ''}
//       onChange={e => {
//         setValue(e.target.value);
//         onChange(e.target.value);
//       }}
//     />
//   );
// };

export const GlobalFilter = ({
  // preGlobalFilteredRows,
  // globalFilter,
  // setGlobalFilter,
  filter, setFilter, content
}) => {
  const count = content.length
  const [value, setValue] = React.useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}