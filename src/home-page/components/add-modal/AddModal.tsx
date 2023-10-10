import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef } from "react";
import PlusIcon from "../../../images/icons/plus";

function AddModal({
  setAddModalVisible,
}: {
  setAddModalVisible: (visible: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Modal
      header="Dodawanie plonów"
      icon={<PlusIcon />}
      paragraph={<>Dodaj nowe informacje o plonach</>}
      modalBody={
        <HarvestForm
          onSubmit={(values) =>
            console.log(
              "🐶➕ tutaj ten od Dodawania, dostałem takie wartości: ",
              values
            )
          }
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
        setAddModalVisible(false);
      }}
    />
  );
}

export default AddModal;
