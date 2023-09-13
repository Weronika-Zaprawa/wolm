import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef } from "react";

function AddModal({
  setAddModalVisible,
}: {
  setAddModalVisible: (visible: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Modal
      header="Dodawanie plonów"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="#7F56D9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
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
