import React, { useState } from 'react';

const programs = [
  'Auto Technology', 'Metal Fabrication', 'Cosmetology', 'Culinary Arts',
  'Carpentry', 'Electrical', 'HVAC', 'Plumbing', 'Medical Assisting',
  'TV & Radio Broadcasting', 'Marketing', 'Graphic Communications',
  'Computer Info Systems', 'Dental Assisting', 'Robotics', 'Criminal Justice',
  'Early Education & Child Care', 'Environmental Science', 'Engineering'
];

const sampleCompetencies = {
  'Graphic Communications': [
    { id: 'GC-01', description: 'Operate digital printing equipment safely.' },
    { id: 'GC-02', description: 'Apply design principles in Adobe Illustrator.' }
  ],
  'Auto Technology': [
    { id: 'AT-01', description: 'Perform routine oil and filter change.' },
    { id: 'AT-02', description: 'Diagnose engine warning lights.' }
  ]
};

export default function App() {
  const [studentName, setStudentName] = useState('');
  const [program, setProgram] = useState('');
  const [progress, setProgress] = useState({});
  const [status, setStatus] = useState('');

  const handleNoteChange = (id, note) => {
    setProgress(prev => ({ ...prev, [id]: note }));
  };

  const handleSave = () => {
    const data = {
      studentName,
      program,
      progress,
      timestamp: new Date().toISOString()
    };
    console.log('Saving to Google Sheets (simulated):', data);
    setStatus('✅ Progress saved (Google Sheets integration simulated)');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>CTE Competency Tracker</h1>
      <input
        placeholder="Enter student name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={{ width: '100%', padding: 8, fontSize: 16, marginBottom: 16 }}
      />
      <select
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        style={{ width: '100%', padding: 8, fontSize: 16, marginBottom: 16 }}
      >
        <option value="">Select CTE Program</option>
        {programs.map((prog) => (
          <option key={prog} value={prog}>{prog}</option>
        ))}
      </select>
      {sampleCompetencies[program] && (
        <div>
          <h2>Competencies for {program}</h2>
          {sampleCompetencies[program].map((comp) => (
            <div key={comp.id} style={{ marginBottom: 12 }}>
              <p><strong>{comp.description}</strong></p>
              <textarea
                rows={3}
                value={progress[comp.id] || ''}
                onChange={(e) => handleNoteChange(comp.id, e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      )}
      <button onClick={handleSave} style={{ marginTop: 20, padding: 10, fontSize: 16 }}>
        Save Progress
      </button>
      {status && <p style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}
