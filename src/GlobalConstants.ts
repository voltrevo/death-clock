export const APP_STATE = '@@global/APP_STATE';
export const SET_WHOLE_STATE = '@@global/SET_WHOLE_STATE';
export const SET_PAGE = '@@global/SET_PAGE';

export type AsyncStatus = (
    'start' |
    'finish' |
    'success' |
    'failure' |
    'always' |
    never
);