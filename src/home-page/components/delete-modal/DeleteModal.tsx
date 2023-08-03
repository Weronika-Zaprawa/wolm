import "./DeleteModal.scss";

function DeleteModal() {
  return (
    <div>
      <div className="delete-modal-wrapper">
        <div className="modal-content-wrapper">
          <div className="modal-icon">
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
          </div>
          <div className="modal-header">Usuwanie plonów </div>
          <div className="modal-text">
            Czy na pewno chcesz usunąć te plony?
            <br />
            Ta akcja jest nieodwracalna.
          </div>
        </div>
        <div className="modal-buttons-wraper">
          <div className="cancel-button">Anuluj</div>
          <div className="delete-button">Usuń</div>
        </div>
      </div>
      <div className="delete-modal-background"></div>
    </div>
  );
}
export default DeleteModal;
