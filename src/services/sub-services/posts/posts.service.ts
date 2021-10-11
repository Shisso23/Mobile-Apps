import _ from 'lodash';

import postUrls from './posts.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiCreatePostModel,
  apiEditPostModel,
  CreatePostProps,
  EditPostProps,
} from '../../../models';
import flashService from '../flash-service/flash.service';
import { objectToFormData } from '../../../helpers/object-to-form-data.helper.';

const getPosts = async (pageNumber = null, pageSize = null) => {
  const url = postUrls.posts();
  const params = pageNumber && pageSize ? `/PageNumber=${pageNumber}/PageSize=${pageSize}` : '';
  const apiResponse = await authNetworkService.get(`${url}${params}`);

  return _.get(apiResponse, 'data.data', null);
};

const getPost = async (id: any) => {
  const url = postUrls.posts();

  return authNetworkService
    .get(`${url}/${id}`)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', null);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching post!'));
    });
};

const createPost = async (formData: CreatePostProps) => {
  const url = postUrls.posts();
  const createPostModel = objectToFormData(apiCreatePostModel(formData));
  try {
    const apiResponse = await authNetworkService.post(url, createPostModel, {
      headers: { Accept: 'multipart/form-data', 'content-type': 'multipart/form-data' },
    });
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Creating post!'));
  }
};

const editPost = async (formData: EditPostProps, postId: any) => {
  const url = postUrls.posts();
  const editPostModel = apiEditPostModel(formData);
  try {
    const apiResponse = await authNetworkService.put(`${url}/${postId}`, editPostModel);
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Editing post!'));
  }
};

const deletePost = async (id: any) => {
  const url = postUrls.posts();
  return authNetworkService
    .delete(`${url}/${id}`)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', null);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error deleting post!'));
    });
};

export default {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
};
