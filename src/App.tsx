import { useState, useEffect } from "react";
import { Users, Shuffle, Target, Shield, Sword, Crown } from "lucide-react";
import "./App.css";

interface Team {
  backline: string;
  support: string;
  slayers: string[];
}

interface TeamCardProps {
  team: Team;
  teamName: string;
  isAlpha: boolean;
}

function TeamCard(props: TeamCardProps) {
  return (
    <div className={`team-container ${props.isAlpha ? "alpha" : "bravo"}`}>
      <h2 className="team-title">
        <Crown className="team-icon" />
        {props.teamName}
      </h2>
      <div className="team-content">
        <div className="team-role">
          <Target className="inline-icon" />
          <strong>Backline:</strong> {props.team.backline || "Not set"}
        </div>
        <div className="team-role">
          <Shield className="inline-icon" />
          <strong>Support:</strong> {props.team.support || "Not set"}
        </div>
        <div className="team-role">
          <Sword className="inline-icon" />
          <strong>Slayers:</strong>{" "}
          {props.team.slayers.length > 0
            ? props.team.slayers.join(", ")
            : "Not set"}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [players, setPlayers] = useState({
    backline1: "",
    backline2: "",
    support1: "",
    support2: "",
    slayer1: "",
    slayer2: "",
    slayer3: "",
    slayer4: "",
  });

  const [alphaTeam, setAlphaTeam] = useState<Team>({
    backline: "",
    support: "",
    slayers: [],
  });
  const [bravoTeam, setBravoTeam] = useState<Team>({
    backline: "",
    support: "",
    slayers: [],
  });
  const [prevSlayers, setPrevSlayers] = useState({
    alpha: [] as string[],
    bravo: [] as string[],
  });

  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const areSlayersEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return set1.size === set2.size && [...set1].every((x) => set2.has(x));
  };

  const updatePlayer = (field: string, value: string) => {
    setPlayers((prev) => ({ ...prev, [field]: value }));
  };

  const generateTeams = () => {
    const slayers = [
      players.slayer1,
      players.slayer2,
      players.slayer3,
      players.slayer4,
    ].filter((s) => s.trim() !== "");

    if (slayers.length === 4) {
      const shuffledSlayers = shuffleArray(slayers);

      const newAlpha = {
        backline: players.backline1,
        support: players.support1,
        slayers: shuffledSlayers.slice(0, 2),
      };

      const newBravo = {
        backline: players.backline2,
        support: players.support2,
        slayers: shuffledSlayers.slice(2),
      };

      setAlphaTeam(newAlpha);
      setBravoTeam(newBravo);
      setPrevSlayers({
        alpha: [...newAlpha.slayers],
        bravo: [...newBravo.slayers],
      });
    } else {
      setAlphaTeam((prev) => ({
        ...prev,
        backline: players.backline1,
        support: players.support1,
      }));
      setBravoTeam((prev) => ({
        ...prev,
        backline: players.backline2,
        support: players.support2,
      }));
    }
  };

  useEffect(generateTeams, [players]);

  const shuffleTeams = () => {
    if (
      !alphaTeam.backline ||
      !alphaTeam.support ||
      alphaTeam.slayers.length === 0
    ) {
      alert("Please fill in all player names before shuffling!");
      return;
    }

    const newAlpha = { ...alphaTeam, support: bravoTeam.support };
    const newBravo = { ...bravoTeam, support: alphaTeam.support };

    const allSlayers = [...alphaTeam.slayers, ...bravoTeam.slayers];
    let newAlphaSlayers: string[];
    let newBravoSlayers: string[];
    let attempts: number = 0;

    do {
      const shuffled: string[] = shuffleArray(allSlayers);
      newAlphaSlayers = shuffled.slice(0, 2);
      newBravoSlayers = shuffled.slice(2);
      attempts++;
    } while (
      (areSlayersEqual(newAlphaSlayers, prevSlayers.alpha) ||
        areSlayersEqual(newBravoSlayers, prevSlayers.bravo)) &&
      attempts < 100
    );

    newAlpha.slayers = newAlphaSlayers;
    newBravo.slayers = newBravoSlayers;

    setAlphaTeam(newAlpha);
    setBravoTeam(newBravo);
    setPrevSlayers({
      alpha: [...newAlphaSlayers],
      bravo: [...newBravoSlayers],
    });
  };

  const inputGroups = [
    {
      legend: "Backlines",
      icon: Target,
      fields: ["backline1", "backline2"],
      placeholders: ["Backline 1", "Backline 2"],
    },
    {
      legend: "Supports",
      icon: Shield,
      fields: ["support1", "support2"],
      placeholders: ["Support 1", "Support 2"],
    },
    {
      legend: "Slayers",
      icon: Sword,
      fields: ["slayer1", "slayer2", "slayer3", "slayer4"],
      placeholders: ["Slayer 1", "Slayer 2", "Slayer 3", "Slayer 4"],
    },
  ];

  return (
    <div className="app">
      <h1 className="title">
        <Crown className="title-icon" />
        8's Creator
        <Crown className="title-icon" />
      </h1>
      <h3 className="sub-title">
        Created By Typos (typos. on discord)
      </h3>

      <div className="input-container">
        <h3>
          <Users className="section-icon" />
          Enter Players:
        </h3>

        {inputGroups.map(({ legend, icon: Icon, fields, placeholders }) => (
          <fieldset key={legend} className="role-group">
            <legend>
              <Icon className="role-icon" />
              {legend}
            </legend>
            <div className="role-inputs">
              {fields.map((field, index) => (
                <input
                  key={field}
                  type="text"
                  value={players[field as keyof typeof players]}
                  onChange={(e) => updatePlayer(field, e.target.value)}
                  placeholder={placeholders[index]}
                  className="player-input"
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="teams-section">
        <TeamCard team={alphaTeam} teamName="Team Alpha" isAlpha={true} />
        <TeamCard team={bravoTeam} teamName="Team Bravo" isAlpha={false} />
      </div>

      <button className="shuffle-button" onClick={shuffleTeams}>
        <Shuffle className="button-icon" />
        Shuffle Teams
      </button>
    </div>
  );
}

export default App;
