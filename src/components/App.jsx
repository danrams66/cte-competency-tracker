import React, { useState } from 'react';

const programs = [
  'Graphic Communications',
  'Auto Technology',
  'Metal Fabrication',
  'Cosmetology',
  'Culinary Arts',
  'Carpentry',
  'Electrical',
  'HVAC',
  'Plumbing',
  'Medical Assisting',
  'TV & Radio Broadcasting',
  'Marketing',
  'Computer Info Systems',
  'Dental Assisting',
  'Robotics',
  'Criminal Justice',
  'Early Education & Child Care',
  'Environmental Science',
  'Engineering'
];

const projects = [
  'Button Pin Project',
  'Gallery Art Collage',
  'DTF Shirt Design',
  'Signs / Vinyl Cutting',
  'Book Making',
  'Vehicle Wrap Design',
  'Live Work / Customer Job',
  'Employability / Shop Performance',
  'Safety',
  'Other'
];

const competencies = {
  'Graphic Communications': [
    {
      id: 'GC-SAFETY-01',
      description: 'Demonstrates safe use of tools, equipment, PPE, and shop procedures.'
    },
    {
      id: 'GC-DESIGN-01',
      description: 'Applies design principles such as layout, alignment, contrast, balance, typography, and color.'
    },
    {
      id: 'GC-ILLUSTRATOR-01',
      description: 'Uses Adobe Illustrator tools to create and prepare vector artwork.'
    },
    {
      id: 'GC-PHOTOSHOP-01',
      description: 'Uses Adobe Photoshop tools to edit, adjust, and prepare raster images.'
    },
    {
      id: 'GC-FILESETUP-01',
      description: 'Sets up files correctly using proper size, bleed, margins, resolution, and color mode.'
    },
    {
      id: 'GC-PRINT-01',
      description: 'Prepares artwork for digital print, wide-format print, DTF, vinyl, or other production output.'
    },
    {
      id: 'GC-FINISHING-01',
      description: 'Completes finishing tasks accurately, including cutting, trimming, pressing, assembly, or mounting.'
    },
    {
      id: 'GC-CRAFT-01',
      description: 'Produces clean, accurate, professional-quality finished work.'
    },
    {
      id: 'GC-EMPLOY-01',
      description: 'Demonstrates employability skills including effort, time management, teamwork, responsibility, and professionalism.'
    },
    {
      id: 'GC-CUSTOMER-01',
      description: 'Follows job directions and communicates appropriately for live work or customer-based projects.'
    }
  ]
};

const scoreDescriptions = {
  '5': 'Independent workplace-level performance',
  '4': 'Minimal help / close to proficient',
  '3': 'Can do with supervision or assistance',
  '2': 'Limited ability / needs more instruction',
  '1': 'Introduced only',
  '0': 'Practiced but cannot demonstrate yet'
};

export default function App() {
  const [studentName, setStudentName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [program, setProgram] = useState('Graphic Communications');
  const [project, setProject] = useState('');
  const [competencyId, setCompetencyId] = useState('');
  const [score, setScore] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const selectedCompetencies = competencies[program] || [];
  const selectedCompetency = selectedCompetencies.find(
    (comp) => comp.id === competencyId
  );

  const resetForm = () => {
    setProject('');
    setCompetencyId('');
    setScore('');
    setNotes('');
  };

  const handleSave = async () => {
    setStatus('');

    if (!studentName || !gradeLevel || !program || !project || !competencyId || score === '') {
      setStatus('⚠️ Please complete all required fields before saving.');
      return;
    }

    const data = {
      studentName,
      gradeLevel,
      program,
      project,
      competencyId,
      competencyDescription: selectedCompetency?.description || '',
      score,
      scoreDescription: scoreDescriptions[score],
      notes,
      timestamp: new Date().toISOString()
    };

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
          body: JSON.stringify(data)
        }
      );

      setStatus('✅ Competency score saved.');
      resetForm();
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
            Teacher-only tracker for recording student competency progress.
          </p>
        </header>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Student Information</h2>

          <label style={styles.label}>Student Name *</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Grade Level *</label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            style={styles.input}
          >
            <option value="">Select grade level</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>

          <label style={styles.label}>CTE Program *</label>
          <select
            value={program}
            onChange={(e) => {
              setProgram(e.target.value);
              setCompetencyId('');
            }}
            style={styles.input}
          >
            {programs.map((prog) => (
              <option key={prog} value={prog}>
                {prog}
              </option>
            ))}
          </select>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Competency Record</h2>

          <label style={styles.label}>Project / Unit *</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            style={styles.input}
          >
            <option value="">Select project or unit</option>
            {projects.map((proj) => (
              <option key={proj} value={proj}>
                {proj}
              </option>
            ))}
          </select>

          <label style={styles.label}>Competency *</label>
          <select
            value={competencyId}
            onChange={(e) => setCompetencyId(e.target.value)}
            style={styles.input}
          >
            <option value="">Select competency</option>
            {selectedCompetencies.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.id} — {comp.description}
              </option>
            ))}
          </select>

          {selectedCompetency && (
            <div style={styles.competencyBox}>
              <strong>{selectedCompetency.id}</strong>
              <p style={{ margin: '6px 0 0' }}>{selectedCompetency.description}</p>
            </div>
          )}

          <label style={styles.label}>Teacher Score *</label>
          <select
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={styles.input}
          >
            <option value="">Select score</option>
            <option value="5">5 — Independent workplace-level performance</option>
            <option value="4">4 — Minimal help / close to proficient</option>
            <option value="3">3 — Can do with supervision or assistance</option>
            <option value="2">2 — Limited ability / needs more instruction</option>
            <option value="1">1 — Introduced only</option>
            <option value="0">0 — Practiced but cannot demonstrate yet</option>
          </select>

          <label style={styles.label}>Evidence / Notes</label>
          <textarea
            rows="5"
            placeholder="Example: Student created a clean 3.5-inch button design with correct safe area and minor help with alignment."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={styles.textarea}
          />

          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              ...styles.button,
              opacity: isSaving ? 0.7 : 1,
              cursor: isSaving ? 'not-allowed' : 'pointer'
            }}
          >
            {isSaving ? 'Saving...' : 'Save Competency Score'}
          </button>

          {status && <p style={styles.status}>{status}</p>}
        </section>

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
    maxWidth: '850px',
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
    color: '#1f2937'
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginTop: '14px',
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
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    resize: 'vertical'
  },
  competencyBox: {
    background: '#eef6ff',
    border: '1px solid #b8dcff',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '12px'
  },
  button: {
    marginTop: '18px',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    background: '#2563eb',
    color: '#ffffff'
  },
  status: {
    marginTop: '14px',
    fontWeight: 'bold'
  },
  scaleList: {
    lineHeight: '1.8'
  }
};
