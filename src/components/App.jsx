import React, { useState } from 'react';

const competenciesSample = [
  {
    strand: "Safety and Health Knowledge and Skills",
    competencies: [
      {
        id: "RAT-SH-01",
        description: "Demonstrate proper use of personal protective equipment (PPE).",
      },
      {
        id: "RAT-SH-02",
        description: "Identify and mitigate workplace hazards.",
      },
    ],
  },
  {
    strand: "Technical Knowledge and Skills",
    competencies: [
      {
        id: "RAT-TK-01",
        description: "Program and operate robotic systems.",
      },
      {
        id: "RAT-TK-02",
        description: "Integrate sensors and actuators in automation systems.",
      },
    ],
  },
];

export default function App() {
  const [studentName, setStudentName] = useState("");
  const [progress, setProgress] = useState({});

  const updateProgress = (id, value) => {
    setProgress({ ...progress, [id]: value });
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>CTE Competency Tracker</h1>
      <input
        placeholder="Enter student name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={{ padding: 8, fontSize: 16, width: '100%', marginBottom: 20 }}
      />
      {competenciesSample.map((strand) => (
        <div key={strand.strand} style={{ marginBottom: 20 }}>
          <h2>{strand.strand}</h2>
          {strand.competencies.map((comp) => (
            <div key={comp.id} style={{ marginBottom: 10 }}>
              <p><strong>{comp.description}</strong></p>
              <textarea
                placeholder="Enter progress notes"
                value={progress[comp.id] || ""}
                onChange={(e) => updateProgress(comp.id, e.target.value)}
                style={{ width: '100%', height: 60 }}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => alert(`Progress saved for ${studentName}`)}>Save Progress</button>
    </div>
  );
}
