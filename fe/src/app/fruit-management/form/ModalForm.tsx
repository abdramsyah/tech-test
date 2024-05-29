import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import nProgress from "nprogress";
import { createFruit, editFruit } from "@/api/queries/fetch";
import { MUTATION_KEY } from "@/api/queries/key";
import MessageError from "@/components/Notification/MessageError";
import MessageSuccess from "@/components/Notification/MessageSuccess";
import { ErrorResponseType } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Input } from "@/components";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

interface UserManagementFormProps {
  isOpen: boolean;
  onClose: () => void;
  fuitData?: FruitType;
  refetchFruit: () => void;
}

export type FruitType = {
  id: number;
  name: string;
  color: string;
  price: string;
  stock: number;
  created_at: string;
  updated_at: string;
};

const FruitManagementForm: React.FC<UserManagementFormProps> = (
  props: UserManagementFormProps
) => {
  const { isOpen, onClose, fuitData, refetchFruit } = props;

  const isEditMode = !!fuitData;
  const [fruitPayload, setFruitPayload] = useState<FruitType>({
    id: 0,
    name: "",
    color: "",
    price: "0",
    stock: 0,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    if (isEditMode) {
      setFruitPayload(fuitData);
    }
  }, [fuitData, isEditMode]);

  const onSuccess = () => {
    toast.success(<MessageSuccess msg={"Sukses"} />, {
      className: "toast-message-success",
    });
    refetchFruit();
    onClose();
    nProgress.done();
  };

  const onError = (
    err: ErrorResponseType<{ data?: unknown; message?: string }>
  ) => {
    toast.error(
      <MessageError msg={`Terjadi kesalahan, ${err.response?.data || err}`} />,
      { className: "toast-message-error" }
    );
    nProgress.done();
  };

  const { mutate } = useMutation({
    mutationFn: () =>
      isEditMode
        ? editFruit(fruitPayload.id, fruitPayload)
        : createFruit(fruitPayload),
    mutationKey: isEditMode
      ? [MUTATION_KEY.FRUIT_EDIT]
      : [MUTATION_KEY.FRUIT_CREATE],
    onSuccess,
    onError,
  });

  return (
    <ConfirmationModal
      open={isOpen}
      title={isEditMode ? "Edit Fruit" : "Tambah Fruit"}
      confirm={isEditMode ? "Edit" : "Tambah"}
      cancel="Kembali"
      onConfirm={mutate}
      onClose={onClose}
    >
      <Input
        label="Fruit Name"
        placeholder="Fruit Name"
        value={fruitPayload?.name}
        onChange={(e) =>
          setFruitPayload((state) => ({ ...state, name: e.target.value }))
        }
        disabled={nProgress.isStarted()}
      />
      <Input
        label="Color"
        placeholder="Color"
        value={fruitPayload?.color}
        onChange={(e) =>
          setFruitPayload((state) => ({ ...state, color: e.target.value }))
        }
        disabled={nProgress.isStarted()}
      />
      <Input
        label="Price"
        placeholder="Price"
        value={fruitPayload?.price}
        type="number"
        onChange={(e) =>
          setFruitPayload((state) => {
            const newNum = parseInt(e.target.value);
            if (isNaN(newNum)) return { ...state, price: "0" };

            return { ...state, price: e.target.value };
          })
        }
        disabled={nProgress.isStarted()}
      />
      <Input
        label="Stock"
        placeholder="Stock"
        value={fruitPayload?.stock}
        type="number"
        onChange={(e) =>
          setFruitPayload((state) => {
            const newNum = parseInt(e.target.value);
            if (isNaN(newNum)) return { ...state, stock: 0 };

            return { ...state, stock: newNum };
          })
        }
        disabled={nProgress.isStarted()}
      />
    </ConfirmationModal>
  );
};

export default FruitManagementForm;
