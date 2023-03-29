import { useEffect, useState } from "react";
import styles from "../styles/ProductCard.module.css";

export const ProductCard = () => {
  const [productList, setProduct] = useState([]);

  const getProducts = () => {
    const array = [];
    for (let i = 0; i < 20; i++) {
      const imageUrl = "https://picsum.photos/200/250";
      array.push({
        productName: `Product-${i}`,
        price: Math.floor(Math.random() * 100),
        quantity: Math.floor(Math.random() * 10),
        imageUrl,
      });
    }
    return array;
  };

  useEffect( () => {
    const temp = getProducts();
    setProduct(temp);
  }, []);

  return (
    <div className={styles.cardHolder}>
      {productList.map(({ productName, price,quantity, imageUrl }) => {
        return (
            <div className={styles["mantra-vertical-card"]}>
              <div className={styles["mantra-card-holder-image-v"]}>
                <img className={styles["mantra-vert-image"]} src={imageUrl} />
              </div>
              <div className={styles["mantra-card-holder-text-vert"]}>
                <div className={styles["mantra-card-holder-text-content"]}>
                  <h2>{productName}</h2>
                  <span className={styles["mantra-discount"]}>Rs.{price}</span>
                </div>
              </div>
              <div className={styles["mantra-card-btn"]}>
                {quantity >0 ?
                <button
                  className={styles["mantra-button"]}
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>: <button
                  className={styles["mantra-button"]}
                  disabled={true}
                >
                 Out of Stock
                </button>
                }
              </div>
          </div>
        );
      })}
    </div>
  );
};
