/**
 * Created by yongyuehuang on 2017/6/7.
 */
const initState = {
  animateCls: 'normal', //过渡动画样式
}

export const global = (state = initState, action) => {
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
    default:
      return state
  }
}

//处理点击Tab后全局数据变化的Reducer 暂时只是个样子
export const myTabBarReducer = (selectedTab = '/', action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return action.payload.selectedTab
    default:
      return '/'
  }
}
