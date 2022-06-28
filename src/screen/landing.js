import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./landing.css";

export default function Landing() {
  const [careers, setCareers] = useState([]);
  const [details, setDetails] = useState([]);
  const [toggler, setToggler] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [ascend, setAscend] = useState("⬆️");
  const [info, setInfo] = useState("none");

  let fetchCareers = () => {
    fetch(`https://automationreplaceapi.herokuapp.com/automations`)
      .then((res) => res.json())
      .then((data) => {
        setCareers(data);
      });
  };
  useEffect(() => {
    fetchCareers();
  }, [toggle2]);

  // console.log(careers);
  const [filter, setFilter] = useState([]);
  for (let i = 0; i < careers.length; i++) {
    const { __v, ...deets } = careers[0];
    // setFilter(deets);
  }
  // console.log(filter);

  function setDisplay() {
    if (toggler == true) {
      setAscend("⬇️");
      setCareers(
        careers.sort((a, b) => {
          if (a.Probability < b.Probability) return -1;
          return a.Probability > b.Probability ? 1 : 0;
        })
      );
    } else {
      setAscend("⬆️");
      setCareers(
        careers.sort((a, b) => {
          if (a.Probability > b.Probability) return -1;
          return a.Probability < b.Probability ? 1 : 0;
        })
      );
    }
    setToggler((prevCheck) => !prevCheck);
  }
  function resetDisplay() {
    if (toggle2 == true) {
      setToggle2(true);
    } else {
      setToggle2(false);
    }
    setToggle2((prevCheck) => !prevCheck);
  }
  function showDetails(e) {
    setInfo(e.target.dataset.id);
  }

  return (
    <div className="landingPage">
      <div className="landingLeft">
        <div className="graphBox">
          <div className="graphMid">
            <div className="graphY">Automation Probability</div>
            <div className="graphContainer">
              {careers.map((data) => (
                <div
                  onClick={showDetails}
                  data-id={data._id}
                  key={data._id}
                  className="bars"
                  style={{
                    height: "calc(100% * " + data.Probability + ")",
                    animation: data.Probability + "s " + "slideDown",
                    transition: data.Probability + "s ",
                  }}
                >
                  <div className="barName" data-id={data._id} key={data._id}>
                    {data.SOC}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="graphX">Occupations</div>
        </div>
        <div>
          <button onClick={setDisplay}>{ascend}</button>
          <button onClick={resetDisplay}>🔀</button>
        </div>
        <div className="graphBox">
          <div className="listContainer">
            {careers.map(
              (data) =>
                data._id.includes(info) && (
                  <div className="state">
                    {Object.keys(data).map((info) => (
                      <div>
                        <span>{info}:</span>
                        {data[info]}
                      </div>
                    ))}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="landingRight">
        <div className="infoBox">
          {careers.map(
            (data) =>
              data._id.includes(info) && (
                <div className="rightData" key={data._id}>
                  <div className="pieChart">
                    <PieChart
                      animate
                      animationDuration={500}
                      totalValue={1}
                      reveal={100}
                      startAngle={-90}
                      data={[
                        {
                          title: "Replace",
                          value: data.Probability,
                          color: "#ffa31a",
                          label: data.Probability,
                        },
                        {
                          title: "Not replace",
                          value: 1 - data.Probability,
                          color: "",
                        },
                      ]}
                    />
                    <div>{data.Probability * 100}%</div>
                  </div>
                  <div className="smallInfo">
                    {Object.keys(data).map((info) => (
                      <div className={info}>
                        <span>{info}:</span>
                        {data[info]}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
