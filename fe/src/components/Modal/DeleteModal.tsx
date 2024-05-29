import { Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import MessageSuccess from "../Notification/MessageSuccess";
import nProgress from "nprogress";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY } from "@/api/queries/key";
import MessageError from "../Notification/MessageError";
import { ErrorResponseType, SuccessResponseType } from "@/types/global";
import ButtonComponent from "../Button";
import ConfirmationModal from "./ConfirmationModal";

export interface DeleteModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  param: number | string;
  mutationFn: (
    param: number | string
  ) => Promise<SuccessResponseType<unknown, number | string>>;
  mutationKey: MUTATION_KEY;
  onSuccess?: () => void;
  onError?: (
    err: ErrorResponseType<{ data?: unknown; message?: string }>
  ) => void;
}

const DeleteModal = <T,>(props: DeleteModalProps<T>) => {
  const {
    isOpen,
    onClose,
    title,
    param,
    mutationFn,
    mutationKey,
    onSuccess,
    onError,
  } = props;

  const onSuccessMutate = () => {
    toast.success(<MessageSuccess msg={"Hapus data berhasil"} />, {
      className: "toast-message-success",
    });
    if (onSuccess) onSuccess();
    onClose();
    nProgress.done();
  };

  const onErrorMutate = (
    err: ErrorResponseType<{ data?: unknown; message?: string }>
  ) => {
    toast.error(
      <MessageError msg={`Terjadi kesalahan, ${err.response?.data || err}`} />,
      { className: "toast-message-error" }
    );
    if (onError) onError(err);
    nProgress.done();
  };

  const { mutate } = useMutation({
    mutationFn: () => mutationFn(param),
    mutationKey: [mutationKey],
    onSuccess: onSuccessMutate,
    onError: onErrorMutate,
  });

  return (
    <ConfirmationModal
      open={isOpen}
      title={title}
      confirm="Hapus"
      cancel="Kembali"
      onConfirm={mutate}
      onClose={onClose}
      width={"230mm"}
      cancelFocused
    >
      <CloseCircleFilled className="alertIcon" />
    </ConfirmationModal>
  );
};

export default DeleteModal;
