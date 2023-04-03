export const state = () => ({
        language: 'EN',
        
})

export const getters = {
        language(state) {
                return state.language;
        },
       


}
export const mutations = {
        setLanguage(state, lang) {
                state.language = lang;
        },       

}


