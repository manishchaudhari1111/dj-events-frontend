import Head from "next/head";
import React from "react";

import styles from "@/styles/Layout.module.css";

const Layout = ({ title, description, keywords, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;
