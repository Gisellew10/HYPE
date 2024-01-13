import React, { useEffect, useState } from "react";
import { useStudentListContext } from "../../contexts/studentListContext";
import { useSagas } from "../../sagas/sagaContext";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentListPage.css";
import MessagePopup from "../../components/Message-Popup/MessagePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/NavBar/Nav";
import axios from "axios";

function StudentListPage() {
	const sagas = useSagas();
	const studentList = useStudentListContext();

	const [search, setSearch] = useState("");
	const [experienceFilter, setExperienceFilter] = useState("All");
	const [commitmentFilter, setCommitmentFilter] = useState("All");

	const [popup, setPopup] = useState(false);
	const [name, setName] = useState(false);
	const [userId, setUserId] = useState([]);
	const [icon, setIcon] = useState({});

	const handleClickOpen = (sname, suserid) => {
		const tmp = [];
		tmp[0] = suserid;
		setName(sname);
		setUserId(tmp);
		if (popup === false) {
			setPopup(!popup);
		}
	};
	const handleClickClose = () => {
		setPopup(false);
	};

	const fetchStudents = async () => {
		await sagas.getStudentList();
	};

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

	useEffect(() => {
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

	if (!studentList || studentList.length === 0) {
		return <div>Loading...</div>;
	}

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const handleExperienceFilterChange = (e) => {
		setExperienceFilter(e.target.value);
	};

	const handleCommitmentFilterChange = (e) => {
		setCommitmentFilter(e.target.value);
	};

	const filteredStudents = studentList
		.filter((student) => {
			const nameMatch = student.name
				.toLowerCase()
				.includes(search.toLowerCase());
			const experienceMatch =
				experienceFilter === "All" ||
				student.experience === experienceFilter;
			const commitmentMatch =
				commitmentFilter === "All" ||
				student.commitment === commitmentFilter;

			return nameMatch && experienceMatch && commitmentMatch;
		})
		.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div className="studentListPage">
			<Nav location="All Students"/>
			<Container>
				<Form>
					<div className="formContainer">
						<InputGroup className="searchInput">
							<Form.Control className="box-style"
								onChange={handleSearchChange}
								placeholder="Search by Name"
							/>
						</InputGroup>
						<Form.Group className="filterSearch">
							<Form.Select className="box-style"
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
							<Form.Select className="box-style"
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
					{filteredStudents.map((student) => (
						<div className="cueCard">
							<div className="topContainer">
								<img
									src={
										icon[student.userId] ||
										"images/student_user.png"
									}
									alt="studentPic"
									id="studentPic"
									className="circleIcon"
								/>
								<div className="name" id="sname">
									{student.name}
								</div>
							</div>

							<div className="middleContainer">
								<div>
									<b className="title">Institution: </b>
									{student.education.length > 0 ? student.education[0].school : "No school found"}
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
										<img
											src="/images/github.png"
											alt="github"
											id="github"
										/>
									</a>
								)}
								{student.linkedin !==
									"No linkedin provided" && (
									<a
										href={normalizeLink(student.linkedin)}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/linkedIn.png"
											alt="linkedIn"
											id="linkedIn"
										/>
									</a>
								)}
								<a
									onClick={() =>
										handleClickOpen(
											student.name,
											student.userId
										)
									}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="/images/message.png"
										alt="message"
										id="message"
									/>
								</a>
							</div>
							<div>
								{popup ? (
									<div>
										<div className="popup">
											<FontAwesomeIcon
												onClick={handleClickClose}
												icon={faXmark}
												size="xl"
												style={{ color: "#5e5bff" }}
												id="icon"
											/>
											<img
												src={icon[userId] || "/images/user1.svg"}
												alt=""
												id="picture"
												className="circleIcon"
											></img>
											<div className="username">
												<p style={{ color: "white" }}>
													{name}
												</p>
											</div>
											<div className="frame">
												<MessagePopup
													chatname={name}
													othersUserId={userId}
												/>
											</div>
										</div>
									</div>
								) : (
									""
								)}
							</div>
						</div>
					))}
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
