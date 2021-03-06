import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUser = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, "userId"));

  userIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async dispatch => {
  const reponse = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: reponse.data });
};

export const fetchUser = id => async dispatch => {
  const reponse = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: reponse.data });
};
