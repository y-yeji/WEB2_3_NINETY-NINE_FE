import ShortButton from "./ShortButton";
import { useModalStore } from "../../stores/modalStore";
import Icon from "../../assets/icons/Icon";

const Modal = () => {
  const { isOpen, text, cancelText, confirmText, onConfirm, closeModal } =
    useModalStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  };

  const onlyConfirmButton = !cancelText || !confirmText;

  return (
    <div className="fixed inset-0 bg-blue-7 bg-opacity-30 flex items-center justify-center z-50">
      <div className="w-[400px] h-[270px] border rounded-[20px] bg-blue-7 flex flex-col justify-center relative text-white z-51">
        <button className="absolute top-4 right-4" onClick={closeModal}>
          <Icon name="X" />
        </button>

        <h2 className="text-[32px] font-dm italic text-blue-1 text-center">
          On culture
        </h2>

        <p className="text-center mt-[17px] text-body-s-r text-base-1 whitespace-pre-line leading-loose">
          {text}
        </p>

        <div
          className={`flex justify-center mt-[32px] z-52 ${
            onlyConfirmButton ? "" : "gap-5"
          }`}
        >
          {cancelText && (
            <ShortButton
              text={cancelText}
              textColor="blue-1"
              bgColor="base-1"
              onClick={closeModal}
            />
          )}
          {confirmText && (
            <ShortButton
              text={confirmText}
              textColor="base-1"
              bgColor="blue-1"
              hoverColor="blue-4"
              onClick={handleConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
