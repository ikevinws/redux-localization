import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    initialize,
    getActiveLanguage,
    getLanguages,
} from 'redux-localization';
import { AppState } from 'store/store';
import './App.css';

const Test = () => {
    const currentLang = useSelector((state: AppState) =>
        getActiveLanguage(state.localization)
    );
    const languages = useSelector((state: AppState) =>
        getLanguages(state.localization)
    );
    console.log(languages);
    return <div>{currentLang}</div>;
};

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            initialize({
                languages: [
                    { code: 'en', name: 'English' },
                    { code: 'fr', name: 'French' },
                ],
            })
        );
    }, []);

    return (
        <div className="App">
            <Test />
        </div>
    );
}

export default App;
