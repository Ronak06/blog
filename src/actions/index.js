import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // Gets all the unique userIds from the 100 comments within redux store by calling getState().posts
  const userIds = _.uniq(_.map(getState().posts, "userId"));

  // for each of the unique userIds, run the fetchUser action creator and dispatch it
  userIds.forEach(id => dispatch(fetchUser(id)));
};

/*
  Makes an asynchronous request to jsonPlaceholder api to
  get the data from /posts; once it has extracted the data,
  it will call dispatch and pass the data to the redux store 
*/
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

/*
  Makes asynchronous request to jsonPlacehold api to get the data
  of a user from /users/${id}; once it has extracted the data,
  it will call dispatch and pass the data to the redux store
*/
export const fetchUser = id => async dispatch => {
  const respose = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: respose.data });
};

//  _fetchUser will have only one function call per a specific id provided
//  due to _.memoize, thus for 100 comments, there will only be 10 user calls
//  made as each user has 10 comments.
//
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const respose = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: respose.data });
// });
