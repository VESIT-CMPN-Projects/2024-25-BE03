import React from 'react';
import './MeetHistory.css';

const MeetHistory = () => {
    const meetData = [
        {
            link: 'https://meet.example.com/abc123',
            type: 'Created Meeting',
            date: '2025-02-20',
            duration: '1h 30m'
        },
        {
            link: 'https://meet.example.com/def456',
            type: 'Joined',
            date: '2025-02-18',
            duration: '45m'
        },
        {
            link: 'https://meet.example.com/ghi789',
            type: 'Joined',
            date: '2025-02-15',
            duration: '2h'
        },
        {
            link: 'Transcript meet 1',
            type: 'Transcript',
            date: '2025-02-10',
            duration: '30m'
        },
        {
            link: 'https://meet.example.com/mno345',
            type: 'Joined',
            date: '2025-02-05',
            duration: '1h'
        },
        {
            link: 'Transcript meet 2',
            type: 'Transcript',
            date: '2025-02-01',
            duration: '1h 15m'
        },
        {
            link: 'https://meet.example.com/stu901',
            type: 'Created Meeting',
            date: '2025-01-28',
            duration: '2h 30m'
        },
        {
            link: 'https://meet.example.com/vwx234',
            type: 'Created Meeting',
            date: '2025-01-25',
            duration: '1h'
        },
        {
            link: 'https://meet.example.com/yz5678',
            type: 'Joined',
            date: '2025-01-20',
            duration: '1h 45m'
        },
        {
            link: 'https://meet.example.com/abc901',
            type: 'Joined',
            date: '2025-01-15',
            duration: '50m'
        }
    ];

    return (
        <div className='m-2 mt-4 mb-8'>
            <h2 className='text-2xl font-semibold' style={{fontStyle: "oblique"}}>Meet History</h2>
            <div className="meet-history-container overflow-x-auto">
                <table className="meet-history-table min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Meet Link</th>
                            <th className="py-2 px-4 text-left">Type</th>
                            <th className="py-2 px-4 text-left">Date</th>
                            <th className="py-2 px-4 text-left">Meet Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetData.map((meet, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">
                                    <a href={meet.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{meet.link}</a>
                                </td>
                                <td className="py-2 px-4">{meet.type}</td>
                                <td className="py-2 px-4">{meet.date}</td>
                                <td className="py-2 px-4">{meet.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MeetHistory;
