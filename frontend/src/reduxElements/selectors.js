/*
** This is to help consolidate memo-ization
** of selectors using reselect
*/

import { createSelector } from 'reselect';

export stateSelector = createSelector(
    state => state,
    state => state
);