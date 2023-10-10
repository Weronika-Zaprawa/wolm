import ExclamationMarkIcon from "../../../images/icons/exclamationMark";
import { useHarvest } from "../../services/HarvestContext";
import Modal from "../modal/Modal";

type DeleteModalProps = {
  setFruitToDeleteId: (fruitId: string | null) => void;
  fruitToDeleteId: string;
};

function DeleteModal({
  setFruitToDeleteId,
  fruitToDeleteId,
}: DeleteModalProps) {
  const { fruits, getFruits, deleteFruit } = useHarvest();

  return (
    <Modal
      header="Usuwanie plonów"
      icon={<ExclamationMarkIcon />}
      paragraph={
        <>
          Czy na pewno chcesz usunąć te plony?
          <br />
          Ta akcja jest nieodwracalna.
        </>
      }
      theme="danger"
      cancelButtonText="Anuluj"
      onCancelButtonClick={() => {
        setFruitToDeleteId(null);
      }}
      actionButtonText="Usuń"
      onActionButtonClick={async () => {
        await deleteFruit(fruitToDeleteId);
        getFruits(fruits.pagination.page);
        setFruitToDeleteId(null);
      }}
    />
  );
}
export default DeleteModal;
