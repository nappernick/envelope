import { trackPromise } from "react-promise-tracker"
import { areas } from "../common/areas"

const SET_DATA_SETS = 'dataSet/setDataSets'
const SET_DATA_SET = 'dataSet/setDataSet'
const REMOVE_DATA_SET = 'dataSet/removeDataSet'

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

const _removeDataSet = (id) => {
    return {
        type: REMOVE_DATA_SET,
        id
    }
}

export const removeDataSet = (id) => async (dispatch) => {
    dispatch(_removeDataSet(id))
    return
}

export const addDataSet = (dataSet) => async (dispatch) => {
    dispatch(_setDataSet(dataSet))
    return
}

export const setAllDataSets = () => async (dispatch) => {
    const fetchAndDistpatchDS = async () => {
        const dataSetFetch = await fetch("/api/data/data-sets")
        const dataSets = await dataSetFetch.json()
        if (!dataSets.errors) dispatch(_setDataSets(dataSets))
        return
    }
    trackPromise(fetchAndDistpatchDS(), areas.dataSetList)
}

const dataSetsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_DATA_SETS:
            return [...action.dataSets]
        case SET_DATA_SET:
            let filteredDataSets = state.filter(el => {
                return el.id !== action.dataSet.id
            });
            filteredDataSets.push(action.dataSet)
            if (state.length <= filteredDataSets.length) {
                return [
                    ...filteredDataSets
                ];
            }
            return state
        case REMOVE_DATA_SET:
            let removedDataSet = state.filter(el => {
                return el.id !== action.id
            });
            if (state.length > removedDataSet.length) return [...removedDataSet]
            return state
        default:
            return state
    }
}

export default dataSetsReducer;
