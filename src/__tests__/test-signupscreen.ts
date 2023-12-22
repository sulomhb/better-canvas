import * as React from 'react';
import { describe, it, expect, test, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../app/screens/Authorization/RegisterScreen';
import { Alert } from 'react-native';

describe('Navigation Tests', () => {
  test('Get API-token button is rendered correctly', () => {
    const { getByText } = render(React.createElement(RegisterScreen));
    const getAPITokenButton = getByText('Get API-token');
    expect(getAPITokenButton).toBeDefined();
  });

  jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
  }));

  describe('Sign Up Screen Tests', () => {
    test('Sign Up button throws alert if one of the inputs are left empty', () => {
      const { getByText, getByPlaceholderText } = render(React.createElement(RegisterScreen));
      const signUpButton = getByText('Register');
      const emailInput = getByPlaceholderText('E-mail');
      const name = getByPlaceholderText('Name');
      const apiTokenInput = getByPlaceholderText('API - token');
      const pinInput = getByPlaceholderText('PIN');
  
      expect(signUpButton).toBeDefined();
      expect(name).toBeDefined();
      expect(apiTokenInput).toBeDefined();
      expect(emailInput).toBeDefined();
      expect(pinInput).toBeDefined();
  
      fireEvent.press(signUpButton);
  
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
