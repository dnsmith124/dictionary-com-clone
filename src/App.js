import styles from './App.module.css';
import React from "react";
import WordSearch from './Components/WordSearch';

const App = () => {

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.headerContainer}>
          <h2>Dictionary Clone</h2>
        </div>
      </header>
      <div className={styles.primaryContainer}>
        <WordSearch/>
      </div>
    </div>
  );
}

export default App;
