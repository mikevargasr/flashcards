import reducer, { addQuiz } from './quizSlice';
import { addTopic } from '../topics/topicSlice';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import App from '../../app/App';
import store from '../../app/store'
import { Provider } from 'react-redux';

describe('Quizzes Component', () => {
    
    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            quizzes: {}
        });
    })

    // do I need to clear state before doing this test??

    test('should allow you to add a quiz to a topic', () => {
        //below I do an actual dispatch to add a Topic so that the topic shows up in the options menu. Maybe I should be mocking this?
        store.dispatch(addTopic({id: 1, name: 'Books', icon: 'https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/book.svg'}))

        const { getByText, getByTestId, getAllByTestId, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>)
        //click on 'Quizzes'
        fireEvent.click(getByText('Quizzes'));
        //click on 'Create New Quiz
        fireEvent.click(getByText('Create New Quiz'));
        // input title in 'Quiz Title'
        const input2 = getByPlaceholderText('Quiz Title');
        fireEvent.change(input2, { target: { value: 'Book Authors'}});
        // select topic in from Topics
        fireEvent.change(getByTestId('select-quiz'), { target: { value: 1 }});
        let topicOptions = getAllByTestId('topic-options');
        expect(topicOptions[1].selected).toBeTruthy();
        // click on 'Add a Card'
        fireEvent.click(getByText('Add a Card'));
        // add a question in 'Front'
        const frontInput = getByPlaceholderText('Front');
        fireEvent.change(frontInput, { target: { value: 'Who wrote Harry Potter?'}})
        // add an answer in 'Back'
        const backInput = getByPlaceholderText('Back');
        fireEvent.change(backInput, { target: { value: 'J.K. Rowling'}});
        // click on 'Create Quiz'
        fireEvent.click(getByText('Create Quiz'));
        // expect quiz name to be in the document
        const element2 = screen.getByText(/Book Authors/i);
        expect(element2).toBeInTheDocument();
    })
})