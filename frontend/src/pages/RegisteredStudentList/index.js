import React, { useEffect, useState } from "react";
import { useRegisteredTeamsContext } from "../../contexts/registeredTeamsContext";
import { useRegisteredStudentListContext } from "../../contexts/registeredStudentListContext";
import { useSagas } from "../../sagas/sagaContext";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisteredStudentList.css";
import axios from "axios";
import { useAuthTokenContext } from "../../contexts/authTokenContext";
import { useHistory,useLocation } from "react-router-dom";
import Nav from "../../components/NavBar/Nav";

function StudentListPage() {
    const sagas = useSagas();
    const studentList = useRegisteredStudentListContext();
    const registeredTeams = useRegisteredTeamsContext();
    const location = useLocation();
    const competitionId = location.state?.competitionId;

    const [search, setSearch] = useState("");
    const [experienceFilter, setExperienceFilter] = useState("All");
    const [commitmentFilter, setCommitmentFilter] = useState("All");

    const [icon, setIcon] = useState({});

    const loggedIn = useAuthTokenContext();
    const history = useHistory();

    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        if (!loggedIn) {
            history.push("/startup-login");
        }
    }, [loggedIn]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                await sagas.getRegisteredTeams(competitionId);
            } catch (error) {
                console.log("Error fetching teams:", error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchIcons = async () => {
            if (studentList && studentList.length > 0) {
                for (const student of studentList) {
                    await fetchIcon(student.userId);
                }
            }
        };

        fetchIcons();
    }, [studentList]);

    const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const handleExperienceFilterChange = (e) => {
		setExperienceFilter(e.target.value);
	};

	const handleCommitmentFilterChange = (e) => {
		setCommitmentFilter(e.target.value);
	};

    useEffect(() => {
        if (registeredTeams.registeredTeams) {
            const allUserIds = registeredTeams.registeredTeams.flatMap(team => team.userId);
    
            (async () => {
                try {
                    await sagas.getRegisteredStudentList(allUserIds);
                    setLoading(false);
                } catch (error) {
                    console.log("Error fetching student list:", error);
                }
            })();
        }
    }, [registeredTeams.registeredTeams]);
    

    const fetchIcon = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/user/getIcon/${userId}`,
                {
                    headers: {
                        authtoken: localStorage.getItem("authToken"),
                    },
                }
            );
            const { success, icon } = response.data;

            if (success) {
                setIcon((prevIcons) => ({
                    ...prevIcons,
                    [userId]: icon,
                }));
            } else {
                setIcon((prevIcons) => ({
                    ...prevIcons,
                    [userId]: null,
                }));
            }
        } catch (error) {
            console.log("Error fetching icon:", error);
            setIcon((prevIcons) => ({
                ...prevIcons,
                [userId]: null,
            }));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const allUserIds = registeredTeams.registeredTeams.flatMap(team => team.userId);

    // Filter students based on search, experience, and commitment
    const filteredStudents = studentList.filter((student) => {
        const nameMatch = student.name.toLowerCase().includes(search.toLowerCase());
        const experienceMatch = experienceFilter === "All" || student.experience === experienceFilter;
        const commitmentMatch = commitmentFilter === "All" || student.commitment === commitmentFilter;
        const userIdMatch = allUserIds.includes(student.userId);

        return nameMatch && experienceMatch && commitmentMatch && userIdMatch;
    }).sort((a, b) => a.name.localeCompare(b.name));
    return (
        <div className="studentListPage">
            <Nav location = "Competitions"/>
            <Container>
                <Form>
                    <div className="formContainer">
                        <InputGroup className="searchInput">
                            <Form.Control
                                onChange={handleSearchChange}
                                placeholder="Search by Name"
                            />
                        </InputGroup>
                        <Form.Group className="filterSearch">
                            <Form.Select
                                value={experienceFilter}
                                onChange={handleExperienceFilterChange}
                            >
                                <option value="All">Experience</option>
                                <option value="None">None</option>
                                <option value="1 year">1 year</option>
                                <option value="2 years">2 years</option>
                                <option value="3 years">3 years</option>
                                <option value="4 years">4 years</option>
                                <option value="5+ years">5+ years</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="filterSearch">
                            <Form.Select
                                value={commitmentFilter}
                                onChange={handleCommitmentFilterChange}
                            >
                                <option value="All">Commitment</option>
                                <option value="0-3 hours">0-3 hours</option>
                                <option value="4-7 hours">4-7 hours</option>
                                <option value="8-10 hours">8-10 hours</option>
                                <option value="10+ hours">10+ hours</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </Form>

                <div className="cueCardContainer">
                    {filteredStudents.map((student) => {
                        const studentTeam = registeredTeams.registeredTeams.find((team) =>
                            team.userId.includes(student.userId)
                        );

                        return (
                            <div className="cueCard" key={student.userId}>
                                <div className="topContainer">
                                    <img
                                        src={
                                            icon[student.userId] || "images/student_user.png"
                                        }
                                        alt="studentPic"
                                        id="studentPic"
                                        className="circleIcon"
                                    />
                                    <div className="name" id="sname">
                                        <div className="studentName">{student.name}</div>
                                        <div className="teamName">
                                            {studentTeam.teamName}
                                        </div>
                                    </div>
                                </div>
                                <div className="middleContainer">
                                    <div>
                                        <b className="title">Institution: </b>
                                        {student.school}
                                    </div>
                                    <div>
                                        <b className="title">Age: </b>
                                        {student.age}
                                    </div>
                                    <div>
                                        <b className="title">Experience: </b>
                                        {student.experience}
                                    </div>
                                    <div>
                                        <b className="title">Commitment: </b>
                                        {student.commitment}
                                    </div>
                                </div>
                                <div className="bottomContainer">
                                    {student.github !== "No github provided" && (
                                        <a
                                            href={normalizeLink(student.github)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src="/images/github.png" alt="github" id="github" />
                                        </a>
                                    )}
                                    {student.linkedin !== "No linkedin provided" && (
                                        <a
                                            href={normalizeLink(student.linkedin)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src="/images/linkedIn.png" alt="linkedIn" id="linkedIn" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

function normalizeLink(link) {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "https://" + link;
    }
    return link;
}

export default StudentListPage;
