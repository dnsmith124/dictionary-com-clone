import styles from "./WordSearch.module.css";
import React, {useState} from "react";

const WordSearch = () => {
  const [wordToSearchFor, setWordToSearchFor] = useState('');
  const [searchedWord, setSearchedWord] = useState('');
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  var currentPOS = null;

  const handleSearchInput = (e) => {
    if(isError){
      setIsError(false);
    }
    setWordToSearchFor(e.target.value);
  }

  const formatResults = (results) => {
    let tempResults = structuredClone(results);
    tempResults.sort((a,b) => {
      if(a.fl === 'noun') return -1;
      else return 1;
    });

    setResults(tempResults);
  }

  const displaySimilarWords = (stems) => {
    let tempStems = stems.map((element, i) => {
      if(element.toLowerCase() === searchedWord.toLowerCase()) 
        return '';
      return <span key={i} className={styles.stem}>{element}</span>
    });
    return tempStems;
  }

  const displayResults = (results) => {
    let count = 0;
    return results.map((item, i) => {
      if(item.hwi.hw.toLowerCase() !== searchedWord.toLowerCase())
        return '';

      count++;
      let displayPOS = false;
      if(item.fl !== currentPOS) {
        currentPOS = item.fl;
        displayPOS = true;
      }

      return(
        <div key={i} className={styles.result}>
          {
            displayPOS && 
            <p className={styles.pos}>{item.fl}</p>
          }
          <div className={styles.shortDefContainer}>
            <p className={styles.num}>{count}</p>
            <div className={styles.shortDef}>
              {item.shortdef.map((def, i)=> {
                return <span key={i}>{def} </span>
              })}
            </div>
          </div>
            {item.meta.stems.length > 0 &&
              <div className={styles.similarWords}>
              <span>Similar Words/Phrases: </span>
              {displaySimilarWords(item.meta.stems)}
            </div>
          }
        </div>
      )
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(wordToSearchFor.length <= 0) {
      setIsError(true);
      return;
    }
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordToSearchFor}?key=5ce47832-4ec3-41e2-ba35-75e703bdabe6`)
    .then(res => res.json())
    .then(
      (result) => {
        formatResults(result);
        setSearchedWord(wordToSearchFor);
      },
      (error) => {
        setIsError(true); 
      }
    )
  }

  return(
    <div className={styles.wordSearch}>
      <div className={inputFocus ? styles.searchBarFocus : styles.searchBar}>
        {isError && 
        <h4>There is an error in your input</h4> }
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="word-search">Enter a word you'd like to define:</label>
          <input 
            type="text" 
            id="word-search" 
            className={styles.input}
            onChange={(e) => handleSearchInput(e) } 
            onFocus={()=>{setInputFocus(true)}}
            onBlur={()=>{setInputFocus(false)}}
          />
          <button 
            className={styles.button}
            type="submit"
            >
            Submit
          </button>
        </form>
      </div>
      <div className={styles.results}>
        {results.length > 1 && !isError && 
          <div className={styles.resultsList}>
            <h2 className={styles.searchedWord}>{searchedWord}</h2>
            {displayResults(results)}
          </div>
        }
      </div>
    </div>
  )
}

export default WordSearch;