import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type DecodedTokenType = {
  exp: number;
  name: string;
  userId: number;
  isSuper: boolean;
};

export type ModuleType = {
  module_id: number;
  module_name: ModuleEnum;
  module_description: string;
  module_path: string;
  module_icon?: React.ReactNode;
};

export enum ModuleEnum {
  FRUIT_MANAGEMENT = "FRUIT_MANAGEMENT",
}

export type AuthDataType = {
  fullname: string;
  email: string;
  access_token: string;
  refresh_token: string;
};
