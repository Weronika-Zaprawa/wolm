import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef, useEffect } from "react";
import PencilOnPaperIcon from "../../../images/icons/pencilOnPaper";
import { useHarvest } from "../../services/HarvestContext";
import Spinner from "../spinner/Spinner";

type EditModalProps = {
  setFruitToEditId: (fruitId: string | null) => void;
  fruitToEditId: string;
};

function EditModal({ setFruitToEditId, fruitToEditId }: EditModalProps) {
  const today = new Date();
  console.log(today.toISOString());
  const formRef = useRef<HTMLFormElement>(null);
  const { fruit, setFruit, getFruitDetails, getFruits, fruits } = useHarvest();

  useEffect(() => {
    getFruitDetails(fruitToEditId);
  }, []);

  return (
    <Modal
      header="Edycja plonów"
      icon={<PencilOnPaperIcon />}
      paragraph={<>Zaktualizuj informacje o plonach</>}
      modalBody={
        fruit === undefined ? (
          <div
            style={{ height: "360px", position: "relative", width: "430px" }}
          >
            <Spinner />
          </div>
        ) : (
          <HarvestForm
            onSubmit={async (values) => {
              await fetch(
                `https://wolm.onrender.com/harvests/${fruitToEditId}`,
                {
                  method: "PUT",
                  body: JSON.stringify(values),
                  headers: { "Content-Type": "application/json" },
                }
              );
              setFruitToEditId(null);
              setFruit(undefined);
              getFruits(fruits.pagination.page);
            }}
            formRef={formRef}
          />
        )
      }
      theme="functional"
      cancelButtonText="Anuluj"
      onCancelButtonClick={() => {
        setFruit(undefined);
        setFruitToEditId(null);
      }}
      actionButtonText="Edytuj"
      onActionButtonClick={() => {
        formRef.current?.requestSubmit();
      }}
    />
  );
}

export default EditModal;
