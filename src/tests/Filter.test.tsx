import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Filter from '../components/Filter';

test("renders Filter Input", () => {
    render(<Filter onFilterChange={ () => {} }/>);
    const inputElem = screen.getByTestId("filter-input");
    expect(inputElem).toBeInTheDocument();
});

test("responds to Input changes", () => {
    const mockOnFilterChange = jest.fn();
    render(<Filter onFilterChange={ mockOnFilterChange }/>);
    expect(mockOnFilterChange).not.toHaveBeenCalled();

    const inputElem = screen.getByTestId("filter-input");
    const inputString = "Test 123";

    // Simulate typing in the input
    fireEvent.change(inputElem, {target: {value: inputString}})

    expect(mockOnFilterChange).toHaveBeenCalledWith(inputString);
    expect(inputElem).toHaveDisplayValue(inputString);
});