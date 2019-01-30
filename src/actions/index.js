import axios from 'axios';

export const FETCHING = "FETCHING";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const RESET = "RESET";
export const OPP_SUCCESS = "OPP_SUCCESS";
export const ADD_POINTS = "ADD_POINTS";
export const ADD_OPP_POINTS = "ADD_OPP_POINTS";
export const GAMEOVER = "GAMEOVER";

// some of the api links and formats below for my reference
//https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
//https://deckofcardsapi.com/api/deck/new/
//https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
//"0e4dpxs16n6c"
//opponent deck 2cvf3nocf8p0
//https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

export const shuffleNewDeck = () => {
    const promise = axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    return dispatch => {
        dispatch({ type: FETCHING });
        promise
        .then(response => {
            dispatch({ type: SUCCESS, payload: response.data }); 
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FAILURE }); 
        });
    };
};
  
export const reshuffleDeck = () => {
    const promise = axios.get(`https://deckofcardsapi.com/api/deck/0e4dpxs16n6c/shuffle/`);
    return dispatch => {
        dispatch({ type: FETCHING }); 
        promise
        .then(response => {
            console.log(response.data)
            dispatch({ type: SUCCESS, payload: response.data }); 
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FAILURE }); 
        });
    };
}

export const drawCard = () => {
    const promise = axios.get(`https://deckofcardsapi.com/api/deck/0e4dpxs16n6c/draw/?count=1`);
    return dispatch => {
        dispatch({ type: FETCHING });
        promise
        .then(response => {
            console.log(response.data)
            dispatch({ type: SUCCESS, payload: response.data }); 
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FAILURE }); 
        })
    };
}

export const opponentDrawCard = () => {
    const promise = axios.get(`https://deckofcardsapi.com/api/deck/2cvf3nocf8p0/draw/?count=1`);
    return dispatch => {
        dispatch({ type: FETCHING }); 
        promise
        .then(response => {
            dispatch({ type: OPP_SUCCESS, payload: response.data }); 
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FAILURE });
        });
    };
}

export const opponentReshuffleDeck = () => {
    const promise = axios.get(`https://deckofcardsapi.com/api/deck/2cvf3nocf8p0/shuffle/`);
    return dispatch => {
        dispatch({ type: FETCHING }); 
        promise
        .then(response => {
            dispatch({ type: OPP_SUCCESS, payload: response.data }); 
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FAILURE }); 
        });
    };
}

export const addPoints = () => {
    return {
        type: ADD_POINTS
    }
}

export const addOppPoints = () => {
    return {
        type: ADD_OPP_POINTS
    }
}

export const reset = () => {
    return {
        type: RESET
    }
}

export const gameCompleted = (text) => {
    return {
        type: GAMEOVER,
        status: text,
    }
}