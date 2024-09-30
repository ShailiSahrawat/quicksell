import axios from 'axios';

// Action to fetch all data
export const fetchAllData = () => async (dispatch) => {
    try {
        dispatch({ type: 'DATA_REQUEST' });
    
        const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
        
        dispatch({ type: 'DATA_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'DATA_FAILURE' });
    }
};

// Action to select data based on grouping and sorting options
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
    try {
        dispatch({ type: 'SELECT_DATA_REQUEST' });

        let user = false;
        let mySet = new Set();
        let arr = [], selectedData = [];

        // Handle grouping by status
        if (group === 'status') {
            allTickets.forEach((elem) => {
                mySet.add(elem.status);
            });
    
            arr = [...mySet]; // Spread the set into an array
    
            arr.forEach((elem, index) => {
                let filteredArr = allTickets.filter((fElem) => {
                    return elem === fElem.status;
                });
                selectedData.push({
                    [index]: {
                        title: elem,
                        value: filteredArr
                    }
                });
            });
        }

        // Handle grouping by user
        else if (group === 'user') {
            user = true;
            if (allTickets && allTickets.allUser) {
                allTickets.allUser.forEach((elem, index) => {
                    let filteredArr = allTickets.allTickets.filter((fElem) => {
                        return elem.id === fElem.userId;
                    });

                    selectedData.push({
                        [index]: {
                            title: elem.name,
                            value: filteredArr
                        }
                    });
                });
            }
        }

        // Handle grouping by priority
        else {
            let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];

            prior_list.forEach((elem, index) => {
                let filteredArr = allTickets.filter((fElem) => {
                    return index === fElem.priority;
                });

                selectedData.push({
                    [index]: {
                        title: elem,
                        value: filteredArr
                    }
                });
            });
        }

        // Sorting by title
        if (orderValue === "title") {
            selectedData.forEach((elem, index) => {
                if (elem[index] && elem[index].value) {
                    elem[index].value.sort((a, b) => a.title.localeCompare(b.title));
                }
            });
        }

        // Sorting by priority
        if (orderValue === "priority") {
            selectedData.forEach((elem, index) => {
                if (elem[index] && elem[index].value) {
                    elem[index].value.sort((a, b) => b.priority - a.priority);
                }
            });
        }

        dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } });

    } catch (error) {
        dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message });
    }
};
