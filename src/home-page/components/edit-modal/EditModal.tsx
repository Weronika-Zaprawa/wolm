import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef } from "react";
import PencilOnPaperIcon from "../../../images/icons/pencilOnPaper";

function EditModal({
  setEditModalVisible,
}: {
  setEditModalVisible: (visible: boolean) => void;
}) {
  const today = new Date();
  console.log(today.toISOString());
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Modal
      header="Edycja plonów"
      icon={<PencilOnPaperIcon />}
      paragraph={<>Zaktualizuj informacje o plonach</>}
      modalBody={
        <HarvestForm
          onSubmit={(values) =>
            console.log(
              "🐶✏️ tutaj ten od Edycji, dostałem takie wartości: ",
              values
            )
          }
          formRef={formRef}
        />
      }
      theme="functional"
      cancelButtonText="Anuluj"
      onCancelButtonClick={() => {
        setEditModalVisible(false);
      }}
      actionButtonText="Edytuj"
      onActionButtonClick={() => {
        formRef.current?.requestSubmit();
        setEditModalVisible(false);
      }}
    />
  );
}

export default EditModal;
