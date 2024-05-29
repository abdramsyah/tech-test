import {
  CaretUpOutlined,
  CaretDownOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import decodeToken from "@/util/decodeToken";
import { usePathname, useRouter } from "next/navigation";
import { getInitialName } from "@/util/commons";
import nProgress from "nprogress";
import MenuCard from "./MenuCard";
import { ModuleEnum, ModuleType } from "@/types/auth";
import { DecodedTokenType } from "@/types/auth";
// import usergroupAddOutlined from "@/assets/svg/sidebar/user_group_add_outlined.svg";
import ChevronLeft from "@/assets/svg/icon/chevron-left";
import Link from "next/link";
import { STORAGE_KEY } from "@/constants/localStorageKey";

import "moment/locale/id";
import { logout } from "@/api/queries/fetch";
import { toast } from "react-toastify";
import MessageError from "../Notification/MessageError";

interface LayoutProps {
  children: ReactNode;
  rightHeader?: ReactNode[];
}

export const menuData: ModuleType[] = [
  {
    module_id: 1,
    module_name: ModuleEnum.FRUIT_MANAGEMENT,
    module_description: "Fruit Management",
    module_path: "/fruit-management",
    module_icon: <RobotOutlined />,
  },
];

const LayoutComponent: React.FC<LayoutProps> = ({
  children,
  rightHeader,
}: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [docTitle, setDocTitle] = useState<string>();

  const token = useMemo(() => localStorage.getItem(STORAGE_KEY.TOKEN), []);

  const decodedToken: DecodedTokenType = useMemo(
    () => decodeToken(token),
    [token]
  );
  const pathUrl = pathname.replace("/", "");

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = useCallback(async () => {
    nProgress.start();
    await logout()
      .then(() => {
        localStorage.clear();
        router.replace("/login");
      })
      .catch((err) =>
        toast.success(<MessageError msg={"Login gagal! " + err} />, {
          className: "toast-message-error",
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!token) {
  //     handleLogout();
  //   } else {
  //     const tokenExpired = decodedToken?.exp;
  //     const date = new Date();
  //     const d = new Date(0);
  //     d.setUTCSeconds(tokenExpired);

  //     if (date > d) {
  //       handleLogout();
  //     }
  //   }
  // }, [token, decodedToken?.exp, handleLogout]);

  useEffect(() => {
    return () => {
      nProgress.done();
    };
  }, []);

  var d = document.querySelectorAll<HTMLElement>(".chip-block"),
    i: number,
    w: number,
    width: number,
    height: number;

  for (i = 0; i < d.length; i++) {
    width = d[i].offsetWidth;
    height = d[i].offsetHeight;

    for (w = width; w; w--) {
      d[i].style.width = w + "px";
      if (d[i].offsetHeight !== height) break;
    }

    if (w < d[i].scrollWidth) {
      d[i].style.width = d[i].style.maxWidth = d[i].scrollWidth + "px";
    } else {
      d[i].style.width = w + 1 + "px";
    }
  }

  const renderMenuCard = useCallback(
    (module: ModuleType, idx: number) => (
      <Link href={module.module_path} prefetch>
        <MenuCard
          key={idx.toString()}
          module={module}
          pathUrl={pathUrl}
          onClick={() => {
            nProgress.start();
            setDocTitle(module.module_description);
          }}
        />
      </Link>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderMenu = useMemo(
    () => (
      <div className="nav">
        <div className={`display-block`}>{menuData.map(renderMenuCard)}</div>
      </div>
    ),
    [renderMenuCard]
  );

  const renderUserBadge = useMemo(
    () => (
      <div className="profile">
        <div className="name-profile">
          <div className="box-picture">
            {getInitialName(decodedToken?.name)}
          </div>
          <div className="name">{decodedToken?.name}</div>
        </div>
        <div className="button-menu" onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </div>
      </div>
    ),
    [decodedToken?.name, showMenu]
  );

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="menu">
          <div className="title">MENU</div>
          <div className="menu-list">{renderMenu}</div>
        </div>
        <div
          className="permission-tab"
          style={{ display: !showMenu ? "none" : "block" }}
        >
          <div className="logout-area">
            <button
              className="back-button"
              onClick={() => setShowMenu((state) => !state)}
            >
              <ChevronLeft stroke="#7a7a7a" />
            </button>
            <button className="logout-button" onClick={handleLogout}>
              {" "}
              Log Out
            </button>
          </div>
        </div>
        {renderUserBadge}
      </div>

      <div className="section-content">
        <div className="content">
          <div className="page-table">
            <div className="header">
              <div className="title">{docTitle}</div>
              {rightHeader?.length ? [...rightHeader] : null}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
