import styles from "./WordSearch.module.css";
import React, {useState} from "react";
import { capitalizeFirstLetter } from "../Utilities/UtilityFunctions";

const WordSearch = () => {
  const [wordToSearchFor, setWordToSearchFor] = useState('');
  const [searchedWord, setSearchedWord] = useState('');
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const handleSearchInput = (e) => {
    console.log(e.target.value);
    if(isError){
      setIsError(false);
    }
    setWordToSearchFor(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(wordToSearchFor.length <= 0) {
      setIsError(true);
      return;
    }
    console.log("searching for " + wordToSearchFor);
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordToSearchFor}?key=5ce47832-4ec3-41e2-ba35-75e703bdabe6`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setSearchedWord(wordToSearchFor);
        setResults(result);
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

          <label htmlFor="word-search">Search for a word</label>
          <input 
            type="text" 
            id="word-search" 
            onChange={(e) => handleSearchInput(e) } 
            onFocus={()=>{setInputFocus(true)}}
            onBlur={()=>{setInputFocus(false)}}
          />
          <button  type="submit">
            Test
          </button>
        </form>
      </div>
      <div className={styles.results}>
        {results.length > 1 && !isError && 
          <div className={styles.resultsList}>
            <h2>{capitalizeFirstLetter(searchedWord)}</h2>
            {results.map((item, i) => {
              return(
                <div key={i} className={styles.result}>
                  <p className={styles.pos}>{item.fl}</p>
                  <div className={styles.shortDefContainer}>
                    <p className={styles.num}>{i + 1}</p>
                    <div className={styles.shortDef}>
                      {item.shortdef.map((def, i)=>{
                        return <span key={i}>{def} </span>
                      })}
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default WordSearch;