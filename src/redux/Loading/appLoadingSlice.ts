import { createSlice } from "@reduxjs/toolkit"

export type loadingStateType ={
    loading: boolean
}

const initialState: loadingStateType = {
    loading: false
}

export const appLoadingSlice = createSlice({
    name: 'appLoading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const getLoading = (state: { loading: loadingStateType }) => state.loading.loading
export const { setLoading } = appLoadingSlice.actions
export default appLoadingSlice.reducer