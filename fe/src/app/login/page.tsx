"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { STORAGE_KEY } from "@/constants/localStorageKey";
import { LoginPayload, login } from "@/api/queries/fetch";
import { toast } from "react-toastify";
import MessageError from "@/components/Notification/MessageError";
import { Button, Input } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY } from "@/api/queries/key";
import { ErrorResponseType, SuccessResponseType } from "@/types/global";
import MessageSuccess from "@/components/Notification/MessageSuccess";
import { AuthDataType } from "@/types/auth";

import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const onSuccess = (res: SuccessResponseType<AuthDataType, LoginPayload>) => {
    console.log("onSuccess - res", res);
    toast.success(<MessageSuccess msg={"Login sukses"} />, {
      className: "toast-message-success",
    });
    try {
      localStorage.setItem(STORAGE_KEY.TOKEN, res?.data.data.access_token);
    } catch (error) {
      console.log("onSuccess - error", error);
    }
    router.replace("/fruit-management");
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
    mutationFn: () => login(loginPayload),
    mutationKey: [MUTATION_KEY.LOGIN],
    onSuccess,
    onError,
  });

  useEffect(() => {
    document.title = `Tech | Login`;
  }, []);

  return (
    <div className="login-page">
      <div className="box-form">
        <div className="welcome-box">
          <div className="credentials-text">
            Masukan username dan password anda.
          </div>
        </div>

        <div className="form-input">
          <Input
            label="Email"
            disabled={nProgress.isStarted()}
            placeholder="Email"
            onChange={(e) =>
              setLoginPayload((state) => ({
                ...state,
                username: e.target.value,
              }))
            }
          />
          <Input
            label="Password"
            disabled={nProgress.isStarted()}
            placeholder="Password"
            customType="PASSWORD"
            onChange={(e) =>
              setLoginPayload((state) => ({
                ...state,
                password: e.target.value,
              }))
            }
          />
          <Button
            title="Login"
            type="button"
            loading={nProgress.isStarted()}
            disabled={nProgress.isStarted()}
            onClick={mutate}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
