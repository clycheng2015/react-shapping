/**
 * Created by yongyuehuang on 2017/6/7.
 */
const init = {
    animateCls: 'normal', //过渡动画样式
    selectedTab: '/'

}

export const global = (state = init, action) => {
    switch (action.type) {
        case 'CURRENT_ANIMATE':
            return {
                ...state,
                animateCls: action.cls
            }
        case 'UPDATE_SHARE_URL':
            return {
                ...state
            }
        case 'CHANGE_TAB':
            return {...state,selectedTab:action.payload.selectedTab}

        case 'CLEAR_ALL_STATE':

            return{...init}


        default:
            return state
    }
}
