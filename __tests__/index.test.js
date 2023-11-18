import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import Admin from '../src/app/admin';
import { setRefresh } from '@/store/adminSlice';

// Configura un store de Redux simulado
const mockStore = configureStore([]);

// Inicia la prueba unitaria
test('renders "Add new registry:" text and "Add car" button correctly', () => {
  // Configura un estado inicial para el store simulado
  const initialState = { admin: { refresh: false } };

  // Crea un store simulado utilizando configureStore y el estado inicial
  const store = mockStore(initialState);

  // Renderiza el componente Admin dentro del Provider de react-redux con el store simulado
  render(<Admin store={store} />);

  // Verifica que el texto "Add new registry:" esté presente en la pantalla
  expect(screen.getByText('Add new registry:')).toBeInTheDocument();

  // Verifica que el botón "Add car" esté presente en la pantalla
  const addButton = screen.getByRole('button', { name: 'Add car' });
  expect(addButton).toBeInTheDocument();

  // Simula hacer clic en el botón "Add car"
  fireEvent.click(addButton);

  // Verifica que la acción setRefresh haya sido despachada
  const actions = store.getActions();
  expect(actions).toEqual([setRefresh(true)]);
});
