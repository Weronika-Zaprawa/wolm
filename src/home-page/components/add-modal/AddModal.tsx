import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef, useState } from "react";
import { PlusIcon } from "../../../images/icons";
import { useHarvest } from "../../services/HarvestContext";
import { useAuth } from "../../services/AuthContext";

function AddModal({
  setAddModalVisible,
}: {
  setAddModalVisible: (visible: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { getFruits, fruits } = useHarvest();
  const { handleFetch } = useAuth();

  const [formSubmitInProgress, setFormSubmitInProgress] =
    useState<boolean>(false);

  return (
    <Modal
      actionButtonDisabled={formSubmitInProgress}
      header="Dodawanie plonów"
      icon={<PlusIcon />}
      paragraph={<>Dodaj nowe informacje o plonach</>}
      modalBody={
        <HarvestForm
          onSubmit={async (values) => {
            setFormSubmitInProgress(true);
            await handleFetch(`https://wolm.onrender.com/harvests`, {
              method: "POST",
              body: JSON.stringify(values),
            });

            setAddModalVisible(false);

            getFruits(fruits.pagination.page);
          }}
          formRef={formRef}
        />
      }
      theme="functional"
      cancelButtonText="Anuluj"
      onCancelButtonClick={() => {
        setAddModalVisible(false);
      }}
      actionButtonText="Dodaj"
      onActionButtonClick={() => {
        formRef.current?.requestSubmit();
      }}
    />
  );
}

export default AddModal;
