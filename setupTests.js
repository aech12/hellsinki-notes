import 'jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';

const localStorageDB = {};
const localStorageMock = {
  getItem: i => {
    return localStorageDB[i] || null;
  },
  setItem: (i, user) => {
    localStorageDB[i] = user.toString();
  },
  removeItem: i => {
    delete localStorageDB[i];
  }
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
