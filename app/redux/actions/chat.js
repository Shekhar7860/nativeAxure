import { uniq, uniqBy } from "lodash";
import * as SendBirdApi from "../../services/sendbird"

const CONNECT_USER = "chat/CONNECT_USER";
const UPDATE_USER = "chat/UPDATE_USER";

const LOAD_CHATS = "chat/LOAD_CHATS";
const REPLACE_CHAT_LIST = "chat/REPLACE_CHAT_LIST";
const ADD_CHAT = "chat/ADD_CHAT";
const UPDATE_CHAT = "chat/UPDATE_CHAT";

const LOAD_FRIENDS = "chat/LOAD_FRIENDS";
const ADD_FRIENDS = "chat/ADD_FRIENDS";

// Chat:

const INIT_CHAT_SCREEN = "chat/INIT_CHAT_SCREEN";
const MESSAGE_LIST_SUCCESS = "chat/MESSAGE_LIST_SUCCESS";
const MESSAGE_LIST_FAIL = "chat/MESSAGE_LIST_FAIL";
const SEND_MESSAGE_TEMPORARY = "chat/SEND_MESSAGE_TEMPORARY";
const SEND_MESSAGE_SUCCESS = "chat/SEND_MESSAGE_SUCCESS";
const SEND_MESSAGE_FAIL = "chat/SEND_MESSAGE_FAIL";
const READ_RECEIPT_UPDATED = "chat/READ_RECEIPT_UPDATED";
const TYPING_STATUS_UPDATED = "chat/TYPING_STATUS_UPDATED";
const MESSAGE_RECEIVED = "chat/MESSAGE_RECEIVED";
const MESSAGE_UPDATED = "chat/MESSAGE_UPDATED";
const MESSAGE_DELETED = "chat/MESSAGE_DELETED";
const SEND_TYPING_START = "chat/SEND_TYPING_START";
const SEND_TYPING_END = "chat/SEND_TYPING_END";

// Block user:
const SEND_BLOCK_UNBLOCK_USER_START = "chat/SEND_BLOCK_UNBLOCK_USER_START";
const SEND_BLOCK_UNBLOCK_USER_DONE = "chat/SEND_BLOCK_UNBLOCK_USER_DONE";
const SEND_BLOCK_UNBLOCK_USER_FAILED = "chat/SEND_BLOCK_UNBLOCK_USER_FAILED";

// Current user:
const connectUserAction = value => ({ type: CONNECT_USER, value });
const updateUserAction = value => ({ type: UPDATE_USER, value });

// Friends:
const loadFriendsAction = value => ({ type: LOAD_FRIENDS, value });
const addFriendAction = value => ({ type: ADD_FRIENDS, value });

// Chat list:
const replaceChatListAction = (value) => ({ type: REPLACE_CHAT_LIST, value });
const loadChatsAction = value => ({ type: LOAD_CHATS, value });
const addChatAction = value => ({ type: ADD_CHAT, value });
const updateChatAction = value => ({ type: UPDATE_CHAT, value });

// Chat:
const initChatScreenAction = () => ({ type: INIT_CHAT_SCREEN });
const readReceiptUpdatedAction = () => ({ type: READ_RECEIPT_UPDATED });
const typingStatusUpdatedAction = value => ({ type: TYPING_STATUS_UPDATED, value });
const messageReceivedAction = value => ({ type: MESSAGE_RECEIVED, value });
const messageUpdatedAction = value => ({ type: MESSAGE_UPDATED, value });
const messageDeletedAction = value => ({ type: MESSAGE_DELETED, value });
const messageListSuccessAction = value => ({ type: MESSAGE_LIST_SUCCESS, value });
const messageListFailAction = value => ({ type: MESSAGE_LIST_FAIL, value });
const sendTypingStartAction = value => ({ type: SEND_TYPING_START, value });
const sendTypingEndAction = value => ({ type: SEND_TYPING_END, value });
const sendMessageTemporaryAction = value => ({ type: SEND_MESSAGE_TEMPORARY, value });
const sendMessageSuccessAction = value => ({ type: SEND_MESSAGE_SUCCESS, value });
const sendMessageFailAction = value => ({ type: SEND_MESSAGE_FAIL, value });

// Block user
const sendBlockUnblockUserStartAction = value => ({ type: SEND_BLOCK_UNBLOCK_USER_START });
const sendBlockUnblockUserDoneAction = value => ({ type: SEND_BLOCK_UNBLOCK_USER_DONE });


// CURRENT USER:

export const connectUser = (userId) => {
  return (dispatch, getState) => {
    const { session } = getState();
    const { user } = session;

    if (!userId || !user) return;

    return SendBirdApi.connectUser(userId || user.uuid)
      .then(sbUser => {
        dispatch(connectUserAction(sbUser));

        return sbUser;
      });
  };
};

export const updateUser = (userData) => {
  return (dispatch) => {
    return SendBirdApi.updateUser(userData)
      .then(sbUser => {
        dispatch(updateUserAction(sbUser));

        return sbUser;
      });
  };
};


// FRIENDS:

export const loadFriends = (query) => {
  return (dispatch) => {
    return SendBirdApi.getFriends(query)
      .then(friends => {
        dispatch(loadFriendsAction(friends));

        return friends;
      });
  };
};

export const addFriend = (userIds) => {
  return (dispatch) => {
    return SendBirdApi.addFriends(userIds)
      .then(friends => {
        dispatch(addFriendAction(friends));
        return friends;
      });
  };
};


// CHAT LIST:

export const initChatList = () => {
  return dispatch => {
    SendBirdApi.removeChatListHandler();
    return SendBirdApi.createChatListHandler((chat) => {
      dispatch(updateChatAction({ ...chat }));
    });
  };
};

export const loadChats = (query, replace) => {
  return (dispatch, getState) => {
    const { chat } = getState();
    const { user } = chat;

    if (!user || !query.hasNext) return;

    return SendBirdApi.getChats(query)
      .then(chats => {
        const action = replace ? replaceChatListAction(chats) : loadChatsAction(chats);

        dispatch(action);
        return chats;
      });
  };
};

export const createGroupChat = (userIds) => {
  return (dispatch) => {
    return SendBirdApi.createGroupChat(userIds)
      .then(chat => {
        dispatch(addChatAction(chat));

        return chat;
      });
  };
};

export const createPrivateChat = (userId, options) => {
  return (dispatch) => {
    return SendBirdApi.createPrivateChat(userId, options)
      .then(chat => {
        dispatch(addChatAction(chat));
        return chat;
      });
  };
};


// CHAT:

// need for GiftedChat message structure
const transformList = list => {
  return list.map(message => {
    return {
      ...message,
      _id: message.messageId,
      text: message.message,
      createdAt: message.createdAt,
      user: {
        _id: message._sender.userId,
        name: message._sender.nickname,
        avatar: message._sender.profileUrl,
      },
    };
  });
};

const uniqueList = list => uniqBy(list, "messageId");

const registerChatHandler = (chatUrl, dispatch) => {
  return SendBirdApi.createChatHandler(chatUrl, {
    onMessageReceived(chat, message) {
      SendBirdApi.markAsRead(chat);
      dispatch(messageReceivedAction(message));
    },
    onMessageUpdated(chat, message) {
      dispatch(messageUpdatedAction(message));
    },
    onMessageDeleted(chat, messageId) {
      dispatch(messageDeletedAction(messageId));
    },
    onReadReceiptUpdated(chat) {
      dispatch(readReceiptUpdatedAction());
    },
    onTypingStatusUpdated(typing) {
      dispatch(typingStatusUpdatedAction(typing));
    },
  });
};

export const initChatScreen = (chat) => {
  return dispatch => {
    dispatch(initChatScreenAction());

    SendBirdApi.removeChatHandler(chat.url);
    return registerChatHandler(chat.url, dispatch);
  };
};

export const getPrevMessageList = (previousMessageListQuery, options) => {
  return dispatch => {
    if (previousMessageListQuery.hasMore) {
      return SendBirdApi.getMessageList(previousMessageListQuery, options)
        .then(messages => {
          dispatch(messageListSuccessAction(messages));
        })
        .catch(err => {
          dispatch(messageListFailAction(err));
        });
    } else {
      dispatch(messageListFailAction());
      return new Promise((resolve, reject) => reject());
    }
  };
};

export const typingStart = chat => {
  return dispatch => SendBirdApi.typingStart(chat)
    .then(() => dispatch(sendTypingStartAction()));
};

export const typingEnd = chat => {
  return dispatch => SendBirdApi.typingEnd(chat)
    .then(() => dispatch(sendTypingEndAction()));
};

export const sendTextMessage = (chat, textMessage) => {
  return async (dispatch) => {
    typingEnd(chat)(dispatch);
    try {
      const { result: tempMessage, promise } = SendBirdApi.sendTextMessage(chat, textMessage);
      dispatch(sendMessageTemporaryAction(tempMessage));

      const message = await promise;

      dispatch(sendMessageSuccessAction(message));
    } catch (err) {
      dispatch(sendMessageFailAction(err));
    }
  };
};

// Block user
// export const blockUser = (chat, userId, description) => {
export const blockUser = (user) => {
  return async (dispatch) => {
    dispatch(sendBlockUnblockUserStartAction());
    try {
      let promise = await SendBirdApi.blockUser(user);
      dispatch(sendBlockUnblockUserDoneAction());
      return promise;
    } catch (err) {
      dispatch(sendBlockUnblockUserDoneAction());
      return err;
    }
  };
};

export const unblockUser = (user) => {
  return async (dispatch) => {
    dispatch(sendBlockUnblockUserStartAction());
    try {
      // let promise = await SendBirdApi.blockUser(chat, userId, description);
      let promise = await SendBirdApi.unblockUser(user);
      dispatch(sendBlockUnblockUserDoneAction());
      return promise;
    } catch (err) {
      dispatch(sendBlockUnblockUserDoneAction());
      return err;
    }
  };
};


const INITIAL_STATE = {
  user: null,
  chats: [],
  friends: [],
  list: [],
  typing: "",
  loading: false,
};

export default function chatReducer(state = INITIAL_STATE, action) {
  const { type, value } = action;

  switch (type) {
    case CONNECT_USER:
    case UPDATE_USER:
      return { ...state, user: value };

    case REPLACE_CHAT_LIST:
      return { ...state, chats: value };

    case LOAD_CHATS:
      return { ...state, chats: uniqBy([...state.chats, ...value], "url") };

    case ADD_CHAT:
      return { ...state, chats: uniqBy([value, ...state.chats], "url") };

    case UPDATE_CHAT: {
      const updatedChatList = state.chats.map(chat => (
        value.url === chat.url ? value : chat
      ));

      const searchChangedChat = state.chats.find((chat) => (
        value.url === chat.url
      ));

      const nextChats = searchChangedChat ? updatedChatList : [value, ...state.chats];

      return { ...state, chats: nextChats };
    }

    case LOAD_FRIENDS:
      return { ...state, friends: [...state.friends, ...value] };

    case ADD_FRIENDS:
      return { ...state, friends: [value, ...state.friends] };

    // Chat:

    case INIT_CHAT_SCREEN:
      return { ...state, list: [], typing: "" };

    case TYPING_STATUS_UPDATED:
      return { ...state, typing: value };

    case READ_RECEIPT_UPDATED:
      return { ...state, list: state.list };

    case MESSAGE_RECEIVED: {
      return { ...state, list: transformList(uniqueList([...[value], ...state.list])) };
    }

    case MESSAGE_UPDATED: {
      const updatedList = state.list.map(message => (
        value.messageId === message.messageId ? value : message
      ));

      return { ...state, list: transformList(updatedList) };
    }

    case MESSAGE_DELETED:
      const deletedList = state.list.filter(message => {
        return message.messageId.toString() !== value.toString();
      });

      return { ...state, list: deletedList };

    case MESSAGE_LIST_SUCCESS: {
      return { ...state, list: transformList(uniqueList([...state.list, ...value])) };
    }

    case MESSAGE_LIST_FAIL:
      return { ...state };

    case SEND_MESSAGE_TEMPORARY: {
      return { ...state, list: transformList([...[value], ...state.list]) };
    }

    case SEND_MESSAGE_SUCCESS:
      const sendSuccessList = state.list.map(message => {
        if (message.reqId && value.reqId && message.reqId.toString() === value.reqId.toString()) {
          return value;
        } else {
          return message;
        }
      });

      return { ...state, list: transformList(sendSuccessList) };

    case SEND_MESSAGE_FAIL:
      const newChatList = state.list.slice(1);

      return { ...state, list: newChatList };
    case SEND_BLOCK_UNBLOCK_USER_START:
      return { ...state, loading: true };
    case SEND_BLOCK_UNBLOCK_USER_DONE:
      return { ...state, loading: false };
    case SEND_BLOCK_UNBLOCK_USER_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}
