import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import "./index.css";
import './ScoreTableRound1.css';
import './Roundtwo.css';

import CountdownTimer from './CountdownTimer';


function ScoreEntry() {
  useState(() => {
    document.title = "Score Entry Page";
  }, []);
  const [judge, setJudge] = useState("");
  const [round1Score, setRound1Score] = useState([]);
  const [round2Score, setRound2Score] = useState([]);
  const [finalistPosterId, setFinalistPosterId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [round1PosterId, setRound1PosterId] = useState("");
  const [round2PosterId, setRound2PosterId] = useState("");
  const [status_of_round_1_table, set_status_of_round_1_table] = useState(true);
  const [status_of_round_2_table, set_status_of_round_2_table] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/home/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setJudge(data.Judge);
      setRound1Score(data.score_round_1);
      setRound2Score(data.score_round_2);
      setFinalistPosterId(data.finalist_poster_id);
      set_status_of_round_1_table(data.status_of_round_1_table);
      set_status_of_round_2_table(data.status_of_round_2_table);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <CountdownTimer targetDate={new Date('2023-04-22T09:00:00-05:00')} />
      <div className="bg-gradient-to-r from-ffbd00 to-[#eca600]">
        <Judgeinfo judge={judge} />
        <div className="container">
          <Roundone finalistPosterId={finalistPosterId} round1PosterId={round1PosterId} setRound1PosterId={setRound1PosterId} />
          <Roundtwo finalistPosterId={finalistPosterId} round2PosterId={round2PosterId} setRound2PosterId={setRound2PosterId} />
          {/* <Tableinfo judge={judge} status_of_round_1_table={status_of_round_1_table} status_of_round_2_table={status_of_round_2_table} /> */}
          <ScoreTableRound2 round2Score={round2Score} status_of_round_2_table={status_of_round_2_table} />
          <ScoreTableRound1 round1Score={round1Score} status_of_round_1_table={status_of_round_1_table} />
        </div>
      </div>
    </>
  );            
}

function Judgeinfo({ judge }) {
  return (
    <>
      <div className="container mx-auto px-4 py-6 sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="bg-white shadow-md rounded-lg p-8 animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold text-center mb-6 animate__animated animate__fadeInDown">
            SCORE ENTRY
          </h1>
          <h2 className="mb-4"> Welcome {judge}!</h2>
          <br />
          <div>
            <p className="mb-4">
              Thank you for being a judge today! Please enter scores numerically for one poster at a time. When you enter the poster ID, the student's name and poster title will display. Once you have clicked Submit Scores you will see all of your scores at the bottom of the page. You can edit your scores later if necessary. To see the scoring rubric, click on Rubric on the above menu, then click back to Score Entry Page to enter scores.
            </p>
          </div>
        </div>
      </div>

    </>
  );
}


function Roundone({ finalistPosterId, round1PosterId, setRound1PosterId }) {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // url to check if the poster id is valid or not
    // http://127.0.0.1:8000/precheckposter/round1_pre_check/ + round1PosterId

    const response = await fetch(`${process.env.REACT_APP_API_URL}/precheckposter/round1_pre_check/` + round1PosterId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    // if the response is apart from 200 then show the error message
    if (response.status !== 200) {
      const data = await response.json();
      // if there is data.status then show the error message
      if (data.status) {
        document.getElementById("poster-1-error").innerHTML = data.status;
        document.getElementById("poster-1-error").style.color = "red";
        setLoading(false);
      }
      else {
        document.getElementById("poster-1-error").innerHTML = "Something went wrong, Please refresh the page; <button onClick={window.location.reload()}>Refresh</button>";
        document.getElementById("poster-1-error").style.color = "red";
        setLoading(false);
      }
    }
    else {
      window.location.href = "/round/1/" + round1PosterId;
      setLoading(false);
    }
  }

  return (
    <>
      {finalistPosterId.length === 0 && (
        <div className="text-2xl font-bold text-center mb-4 bg-white shadow-md rounded-lg p-4">
          <form onSubmit={handleSubmit} className="roundone-form">
            <div className="mb-3">
              <label htmlFor="posterId" className="block font-bold mb-1">
                ROUND ONE: Poster ID Number
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                id="posterId"
                aria-describedby="posterId"
                value={round1PosterId}
                onChange={(e) => setRound1PosterId(e.target.value)}
              />
              <div id="Round-1" className="text-sm text-gray-500">
                Enter Poster ID for Round - 1
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center roundone-btn">
              {loading ? (
                <>
                  <span className="animate-spin mr-2" aria-hidden="true">
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5.5 9a1.5 1.5 0 01-1.5 1.5h-3v3a1.5 1.5 0 01-3 0v-3h-3a1.5 1.5 0 010-3h3v-3a1.5 1.5 0 013 0v3h3a1.5 1.5 0 011.5 1.5z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Loading...
                </>
              ) : (
                'Begin Judging'
              )}
            </button>
            <p id="poster-1-error" className="text-red-500 text-sm mt-2"></p>
          </form>
        </div>
      )}
      <br />
    </>
  );
  
}

function Roundtwo({ finalistPosterId, round2PosterId, setRound2PosterId }) {

  const [loading, setLoading] = useState(false);

  const undergraduateFinalists = finalistPosterId.filter(id => id >= 100 && id <= 199);
  const graduateFinalists = finalistPosterId.filter(id => id >= 200 && id <= 299);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/precheckposter/round2_pre_check/` + round2PosterId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    // if the response is apart from 200 then show the error message
    if (response.status !== 200) {
      const data = await response.json();
      document.getElementById("poster-2-error").innerHTML = data.status;
      document.getElementById("poster-2-error").style.color = "red";
      setLoading(false);

    }
    else {
      window.location.href = "/round/2/" + round2PosterId;
      setLoading(false);
    }

  }

  return (
    <>
      {finalistPosterId.length === 0 ? (
        <></>
      ) : (
        <div className="text-2xl font-bold text-center mb-4 bg-white shadow-md rounded-lg p-4">
          <div className="finalist-poster-ids">
            {undergraduateFinalists.length > 0 && (
              <p className="text-lg font-bold text-red-500">
                Undergraduate Finalist Poster IDs: {undergraduateFinalists.join(', ')}
              </p>
            )}
            {graduateFinalists.length > 0 && (
              <p className="text-lg font-bold text-red-500">
                Graduate Finalist Poster IDs: {graduateFinalists.join(', ')}
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="roundtwo-form">
            <div className="mb-3">
              <label htmlFor="posterId" className="block font-bold mb-1">
                ROUND TWO: Poster ID Number
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                id="posterId"
                aria-describedby="posterId"
                value={round2PosterId}
                onChange={(e) => setRound2PosterId(e.target.value)}
              />
              <div id="Round-2" className="text-sm text-gray-500">
                Enter Poster ID for Round - 2
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center roundtwo-btn">
              {loading ? (
                <>
                  <span className="animate-spin mr-2" aria-hidden="true">
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5.5 9a1.5 1.5 0 01-1.5 1.5h-3v3a1.5 1.5 0 01-3 0v-3h-3a1.5 1.5 0 010-3h3v-3a1.5 1.5 0 013 0v3h3a1.5 1.5 0 011.5 1.5z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Loading...
                </>
              ) : (
                'Begin Judging'
              )}
            </button>
            <p id="poster-2-error" className="text-red-500 text-sm mt-2"></p>
          </form>
        </div>
      )}
      <br />
    </>
  );

}

function Tableinfo({ judge, status_of_round_1_table, status_of_round_2_table }) {
  return (
    <>
      {status_of_round_1_table || status_of_round_2_table ? (
        <>
          <div className="container-table text-2xl font-bold mb-4 bg-white shadow-md rounded-lg p-4 animate__animated animate__fadeInDown">
            <h3> Posters scored by <u>{judge}!</u></h3>
          </div>
          <br />
        </>
      ) : (
        <div>
        </div>
      )}
    </>
  )
}

function ScoreTableRound2({ round2Score, status_of_round_2_table }) {
  return (
    <>
      {status_of_round_2_table ? (
        <>
          <div className="container-card">
            <h3 className="text-2xl font-bold text-center mb-4 bg-white shadow-md rounded-lg p-4 animate__animated animate__fadeInDown">Round 2 Scored by {round2Score[0].judge}</h3>
            <div className="row">
              {round2Score.map((score) => (
                <div className="col-md-4 mb-4" key={score.id}>
                  <Card className="h-100 shadow-sm rounded score-card">
                    <Card.Body>
                      <Card.Title className="mb-3 student-name">Student Name: {score.student_name}</Card.Title>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Badge pill className="round-badge">
                          Poster ID: {score.poster_id}
                        </Badge>
                        <Badge pill className="round-badge">
                          Round - 2
                        </Badge>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>Research Score (0-50)</div>
                        <div>{score.research_score}</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>Communication Score (0-30)</div>
                        <div>{score.communication_score}</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>Presentation Score (0-20)</div>
                        <div>{score.presentation_score}</div>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <div>Total Score</div>
                        <div>{score.total_score}</div>
                      </div>
                      <div className="text-right mt-4">
                        <button
                          type="button"
                          className="btn edit-score-btn"
                          onClick={() => window.location.href = "/editscore/2/" + score.poster_id}
                        >
                          Edit Score
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

          </div>

        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

function ScoreTableRound1({ round1Score, status_of_round_1_table }) {
  return (
    <>
      {status_of_round_1_table ? (
        <>
          <div className="container-card">
            <h3 className="text-2xl font-bold text-center mb-4 bg-white shadow-md rounded-lg p-4 animate__animated animate__fadeInDown">Round 1 Scored by {round1Score[0].judge}</h3>
            <div className="row">
              {round1Score.map((score) => (
                <div className="col-md-4 mb-4" key={score.id}>
                  <Card className="h-100 shadow-sm rounded score-card">
                    <Card.Body>
                      <Card.Title className="mb-3 student-name">Student Name: {score.student_name}</Card.Title>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Badge pill className="round-badge">
                          Poster ID: {score.poster_id}
                        </Badge>
                        <Badge pill className="round-badge">
                          Round - 1
                        </Badge>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>Research Score (0-50)</div>
                        <div>{score.research_score}</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>Communication Score (0-30)</div>
                        <div>{score.communication_score}</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>Presentation Score (0-20)</div>
                        <div>{score.presentation_score}</div>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <div>Total Score</div>
                        <div>{score.total_score}</div>
                      </div>
                      <div className="text-right mt-4">
                        <button
                          type="button"
                          className="btn edit-score-btn"
                          onClick={() => window.location.href = "/editscore/1/" + score.poster_id}
                        >
                          Edit Score
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

          </div>
          <br />
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}






export default ScoreEntry;
