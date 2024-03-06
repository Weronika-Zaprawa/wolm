import Modal from "../modal/Modal";
import HarvestForm from "../harvest-form/HarvestForm";
import { useRef, useEffect } from "react";
import { PencilOnPaperIcon } from "../../../images/icons";
import { useHarvest } from "../../services/HarvestContext";
import Spinner from "../spinner/Spinner";
import { useAuth } from "../../services/AuthContext";

type EditModalProps = {
  setFruitToEditId: (fruitId: string | null) => void;
  fruitToEditId: string;
};

function EditModal({ setFruitToEditId, fruitToEditId }: EditModalProps) {
  const today = new Date();
  console.log(today.toISOString());
  const formRef = useRef<HTMLFormElement>(null);

  const { fruit, setFruit, getFruitDetails, getFruits, fruits } = useHarvest();
  const { handleFetch } = useAuth();

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
              await handleFetch(
                `https://wolm.onrender.com/harvests/${fruitToEditId}`,
                {
                  method: "PUT",
                  body: JSON.stringify(values),
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
