import React from 'react';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

const JournalApp = () => {
  return (
    <AppTheme>
      JournalApp
      <hr />
      <AppRouter />
    </AppTheme>
  );
};

export default JournalApp;
