import * as React from 'react';
import { describe, it, expect, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../app/screens/Authorization/LoginScreen';

describe('Navigation Tests', () => {
  test('Sign Up button renders correctly', () => {
    const { getByText } = render(React.createElement(LoginScreen));
    const registerButton = getByText('Sign Up');
    expect(registerButton).toBeDefined();
  });

  test('Log In button renders correctly', () => {
    const { getByText } = render(React.createElement(LoginScreen));
    const loginButton = getByText('Log In');
    
    expect(loginButton).toBeDefined();
  });

  test('Show PIN In button renders correctly', () => {
    const { getByText } = render(React.createElement(LoginScreen));
    const showPIN = getByText('Show PIN');
    expect(showPIN).toBeDefined();
  });
  

  test('Forgot PIN button renders correctly', () => {
    const { getByText } = render(React.createElement(LoginScreen));
    const forgotPIN = getByText('Forgot PIN?');
    expect(forgotPIN).toBeDefined();
  });
});
