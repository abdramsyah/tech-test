import { SearchParams, SuccessResponseType, TableType } from "@/types/global";
import { httpClient } from "../httpClient";
import { ENDPOINT } from "./endpoint";
import { FruitType } from "@/app/fruit-management/form/ModalForm";
import { AuthDataType } from "@/types/auth";

export type LoginPayload = {
  username: string;
  password: string;
};

export const login = (
  payload: LoginPayload
): Promise<SuccessResponseType<AuthDataType, LoginPayload>> =>
  httpClient.post(ENDPOINT.LOGIN, payload);

export const logout = (): Promise<SuccessResponseType<unknown, LoginPayload>> =>
  httpClient.post(ENDPOINT.LOGOUT);

export const createFruit = (
  payload: FruitType
): Promise<SuccessResponseType<unknown, any>> =>
  httpClient.post(ENDPOINT.FRUIT, payload);

export const getFruitList = (
  params: SearchParams
): Promise<SuccessResponseType<TableType<FruitType[]>, any>> =>
  httpClient.get(ENDPOINT.FRUIT, { params });

export const getFruitDetail = (
  id: number
): Promise<SuccessResponseType<unknown, number>> =>
  httpClient.get(`${ENDPOINT.FRUIT}/${id}`);

export const editFruit = (
  id: number,
  payload: FruitType
): Promise<SuccessResponseType<unknown, number>> =>
  httpClient.put(`${ENDPOINT.FRUIT_EDIT}/${id}`, payload);

export const deleteFruit = (
  param: number | string
): Promise<SuccessResponseType<unknown, number>> =>
  httpClient.delete(`${ENDPOINT.FRUIT_DELETE}/${param}`);
