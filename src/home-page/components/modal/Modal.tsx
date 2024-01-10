import { ReactElement } from "react";
import "./Modal.scss";

type ModalProps = {
  icon: ReactElement;
  header: string;
  paragraph: ReactElement;
  cancelButtonText: string;
  onCancelButtonClick: () => void;
  actionButtonText: string;
  onActionButtonClick: () => void;
  modalBody?: ReactElement;
  theme: "danger" | "functional";
  actionButtonDisabled?: boolean;
};

function Modal({
  icon,
  header,
  paragraph,
  cancelButtonText,
  onCancelButtonClick,
  actionButtonText,
  onActionButtonClick,
  modalBody,
  theme,
  actionButtonDisabled = false,
}: ModalProps) {
  return (
    <div className={`${theme}-theme`}>
      <div className="modal-wrapper">
        <div className="modal-content-wrapper">
          <div className="modal-icon">{icon}</div>
          <div className="modal-header">{header}</div>
          <div className="modal-text">{paragraph}</div>
          {modalBody}
        </div>
        <div className="modal-buttons-wrapper">
          <div className="cancel-button" onClick={onCancelButtonClick}>
            {cancelButtonText}
          </div>
          <div
            className={
              "action-button " + (actionButtonDisabled ? "disabled" : "")
            }
            onClick={onActionButtonClick}
          >
            {actionButtonText}
          </div>
        </div>
      </div>
      <div className="modal-background"></div>
    </div>
  );
}

export default Modal;
