import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  return (
    <li>
      <Link className={styles.cityItem} to={`${city.id}`}>
        <span className={styles.emoji}>{city.emoji}</span>
        <span className={styles.name}>{city.cityName}</span>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
