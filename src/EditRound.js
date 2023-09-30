import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './index.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CountdownTimer from './CountdownTimer';

function EditRound({ round }) {
  const { posterId } = useParams();
  const [posterIdRound] = useState(posterId);
  const [posterTitle, setPosterTitle] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [researchScore, setResearchScore] = useState(0);
  const [communicationScore, setCommunicationScore] = useState(0);
  const [presentationScore, setPresentationScore] = useState(0);

  useState(() => {
    document.title = `Edit Round - ${round}`;
  }, [round]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/insertgrade/round${round}_edit/` + posterId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!ignore) {
        if (response.status === 200) {
          const data = await response.json();
          setPosterTitle(data.poster_title);
          setStudentName(data.student_name);
          setStudentEmail(data.student_email);
          setStudentDepartment(data.student_department);
          setResearchScore(data.research_score);
          setCommunicationScore(data.communication_score);
          setPresentationScore(data.presentation_score);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { ignore = true; };
  }, [posterIdRound, round]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
        <>
        <CountdownTimer targetDate={new Date('2023-04-22T09:00:00-05:00')} />
      <div className="bg-gradient-to-r from-ffbd00 to-[#eca600]">
        <div className='container mx-auto px-4 py-6'>
      <Studentdetails
        posterIdRound={posterIdRound}
        studentName={studentName}
        posterTitle={posterTitle}
        studentEmail={studentEmail}
        studentDepartment={studentDepartment}
        round={round}
      />
      <Scoringfields
        posterIdRound={posterIdRound}
        researchScore={researchScore}
        communicationScore={communicationScore}
        presentationScore={presentationScore}
        setResearchScore={setResearchScore}
        setCommunicationScore={setCommunicationScore}
        setPresentationScore={setPresentationScore}
        round={round}
      />
              </div>
      </div>
    </>
  );
}

function Studentdetails({ posterIdRound, studentName, posterTitle, studentEmail, studentDepartment, round }) {
  return (
    <>
    <br />
    <div className="mx-auto px-4 py-8 bg-white rounded-lg overflow-hidden">
    <div className="md:flex">
      <div className="p-1 mx-1 md:mx-0">
      <a href='/poster/'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          &lt;&lt; Go back
        </button></a>
      <br />
      <br />
      <h1>Edit Score Round - {round}</h1>
      {/* <hr /> */}
      <p className="text-lg"><span className="font-bold">Poster ID:</span> {posterIdRound}</p>
        <p className="text-lg"><span className="font-bold">Poster Title:</span> {posterTitle}</p>
        <p className="text-lg"><span className="font-bold">Student Name:</span> {studentName}</p>
        <p className="text-lg"><span className="font-bold">Student Department:</span> {studentDepartment}</p> 
      {/* <hr /> */}
      </div>
      </div>
     </div>
    </>
  );
}

function Scoringfields({
  posterIdRound,
  researchScore,
  communicationScore,
  presentationScore,
  setResearchScore,
  setCommunicationScore,
  setPresentationScore,
  round,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const handleFormsubmit = async (event) => { 
        event.preventDefault();
        setLoading(true);
        setError("");
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}/insertgrade/round${round}_edit/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
            poster_id: posterIdRound,
            research_score: researchScore,
            communication_score: communicationScore,
            presentation_score: presentationScore,
            }),
        });
    
        if (response.status === 200) {
            setLoading(false);
            window.location.href = "/poster/";
        } else {
            const data = await response.json();
            setError(data.error);
            setLoading(false);
        }
        };
 return (
    <>
    <br />
    <div className="mx-auto px-4 py-8 bg-white rounded-lg overflow-hidden">
      <div className="bg-white rounded-lg overflow-hidden">
        <form onSubmit={handleFormsubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="researchScore" className="block text-gray-700 font-bold mb-2">Research Score (0-50)</label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="researchScore"
              aria-describedby="researchScore"
              value={researchScore}
              onChange={(event) => setResearchScore(event.target.value)}
            />
            <div className="text-gray-500 text-xs mt-1">
              Enter Research Score
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="communicationScore" className="block text-gray-700 font-bold mb-2">Communication Score (0-30)</label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="communicationScore"
              aria-describedby="communicationScore"
              value={communicationScore}
              onChange={(event) => setCommunicationScore(event.target.value)}
            />
            <div className="text-gray-500 text-xs mt-1">
              Enter Communication Score
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="presentationScore" className="block text-gray-700 font-bold mb-2">Presentation Score (0-20)</label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="presentationScore"
              aria-describedby="presentationScore"
              value={presentationScore}
              onChange={(event) => setPresentationScore(event.target.value)}
            />
            <div className="text-gray-500 text-xs mt-1">
              Enter Presentation Score
            </div>
          </div>
          <p className="text-red-500 text-xs italic mb-4">{error}</p>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                Loading...
              </>
            ) : (
              "Submit Scores"
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
        }
        
        
export default EditRound;