import React from 'react';
import './App.css';

import ResumeForm from './components/ResumeForm'; // Import the ResumeForm component

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Résumé Builder</h1>
            </header>
            <ResumeForm /> {/* Render the ResumeForm component */}
        </div>
    );
}

export default App;

