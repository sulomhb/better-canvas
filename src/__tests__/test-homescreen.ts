import * as React from 'react';
import { Alert } from 'react-native';
import { describe, it, expect, test, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen, { getCourseIdGivenName } from '../app/screens/HomeScreen';
describe('Navigation from HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
  };

  test('Pressing CanvasGPT button navigates to CanvasGPT screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const canvasGPTButton = getByText('CanvasGPT');

    fireEvent.press(canvasGPTButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('CanvasGPT');
  });

  test('Pressing CanvasTube button navigates to Videos screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const canvasTubeButton = getByText('CanvasTube');

    fireEvent.press(canvasTubeButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Videos');
  });
  test('Pressing Modules button navigates to Modules screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const modulesButton = getByText('Modules');

    fireEvent.press(modulesButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Modules', { courseID: undefined });
  });

  test('Pressing Assignments button navigates to Assignments screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const assignmentsButton = getByText('Assignments');

    fireEvent.press(assignmentsButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Assignments', { courseID: undefined });
  });

  test('Pressing Courses Overview button navigates to Courses screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const coursesButton = getByText('Courses Overview');

    fireEvent.press(coursesButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Courses');
  });

  test('Pressing Inbox button navigates to Inbox screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const inboxButton = getByText('Inbox');

    fireEvent.press(inboxButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Inbox');
  });

  test('Pressing Groups button navigates to Groups screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const groupsButton = getByText('Groups');

    fireEvent.press(groupsButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Groups');
  });

  test('Pressing Update PIN button navigates to Update PIN screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const updatePINButton = getByText('Update PIN');

    fireEvent.press(updatePINButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Update PIN');
  });

  test('Pressing Sign Out button replaces to Log In screen', () => {
    const { getByText } = render(React.createElement(HomeScreen, { navigation: mockNavigation }));
    const signOutButton = getByText('Sign Out');

    fireEvent.press(signOutButton);

    expect(mockNavigation.replace).toHaveBeenCalledWith('Log In');
  });
});

describe('getCourseIdGivenName function', () => {
  const favoriteCourses = [
    { id: '1', name: 'Course1' },
    { id: '2', name: 'Course2' },
  ];

  it('should return correct course ID for given course name', () => {
    const courseId = getCourseIdGivenName(favoriteCourses, 'Course1');
    expect(courseId).toBe('1'); 
  });

  it('should return undefined for a non-existent course name', () => {
    const courseId = getCourseIdGivenName(favoriteCourses, 'NonExistentCourse');
    expect(courseId).toBeUndefined();
  });
});