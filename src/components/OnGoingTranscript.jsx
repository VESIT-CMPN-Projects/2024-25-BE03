import React from 'react';

const OnGoingTranscript = () => {
    const transcriptData = [
        { speaker: 'Alice', text: 'Hello, how are you?' },
        { speaker: 'Bob', text: 'I am good, thank you! How about you?' },
        { speaker: 'Alice', text: 'I am doing well, thanks for asking.' },
        { speaker: 'Bob', text: 'Great to hear!' },
        { speaker: 'Alice', text: 'Hello, how are you?' },
        { speaker: 'Bob', text: 'I am good, thank you! How about you?' },
        { speaker: 'Alice', text: 'I am doing well, thanks for asking.' },
        { speaker: 'Bob', text: 'Great to hear!' }, { speaker: 'Alice', text: 'Hello, how are you?' },
        { speaker: 'Bob', text: 'I am good, thank you! How about you?' },
        { speaker: 'Alice', text: 'I am doing well, thanks for asking.' },
        { speaker: 'Bob', text: 'Great to hear!' }, { speaker: 'Alice', text: 'Hello, how are you?' },
        { speaker: 'Bob', text: 'I am good, thank you! How about you?' },
        { speaker: 'Alice', text: 'I am doing well, thanks for asking.' },
        { speaker: 'Bob', text: 'Great to hear!' }, { speaker: 'Alice', text: 'Hello, how are you?' },
        { speaker: 'Bob', text: 'I am good, thank you! How about you?' },
        { speaker: 'Alice', text: 'I am doing well, thanks for asking.' },
        { speaker: 'Bob', text: 'Great to hear!' }, { speaker: 'Alice', text: 'Hello, how are you?' },
        { speaker: 'Bob', text: 'I am good, thank you! How about you?' },
        { speaker: 'Alice', text: 'I am doing well, thanks for asking.' },
        { speaker: 'Bob', text: 'Great to hear!' },
    ];

    return (
        <div className="p-4 h-[50vh] overflow-y-auto">
            {transcriptData.map((line, index) => (
                <div key={index} className="mb-2">
                    <strong>{line.speaker}:</strong> {line.text}
                </div>
            ))}
        </div>
    );
};

export default OnGoingTranscript;