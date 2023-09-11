import Modal from "../modal/Modal";

function DeleteModal({
  setDeleteModalVisible,
}: {
  setDeleteModalVisible: (visible: boolean) => void;
}) {
  return (
    <Modal
      header="Usuwanie plonów"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="#D92D20"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
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
        setDeleteModalVisible(false);
      }}
      actionButtonText="Usuń"
      onActionButtonClick={() => {
        setDeleteModalVisible(false);
      }}
    />
  );
}
export default DeleteModal;
