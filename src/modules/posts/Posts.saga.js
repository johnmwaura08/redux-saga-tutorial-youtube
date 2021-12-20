import { takeEvery, all, call, put, takeLeading } from 'redux-saga/effects'
import { addPost, addPostFailed, addPostSuccess, ADD_POST, getPostsFailed, getPostsSuccess, GET_POSTS } from './Posts.actions'
import { getPosts } from '../../utils/api'

function* getPostsSaga() {
    try {
        const data = yield call(getPosts)
        console.log(data)
        yield put(getPostsSuccess(data))


    } catch (error) {
        yield put(getPostsFailed(error.message))
    }
}

function* getPostsWatcher() {
    yield takeEvery(GET_POSTS, getPostsSaga)
}
function* addPostSaga(action) {
    try {
        const data = yield call(addPost, action.payload)
        yield put(addPostSuccess({ ...action.payload, ...data }))
    } catch (error) {
        yield put(addPostFailed(error.message))
    }
}
function* addPostWatcher() {
    yield takeLeading(ADD_POST, addPostSaga)
}

export default function* postsSaga() {
    yield all([getPostsWatcher(), addPostWatcher()])
}