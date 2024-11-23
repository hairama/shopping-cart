
import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Optional if needed
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder, onKeyDown }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputField;



// // import { handleKeyDown, setItemToAdd, itemToAdd  } from './input';
// import { useState } from 'react';
// import { useFirebasePush } from '../../features/storage';
// export const [itemToAdd, setItemToAdd] = useState("")
// export default function InputButton() {
    


//     const pushData = useFirebasePush('shopping-list', {
//         name: itemToAdd,
//         status: "on_shopping_list"
//       });

//       function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
//         if (event.key === "Enter") {
//           getInput()
//         }
//       }
    
//       // Adds items to firebase
//       function getInput(): void {
//         if(itemToAdd !== "") {
//           pushData();
//         }
//         setItemToAdd("")
//       }


//     return (
//         <input 
//                 type="text" 
//                 id="input-field" 
//                 placeholder="Bread"
//                 value={itemToAdd}
//                 onChange={(e)=> setItemToAdd(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//     )
// }

