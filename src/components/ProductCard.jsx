import { useEffect, useState } from "react";
import styles from "../styles/ProductCard.module.css";
import { usePosition } from "../common/usePosition";

export const ProductCard = () => {
  const [productList, setProduct] = useState([]);
  const { latitude, longitude } = usePosition();
  const [address, setAddress] = useState("");

  const fetchAddress = async () => {
    try {
      let response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      response = await response.json();
      const currentAddress = response?.display_name || "";
      setAddress(currentAddress);
    } catch (error) {
      setAddress("");
    }
  };

  const buyItem = async ({ id, productName, price, quantity, imageURL }) => {
    const newProductList = productList.map((item) =>
      item.id == id
        ? { ...item, bought: true, quantity: item.quantity - 1 }
        : item
    );

    try {
      const response = await fetch(
        `https://xi3mxeszjj.execute-api.us-east-1.amazonaws.com/default/items/${id}`,
        {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify({
            productName,
            price,
            quantity: quantity - 1,
            imageURL,
          }),
        }
      );
      setProduct(newProductList);
    } catch (error) {
      console.error(error);
    }

    try {
      const response_2 = await fetch(
        `https://dloddoqiie.execute-api.us-east-1.amazonaws.com/default/cart`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            productName,
            imageURL,
            address,
          }),
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          "https://xi3mxeszjj.execute-api.us-east-1.amazonaws.com/default/items",
          {
            method: "GET",
            mode: "cors",
          }
        );
        response = await response.json();
        response = response.data.map((item) => ({ ...item, bought: false }));
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchAddress();
    }
  }, [latitude, longitude]);

  return (
    <div className={styles.cardHolder}>
      {productList.map(
        ({ id, productName, price, quantity, imageURL, bought }) => {
          return (
            <div keys={id} className={styles["mantra-vertical-card"]}>
              <div className={styles["mantra-card-holder-image-v"]}>
                <img className={styles["mantra-vert-image"]} src={imageURL} />
              </div>
              <div className={styles["mantra-card-holder-text-vert"]}>
                <div className={styles["mantra-card-holder-text-content"]}>
                  <h2>{productName}</h2>
                  <span className={styles["mantra-discount"]}>Rs.{price}</span>
                </div>
              </div>
              <div className={styles["mantra-card-btn"]}>
                {quantity > 0 ? (
                  bought ? (
                    <button disabled={true} className={styles["mantra-button"]}>
                      Already Bought!!
                    </button>
                  ) : (
                    <button
                      className={styles["mantra-button"]}
                      onClick={() =>
                        buyItem({ id, productName, price, quantity, imageURL })
                      }
                    >
                      <i className="fa fa-shopping-cart"></i>
                      Add to cart
                    </button>
                  )
                ) : (
                  <button className={styles["mantra-button"]} disabled={true}>
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
