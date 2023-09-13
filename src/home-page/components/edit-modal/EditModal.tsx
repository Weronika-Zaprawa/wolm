import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef } from "react";

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
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11 4.00001H4C3.46957 4.00001 2.96086 4.21073 2.58579 4.5858C2.21071 4.96087 2 5.46958 2 6.00001V20C2 20.5304 2.21071 21.0392 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0392 20 20.5304 20 20V13M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
            stroke="#7F56D9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
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
