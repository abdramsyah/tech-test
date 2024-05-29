"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return <main className={styles.main}>Splash Screen</main>;
};
export default Home;
