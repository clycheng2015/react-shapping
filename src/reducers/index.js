import {home} from './home'
import {item} from './item'
import {itemList} from './itemList'
import {moreList} from './moreList'
import {saveParams} from './saveParams'
import {activeDetail} from './activeDetail'
import {active} from './active'
import {user} from './user'
import {auth} from './auth'
import {car} from './car'
import {protocol} from './protocol'
import {search} from './search'
import {goodsDetail} from './goodsDetail'
import {postType} from './postType'
import {invoice} from './invoice'
import {global} from './global'
import {activeMoveMent} from './movement'
import {doubleActive} from './doubleActive'
import {inter} from './international'
import {message} from './message'

const rootReducer = {
    home,
    item,
    search,
    auth,
    car,
    user,
    active,
    postType,
    invoice,
    activeDetail,
    saveParams,
    moreList,
    protocol,
    goodsDetail,
    itemList,
    global,
    activeMoveMent,
    doubleActive,
    inter,
    message

}
export default rootReducer
