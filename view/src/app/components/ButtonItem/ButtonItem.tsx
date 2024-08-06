'use client'
import { useState } from "react";
import { ModalComponent } from '../ModalComponent/ModalComponent';

const ButtonItem = ({value}) => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);
  return (
    <>
      <button onClick={openDialog} className="button mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">{value}</button>
      <ModalComponent value={value} isVisible={isDialogVisible} onClose={closeDialog} />
    </>
  )
}

export default ButtonItem
