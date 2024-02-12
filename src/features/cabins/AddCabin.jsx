import { useState } from 'react';
import Button from '../../ui/Button';
import Model from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel((s) => !s)}>Add new cabin</Button>
//       {isOpenModel && (
//         <Model onClose={() => setIsOpenModel((s) => !s)}>
//           <CreateCabinForm onClose={() => setIsOpenModel((s) => !s)} />
//         </Model>
//       )}
//     </div>
//   );
// }

function AddCabin() {
  return (
    <Model>
      <Model.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </Model.Open>
      <Model.Window name="cabin-form">
        <CreateCabinForm />
      </Model.Window>

      <Model.Open opens="table">
        <Button>Show table</Button>
      </Model.Open>
      <Model.Window name="table">
        <CabinTable />
      </Model.Window>
    </Model>
  );
}

export default AddCabin;
