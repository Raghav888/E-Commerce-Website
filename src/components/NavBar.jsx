import styles from "../styles/NavBar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles["mantra-nav"]}>
      <div className={styles["mantra-nav-title"]}>
        <a className={styles["mantra-title"]} href="../index.html">
          E-Commerce
        </a>
      </div>
      <div className={styles["mantra-nav-footer"]}>
        <div className={styles["mantra-badge"]}>
          <a className={styles["mantra-menu-icon"]} href="#">
            <span className={styles["mantra-icon"]}>
              <i className="fa fa-heart"></i>
            </span>
          </a>
          <a className={styles["mantra-menu-icon"]} href="#">
            <span className={styles["mantra-icon"]}>
              <i className="fa fa-shopping-cart"></i>
            </span>
            <span className={styles["mantra-cart-button"]}>Cart</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
