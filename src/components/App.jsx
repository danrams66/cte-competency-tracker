import React, { useMemo, useState } from 'react';

const scoreDescriptions = {
  '5': 'Independent workplace-level performance',
  '4': 'Minimal help / close to proficient',
  '3': 'Can do with supervision or assistance',
  '2': 'Limited ability / needs more instruction',
  '1': 'Introduced only',
  '0': 'Practiced but cannot demonstrate yet'
};

const rosters = {
  'Grade 9 Graphic Communications': {
    gradeLevel: '9',
    program: 'Graphic Communications',
    students: ['Dan Test', 'Student One', 'Student Two', 'Student Three']
  },
  'Grade 10 Graphic Communications': {
    gradeLevel: '10',
    program: 'Graphic Communications',
    students: ['Student Four', 'Student Five', 'Student Six']
  },
  'Grade 11 Graphic Communications': {
    gradeLevel: '11',
    program: 'Graphic Communications',
    students: ['Student Seven', 'Student Eight', 'Student Nine']
  },
  'Grade 12 Graphic Communications': {
    gradeLevel: '12',
    program: 'Graphic Communications',
    students: ['Student Ten', 'Student Eleven', 'Student Twelve']
  }
};

const projects = {
  'Button Pin Project': [
    {
      id: 'GC-SAFETY-01',
      shortName: 'Safety',
      description: 'Demonstrates safe use of tools, equipment, PPE, and shop procedures.'
    },
    {
      id: 'GC-FILESETUP-01',
      shortName: 'File Setup',
      description: 'Sets up files correctly using proper size, bleed, margins, resolution, and color mode.'
    },
    {
      id: 'GC-ILLUSTRATOR-01',
      shortName: 'Illustrator',
      description: 'Uses Adobe Illustrator tools to create and prepare vector artwork.'
    },
    {
      id: 'GC-DESIGN-01',
      shortName: 'Design',
      description: 'Applies design principles such as layout, alignment, contrast, balance, typography, and color.'
    },
    {
      id: 'GC-CRAFT-01',
      shortName: 'Craft',
      description: 'Produces clean, accurate, professional-quality finished work.'
    },
    {
      id: 'GC-EMPLOY-01',
      shortName: 'Employability',
      description: 'Demonstrates effort, time management, teamwork, responsibility, and professionalism.'
    }
  ],

  'Gallery Art Collage': [
    {
      id: 'GC-SAFETY-01',
      shortName: 'Safety',
      description: 'Demonstrates safe use of tools, equipment, PPE, and shop procedures.'
    },
    {
      id: 'GC-PHOTOSHOP-01',
      shortName: 'Photoshop',
      description: 'Uses Adobe Photoshop tools to edit, adjust, and prepare raster images.'
    },
    {
      id: 'GC-DESIGN-01',
      shortName: 'Design',
      description: 'Applies design principles such as layout, alignment, contrast, balance, typography, and color.'
    },
    {
      id: 'GC-PRINT-01',
      shortName: 'Print Prep',
      description: 'Prepares artwork for digital print, wide-format print, DTF, vinyl, or other production output.'
    },
    {
      id: 'GC-FINISHING-01',
      shortName: 'Finishing',
      description: 'Completes finishing tasks accurately, including cutting, trimming, pressing, assembly, or mounting.'
    },
    {
      id: 'GC-CRAFT-01',
      shortName: 'Craft',
      description: 'Produces clean, accurate, professional-quality finished work.'
    }
  ],

  'DTF Shirt Design': [
    {
      id: 'GC-SAFETY-01',
      shortName: 'Safety',
      description: 'Demonstrates safe use of tools, equipment, PPE, and shop procedures.'
    },
    {
      id: 'GC-DESIGN-01',
      shortName: 'Design',
      description: 'Applies design principles such as layout, alignment, contrast, balance, typography, and color.'
    },
    {
      id: 'GC-ILLUSTRATOR-01',
      shortName: 'Illustrator',
      description: 'Uses Adobe Illustrator tools to create and prepare vector artwork.'
    },
    {
      id: 'GC-FILESETUP-01',
      shortName: 'File Setup',
      description: 'Sets up files correctly using proper size, bleed, margins, resolution, and color mode.'
    },
    {
      id: 'GC-PRINT-01',
      shortName: 'Production',
      description: 'Prepares artwork for digital print, wide-format print, DTF, vinyl, or other production output.'
    },
    {
      id: 'GC-CRAFT-01',
      shortName: 'Craft',
      description: 'Produces clean, accurate, professional-quality finished work.'
    }
  ],

  'Employability / Shop Performance': [
    {
      id: 'GC-EMPLOY-01',
      shortName: 'Professionalism',
      description: 'Demonstrates effort, time management, teamwork, responsibility, and professionalism.'
    },
    {
      id: 'GC-SAFETY-01',
      shortName: 'Safety',
      description: 'Demonstrates safe use of tools, equipment, PPE, and shop procedures.'
    },
    {
      id: 'GC-CUSTOMER-01',
      shortName: 'Directions',
      description: 'Follows job directions and communicates appropriately for live work or customer-based projects.'
    }
  ]
};

export default function App() {
  const [selectedRosterName, setSelectedRosterName] = useState('');
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState({});
  const [activeInfo, setActiveInfo] = useState(null);
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const selectedRoster = rosters[selectedRosterName];
  const selectedCompetencies = projects[selectedProjectName] || [];

  const scoreKey = (studentName, competencyId) => `${studentName}__${competencyId}`;

  const hasGrid = selectedRoster && selectedProjectName && selectedCompetencies.length > 0;

  const totalEnteredScores = useMemo(() => {
    return Object.values(scores).filter((value) => value !== '').length;
  }, [scores]);

  const handleScoreChange = (studentName, competencyId, value) => {
    setScores((prev) => ({
      ...prev,
      [scoreKey(studentName, competencyId)]: value
    }));
  };

  const handleNoteChange = (studentName, value) => {
    setNotes((prev) => ({
      ...prev,
      [studentName]: value
    }));
  };

  const clearGrid = () => {
    setScores({});
    setNotes({});
    setStatus('');
  };

  const handleSaveAll = async () => {
    setStatus('');

    if (!hasGrid) {
      setStatus('⚠️ Please select a roster and project first.');
      return;
    }

    const records = [];

    selectedRoster.students.forEach((studentName) => {
      selectedCompetencies.forEach((competency) => {
        const value = scores[scoreKey(studentName, competency.id)];

        if (value !== undefined && value !== '') {
          records.push({
            studentName,
            gradeLevel: selectedRoster.gradeLevel,
            program: selectedRoster.program,
            project: selectedProjectName,
            competencyId: competency.id,
            competencyDescription: competency.description,
            score: value,
            scoreDescription: scoreDescriptions[value],
            notes: notes[studentName] || '',
            timestamp: new Date().toISOString()
          });
        }
      });
    });

    if (records.length === 0) {
      setStatus('⚠️ No scores entered. Enter at least one score before saving.');
      return;
    }

    try {
      setIsSaving(true);

      await fetch(
        'https://script.google.com/macros/s/AKfycbzbfvnZWWjOSMiR-1S8RqED0wC7eqQLBqnIytA8FjWHLxo7UD9uA34zvaTIZYlBTBL-/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ records })
        }
      );

      setStatus(`✅ Saved ${records.length} competency score record(s).`);
    } catch (error) {
      console.error(error);
      setStatus('❌ Save failed. Check the Apps Script / Google Sheet connection.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>CTE Competency Tracker</h1>
          <p style={styles.subtitle}>
            Teacher scoring grid for recording multiple student competencies at once.
          </p>
        </header>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Setup</h2>

          <div style={styles.setupGrid}>
            <div>
              <label style={styles.label}>Class / Roster</label>
              <select
                value={selectedRosterName}
                onChange={(e) => {
                  setSelectedRosterName(e.target.value);
                  clearGrid();
                }}
                style={styles.input}
              >
                <option value="">Select roster</option>
                {Object.keys(rosters).map((rosterName) => (
                  <option key={rosterName} value={rosterName}>
                    {rosterName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>Project / Assignment</label>
              <select
                value={selectedProjectName}
                onChange={(e) => {
                  setSelectedProjectName(e.target.value);
                  clearGrid();
                }}
                style={styles.input}
              >
                <option value="">Select project</option>
                {Object.keys(projects).map((projectName) => (
                  <option key={projectName} value={projectName}>
                    {projectName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedRoster && (
            <p style={styles.helperText}>
              Selected: <strong>{selectedRoster.program}</strong>, Grade{' '}
              <strong>{selectedRoster.gradeLevel}</strong>,{' '}
              <strong>{selectedRoster.students.length}</strong> students
            </p>
          )}
        </section>

        {hasGrid && (
          <section style={styles.card}>
            <div style={styles.gridHeader}>
              <div>
                <h2 style={styles.sectionTitle}>{selectedProjectName}</h2>
                <p style={styles.helperText}>
                  Enter scores for the competencies you assessed. Leave blank if not assessed.
                </p>
              </div>

              <div style={styles.buttonGroup}>
                <button onClick={clearGrid} style={styles.secondaryButton}>
                  Clear
                </button>
                <button
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  style={{
                    ...styles.button,
                    opacity: isSaving ? 0.7 : 1,
                    cursor: isSaving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSaving ? 'Saving...' : 'Save Class Scores'}
                </button>
              </div>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.stickyStudentHeader}>Student</th>

                    {selectedCompetencies.map((competency) => (
                      <th key={competency.id} style={styles.th}>
                        <span>{competency.shortName}</span>{' '}
                        <button
                          type="button"
                          style={styles.infoButton}
                          title={competency.description}
                          onClick={() =>
                            setActiveInfo(activeInfo === competency.id ? null : competency.id)
                          }
                        >
                          ⓘ
                        </button>

                        {activeInfo === competency.id && (
                          <div style={styles.infoBox}>
                            <strong>{competency.id}</strong>
                            <p style={{ margin: '6px 0 0' }}>{competency.description}</p>
                          </div>
                        )}
                      </th>
                    ))}

                    <th style={styles.th}>Notes</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedRoster.students.map((studentName) => (
                    <tr key={studentName}>
                      <td style={styles.studentCell}>{studentName}</td>

                      {selectedCompetencies.map((competency) => (
                        <td key={competency.id} style={styles.td}>
                          <select
                            value={scores[scoreKey(studentName, competency.id)] || ''}
                            onChange={(e) =>
                              handleScoreChange(studentName, competency.id, e.target.value)
                            }
                            style={styles.scoreSelect}
                          >
                            <option value="">—</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0</option>
                          </select>
                        </td>
                      ))}

                      <td style={styles.notesCell}>
                        <input
                          type="text"
                          placeholder="Optional notes"
                          value={notes[studentName] || ''}
                          onChange={(e) => handleNoteChange(studentName, e.target.value)}
                          style={styles.noteInput}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={styles.helperText}>
              Scores entered: <strong>{totalEnteredScores}</strong>
            </p>

            {status && <p style={styles.status}>{status}</p>}
          </section>
        )}

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Rating Scale</h2>
          <ul style={styles.scaleList}>
            <li><strong>5</strong> — Independent workplace-level performance</li>
            <li><strong>4</strong> — Minimal help / close to proficient</li>
            <li><strong>3</strong> — Can do with supervision or assistance</li>
            <li><strong>2</strong> — Limited ability / needs more instruction</li>
            <li><strong>1</strong> — Introduced only</li>
            <li><strong>0</strong> — Practiced but cannot demonstrate yet</li>
            <li><strong>Blank</strong> — Not taught or not assessed</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f4f4',
    padding: '24px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontSize: '32px',
    color: '#1f2937'
  },
  subtitle: {
    marginTop: '8px',
    color: '#555'
  },
  card: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '8px',
    color: '#1f2937'
  },
  setupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px'
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  helperText: {
    color: '#555',
    marginTop: '12px'
  },
  gridHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  button: {
    padding: '10px 14px',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    background: '#2563eb',
    color: '#ffffff'
  },
  secondaryButton: {
    padding: '10px 14px',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: '1px solid #bbb',
    background: '#ffffff',
    color: '#333',
    cursor: 'pointer'
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '18px',
    border: '1px solid #ddd',
    borderRadius: '10px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '900px'
  },
  th: {
    position: 'relative',
    background: '#f1f5f9',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },
  stickyStudentHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 2,
    background: '#e5e7eb',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    textAlign: 'left',
    minWidth: '180px'
  },
  studentCell: {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    background: '#ffffff',
    padding: '10px',
    borderBottom: '1px solid #eee',
    borderRight: '1px solid #ddd',
    fontWeight: 'bold',
    minWidth: '180px'
  },
  td: {
    padding: '8px',
    borderBottom: '1px solid #eee',
    borderRight: '1px solid #eee',
    textAlign: 'center'
  },
  notesCell: {
    padding: '8px',
    borderBottom: '1px solid #eee',
    minWidth: '220px'
  },
  scoreSelect: {
    width: '64px',
    padding: '6px',
    fontSize: '15px'
  },
  noteInput: {
    width: '100%',
    padding: '7px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  infoButton: {
    border: 'none',
    background: 'transparent',
    color: '#2563eb',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px'
  },
  infoBox: {
    position: 'absolute',
    top: '36px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '260px',
    background: '#ffffff',
    color: '#111827',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    zIndex: 10,
    whiteSpace: 'normal',
    textAlign: 'left',
    fontWeight: 'normal'
  },
  status: {
    marginTop: '14px',
    fontWeight: 'bold'
  },
  scaleList: {
    lineHeight: '1.8'
  }
};
