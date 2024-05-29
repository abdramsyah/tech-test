"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { STORAGE_KEY } from "@/constants/localStorageKey";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return <main className={styles.main}>Splash Screen</main>;
};
export default Home;
