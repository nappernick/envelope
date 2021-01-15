const SET_DATA_SETS = 'dataSet/setDataSets'
const SET_DATA_SET = 'dataSet/setDataSet'

const _setDataSets = (dataSets) => {
    return {
        type: SET_DATA_SETS,
        dataSets
    }
}

const _setDataSet = (dataSet) => {
    return {
        type: SET_DATA_SET,
        dataSet
    }
}

export const addDataSet = (dataSet) => async (dispatch) => {
    dispatch(_setDataSet(dataSet))
    return
}

export const setAllDataSets = () => async (dispatch) => {
    const dataSetFetch = await fetch("/api/data/data-sets")
    const dataSets = await dataSetFetch.json()
    if (!dataSets.errors) dispatch(_setDataSets(dataSets))
    return
}

const dataSetsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_DATA_SETS:
            return [...action.dataSets]
        case SET_DATA_SET:
            let setIndex = state.findIndex(el => el.data_set_name === action.dataSet.data_set_name);
            console.log(setIndex)
            if (setIndex === -1) {
                return [
                    ...state.slice(0, setIndex),
                    action.dataSet,
                    ...state.slice(setIndex + 1)
                ];
            }
            return state
        default:
            return state
    }
}

export default dataSetsReducer;
