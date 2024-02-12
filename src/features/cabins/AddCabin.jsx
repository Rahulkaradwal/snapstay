import { useState } from 'react';
import Button from '../../ui/Button';
import Model from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModel((s) => !s)}>Add new cabin</Button>
      {isOpenModel && (
        <Model onClose={() => setIsOpenModel((s) => !s)}>
          <CreateCabinForm onClose={() => setIsOpenModel((s) => !s)} />
        </Model>
      )}
    </div>
  );
}

export default AddCabin;
