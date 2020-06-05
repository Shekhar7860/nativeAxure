import sessionReducer from './session';
import patientReducer from './patient';
import groupChannelInvite from './groupChannelInviteReducer';
import login from './loginReducer';
import groupChannel from './groupChannelReducer';
import chat from './chatReducer';
import { act } from 'react-test-renderer';


const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  return {
    session: sessionReducer(state.session, action),
    patient: patientReducer(state.patient, action),
    groupChannelInvite: groupChannelInvite(state.groupChannelInvite, action),
    login: login(state.login, action),
    groupChannel: groupChannel(state.groupChannel, action),
    chat: chat(state.chat, action),
  };
};