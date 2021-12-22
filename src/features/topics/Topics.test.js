import reducer, { addTopic } from './topicSlice';
import { render, screen, fireEvent } from "@testing-library/react";
import App from '../../app/App';
import store from '../../app/store'
import { Provider } from 'react-redux';

describe('Topic Component', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            topics: {}
        });
    });
    
    // jesus christ, a test that has actually worked!!!!
    test('should add a new topic', () => {
        const { getByText, getByTestId, getAllByTestId, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>)
        //simulate click on 'topics'
        fireEvent.click(getByText('Topics'));
        //simulate click on 'Create New Topic'
        fireEvent.click(getByText('Create New Topic'));
        //simulate input entry in 'Topic Name'
        const input = getByPlaceholderText('Topic Name');
        fireEvent.change(input, { target: { value: 'Books'}});
        //simulate selecting an icon 
        fireEvent.change(getByTestId('select'), { target: { value: "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/book.svg" }})
        let options = getAllByTestId('select-option');
        expect(options[0].selected).toBeTruthy();
        //simulate click on 'Add Topic'
        fireEvent.click(getByText('Add Topic'))
        //expect topic name to be in the document.
        const element = screen.getByText(/Books/i);
        expect(element).toBeInTheDocument();
    })
})