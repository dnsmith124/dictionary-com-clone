import styles from "./WordSearch.module.css";
import React, {useState} from "react";
import { capitalizeFirstLetter } from "../Utilities/UtilityFunctions";

const WordSearch = () => {
  const [wordToSearchFor, setWordToSearchFor] = useState('');
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearchInput = (e) => {
    console.log(e.target.value);
    if(isError){
      setIsError(false);
    }
    setWordToSearchFor(e.target.value);
  }

  const handleSubmit = () => {
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
        setResults(result);
      },
      (error) => {
        setIsError(true); 
      }
    )
  }

  return(
    <div className={styles.wordSearch}>
      <div className="search-bar">
        {isError && 
        <h4>There is an error in your input</h4> }
        <label htmlFor="word-search">Search for a word</label>
        <input type="text" id="word-search" onChange={(e) => handleSearchInput(e) } />
        <button onClick={handleSubmit}>
          Test
        </button>
      </div>
      <div className="results">
        {results.length > 1 && !isError && 
          <div className="results-list">
            <h3>{capitalizeFirstLetter(wordToSearchFor)}</h3>
            {results.map((item, i) => {
              return(
                <div key={i} className="result">
                  {item.shortdef}
                  {i}

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