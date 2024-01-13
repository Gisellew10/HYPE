import React, { useEffect, useState } from "react";
import "./StudentProfile.css";
import {
	useStudentProfileContext,
	useStudentProfileContextUpdate,
} from "../../contexts/studentProfileContext";
import { useSagas } from "../../sagas/sagaContext";
import Nav from "../../components/NavBar/Nav";
import SelectByWidth from "../../components/DisplayHelpers/SelectByWidth";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";
import { useAuthTokenContext } from "../../contexts/authTokenContext";
import { useHistory } from "react-router-dom";

function StudentProfile() {
	const sagas = useSagas();
	const profile = useStudentProfileContext();
	//const updateStudentProfile = useStudentProfileContextUpdate();
	const [isOpen, setIsOpen] = useState(false);

	const [editSection, setEditSection] = useState("none"); // values: none, description, education, hobbies, projects

	const [nameText, setNameText] = useState("");
	const [descriptionText, setDescriptionText] = useState("");
	const [githubText, setGithubText] = useState("");
	const [linkedinText, setLinkedinText] = useState("");
	const [userIcon, setUserIcon] = useState("");
	const [file, setFile] = useState(null);

	const [updatedSkills, setUpdatedSkills] = useState([]);
	const [updatedEducation, setUpdatedEducation] = useState([]);
	const [updatedHobbies, setUpdatedHobbies] = useState([]);
	const [updatedProjects, setUpdatedProjects] = useState([]);
	const history = useHistory();
  	const loggedIn = useAuthTokenContext();

	useEffect(() => {
		if (!loggedIn) {
        history.push("/"); //if not logged in go to home page
		}
	}, [loggedIn]);

	useEffect(() => {
		sagas.getStudentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (profile) {
			setNameText(profile.name);
			setDescriptionText(profile.description);
			setGithubText(profile.github);
			setLinkedinText(profile.linkedin);
			setUpdatedSkills(profile.skills ? [...profile.skills] : []);
		}
	}, [profile]);

	useEffect(() => {
		async function fetchUserIcon() {
			try {
				if (profile && profile.userId) {
					const response = await axios.get(
						`http://localhost:4000/user/getIcon/${profile.userId}`,
						{
							headers: {
								authtoken: localStorage.getItem("authToken"),
							},
						}
					);
					setUserIcon(response.data.icon);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchUserIcon();
	}, [profile]);
  
	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
		setUserIcon(URL.createObjectURL(selectedFile));

		// Convert file to base64
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64String = reader.result;
			setFile(base64String);
		};
		reader.onerror = (error) => {
			console.log("Error occurred while reading the file:", error);
		};
		reader.readAsDataURL(selectedFile);
	};

	const uploadProfileIcon = async () => {
		try {
			const requestData = {
				userId: profile.userId,
				icon: file,
			};

			const response = await axios.put(
				`http://localhost:4000/user/updateIcon`,
				requestData,
				{
					headers: {
						"Content-Type": "application/json",
						authtoken: localStorage.getItem("authToken"),
					},
				}
			);

			const { success, icon } = response.data;

			if (success) {
				console.log("Profile icon uploaded successfully");
				setUserIcon(icon);
			} else {
				console.log("Unable to upload profile icon");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// waits for profile to be loaded
	if (!profile) {
		return null;
	}

	// deconstructing profile object
	const {
		name = "",
		description = "",
		skills = [],
		github = "",
		linkedin = "",
		education = [],
		hobbies = [],
		projects = [],
	} = profile;

	async function editProfile() {
		console.log(profile);

		try {
			const res = await fetch("http://localhost:4000/student/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authtoken: localStorage.getItem("authToken"),
				},
				body: JSON.stringify({
					profile,
				}),
			});
			console.log("success");
			console.log(res);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
		sagas.getStudentProfile();
	}

	function renderSkills() {
		const handleSkillsChange = (event) => {
			setUpdatedSkills(event.target.value.split(","));
		};

		return (
			<p style={{ margin: "0", padding: "0", textAlign: "center" }}>
				<b className="title">Skills: </b>
				{editSection === "description" ? (
					<input
						type="text"
						value={updatedSkills.join(",")}
						onChange={handleSkillsChange}
						style={{
							color: "#BFD0DA",
							backgroundColor: "transparent",
							border: "none",
							borderBottom: "1px solid #BFD0DA",
							outline: "none",
						}}
					/>
				) : (
					<span>
						{updatedSkills.length > 0
							? updatedSkills.join(", ")
							: "No skills provided"}
					</span>
				)}
			</p>
		);
	}

	function renderGithub() {
		return (
			<p style={{ margin: "0", padding: "0", textAlign: "center" }}>
				<b className="title">Github: </b>
				{editSection === "description"
					? editField(githubText, setGithubText)
					: github !== ""
					? github
					: "No github provided"}
			</p>
		);
	}

	function renderLinkedin() {
		return (
			<p style={{ margin: "0", padding: "0", textAlign: "center" }}>
				<b className="title">Linkedin: </b>
				{editSection === "description"
					? editField(linkedinText, setLinkedinText)
					: linkedin !== ""
					? linkedin
					: "No linkedin provided"}
			</p>
		);
	}

	function renderName() {
		return (
			<p style={{ margin: "0", padding: "0", textAlign: "center" }}>
				<b className="title">Name: </b>
				{editSection === "description"
					? editField(nameText, setNameText)
					: name !== ""
					? name
					: "No name provided"}
			</p>
		);
	}

	function renderDescriptionText() {
		return (
			<p style={{ margin: "0", padding: "0", textAlign: "center" }}>
				<b className="title">Description: </b>
				{editSection === "description"
					? editField(descriptionText, setDescriptionText)
					: description !== ""
					? description
					: "No description provided"}
			</p>
		);
	}

	function renderDescription() {
		return (
			<React.Fragment>
				<div style={{ position: "relative" }}>
					<img
						src="/videos/student_video_placeholder.png"
						alt="video"
						id="video"
					/>
				</div>
				<div style={{ position: "relative"}}>
					<div style={{
						position: "absolute",
						right: "10%",
						width: "25%",
						aspectRatio: "2",
					}}>
						<img
							style={{
								position: "absolute",
								width: "100%",
								bottom: "0px",
								right: "0px",
								aspectRatio: "1",
								borderRadius: "50%",
								objectFit: "cover",
							}}
							src={userIcon}
							alt="user"
						/>
					</div>
					{editSection === "description" ? (
						<React.Fragment>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								style={{ display: "none" }}
								id="upload-icon"
							/>
							<label htmlFor="upload-icon">
								<Button variant="outlined" component="span">
									Upload Icon
								</Button>
							</label>
						</React.Fragment>
					) : null}
					<div style={{ position: "relative", paddingTop: "12%" }}>
						{renderName()}
						{renderDescriptionText()}
						{renderGithub()}
						{renderLinkedin()}
						{renderSkills()}
					</div>
				</div>
			</React.Fragment>
		);
	}

	function addEducation() {
		setUpdatedEducation([
			...updatedEducation,
			{
				school: "",
				address: "",
				degree: "",
				startDate: "",
				endDate: "",
			},
		]);
	}

	function updateEducation(index, field, value) {
		let tempEducation = [...updatedEducation];
		tempEducation[index][field] = value;
		setUpdatedEducation(tempEducation);
	}

	function removeEducation() {
		let tempEducation = [...updatedEducation];
		tempEducation.pop();
		setUpdatedEducation(tempEducation);
	}

	function renderEducation() {
		if (editSection === "education") {
			return (
				<React.Fragment>
					<div style={{ color: "#BFD0DA", fontSize: "25px" }}>
						Education
					</div>
					{updatedEducation.map((educationItem, index) => (
						<div style={{display: "flex", flexDirection: "column"}}>
							<div style={{display: "flex", flexDirection: "row", paddingTop: "10px"}}>
								<>School: </> {editField(educationItem.school, (value) => updateEducation(index, "school", value))}
							</div>
							<div style={{display: "flex", flexDirection: "row"}}>
								<>Address: </> {editField(educationItem.address, (value) => updateEducation(index, "address", value))}
							</div>
							<div style={{display: "flex", flexDirection: "row"}}>
								<>Degree: </> {editField(educationItem.degree, (value) => updateEducation(index, "degree", value))}
							</div>
							<div style={{display: "flex", flexDirection: "row"}}>
								<>Start: </> {editField(educationItem.start, (value) => updateEducation(index, "start", value))}
							</div>
							<div style={{display: "flex", flexDirection: "row", paddingBottom: "10px"}}>
								<>End: </> {editField(educationItem.end, (value) => updateEducation(index, "end", value))}
							</div>
						</div>
					))}
				</React.Fragment>
			);
		}

		if (education.length === 0) {
			return (
				<React.Fragment>
					<div style={{ color: "#BFD0DA", fontSize: "25px" }}>
						Education
					</div>
					<div className="educationText">
						No education information provided
					</div>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div style={{ color: "#BFD0DA", fontSize: "25px" }}>
					Education
				</div>
				{education.map((educationItem, index) => (
					<div style={{display: "flex", flexDirection: "column"}}>
						<div style={{height: "10px"}}/>
						<div className="educationText" key={index}>
							<div>
								{educationItem.school}, {educationItem.address}
							</div>
							<div>{educationItem.degree}</div>
							<div>
								{educationItem.start} - {educationItem.end}
							</div>
						</div>
						<div style={{height: "10px"}}/>
					</div>
				))}
			</React.Fragment>
		);
	}

	function renderHobbies() {
		const handleHobbiesChange = (event) => {
			setUpdatedHobbies(event.target.value.split(","));
		};

		return (
			<React.Fragment>
				<div style={{ color: "#BFD0DA", fontSize: "25px" }}>
					Hobbies
				</div>
				{editSection === "hobbies" ? (
					<input
						type="text"
						value={updatedHobbies.join(",")}
						onChange={handleHobbiesChange}
						style={{
							color: "#BFD0DA",
							backgroundColor: "transparent",
							border: "none",
							borderBottom: "1px solid #BFD0DA",
							outline: "none",
						}}
					/>
				) : (
					<div>
						{hobbies.length > 0 ? (
							<ul style={{padding: "0"}}>
								{hobbies.map((hobby, index) => (
									<li key={index}>{hobby}</li>
								))}
							</ul>
						) : (
							<div>No hobbies provided</div>
						)}
					</div>
				)}
			</React.Fragment>
		);
	}

	function addProject() {
		setUpdatedProjects([
			...updatedProjects,
			{
				p_name: "",
				summary: "",
			},
		]);
	}

	function updateProject(index, field, value) {
		let tempProjects = [...updatedProjects];
		tempProjects[index][field] = value;
		setUpdatedProjects(tempProjects);
	}

	function removeProject() {
		let tempProjects = [...updatedProjects];
		tempProjects.pop();
		setUpdatedProjects(tempProjects);
	}

	function renderProjects() {
		if (editSection === "projects") {
			return (
				<React.Fragment>
					<div style={{ color: "#BFD0DA", fontSize: "25px" }}>
						Projects
					</div>
					{updatedProjects.map((projectItem, index) => (
						<div style={{display: "flex", flexDirection: "column"}}>
							<div style={{display: "flex", flexDirection: "row", paddingTop: "10px"}}>
								<>Project Name: </> {editField(projectItem.p_name, (value) => updateProject(index, "p_name", value))}
							</div>
							<div style={{display: "flex", flexDirection: "row", paddingBottom: "10px"}}>
								<>Summary: </> {editField(projectItem.summary, (value) => updateProject(index, "summary", value))}
							</div>
						</div>
					))}
				</React.Fragment>
			);
		}

		if (projects.length === 0) {
			return (
				<React.Fragment>
					<div style={{ color: "#BFD0DA", fontSize: "25px" }}>
						Projects
					</div>
					<div>No projects provided</div>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div style={{ color: "#BFD0DA", fontSize: "25px" }} s>
					Projects
				</div>
				<div>
					{projects.map((project, index) => (
						<div style={{display: "flex", flexDirection: "column"}}>
							<div style={{height: "10px"}}/>
							<div key={index} style={{display: "flex", flexDirection: "column"}}>
								<b className="title">{project.p_name}</b>
								<div>{project.summary}</div>
							</div>
							<div style={{height: "10px"}}/>
						</div>
					))}
				</div>
			</React.Fragment>
		);
	}

	function startEditing(section) {
		setNameText(name);
		setDescriptionText(description);
		setGithubText(github);
		setLinkedinText(linkedin);
		setUpdatedSkills(skills);
		setUpdatedEducation(education);
		setUpdatedProjects(projects);

		setUpdatedHobbies(hobbies);

		setEditSection(section);
	}

	function SaveChanges() {
		profile.name = nameText;
		profile.description = descriptionText;
		profile.github = githubText;
		profile.linkedin = linkedinText;
		profile.skills = updatedSkills;
		profile.hobbies = updatedHobbies;
		profile.education = updatedEducation;
		profile.projects = updatedProjects;

		editProfile();

		setNameText(name);
		setDescriptionText(description);
		setGithubText(github);
		setLinkedinText(linkedin);
		uploadProfileIcon();
		setUpdatedHobbies(hobbies);
		setUpdatedEducation(education);
		setUpdatedProjects(projects);


		setEditSection("none");
	}

	function editField(text, updateText) {
		return (
			<TextField
				inputProps={{
					style: {
						padding: 0,
						// fontWeight: "bold",
					},
				}}
				style={{
					width: "200px",
				}}
				sx={{
					// "& fieldset": { border: 'none' },
					input: {
						// color: "#80C8F0",
						color: "#BFD0DA",
					},
					"& .MuiInput-underline:before": {
						borderBottomColor: "#BFD0DA",
					},
					"& .MuiInput-underline:after": {
						borderBottomColor: "#80C8F0",
					},
				}}
				variant="standard"
				small
				disabled={false}
				value={text}
				onChange={(e) => {
					updateText(e.target.value);
				}}
			/>
		);
	}

	function infoCard(children, section = "", showAddRemove = false, onAdd = () => {}, onRemove = () => {}) {
		return (
			<div
				style={{
					backgroundColor: "#1B2028",
					borderRadius: "15px",
					width: "100%",
					height: "100%",
					flex: "1 300px",
					flexDirection: "column",
					minHeight: "30px",
				}}
			>
				<div
					style={{
						style: "flex",
						flexDirection: "row",
						width: "100%",
						flex: "1",
					}}
				>
					{children}
				</div>
				{editSection == section
					? buttonRow("save", () => SaveChanges(), showAddRemove, onAdd, onRemove)
					: buttonRow("edit", () => startEditing(section), false, () => {}, () => {})}
			</div>
		);
	}

	function padding(children, pixels = 20) {
		let paddingAmount = pixels.toString() + "px";

		return (
			<div
				style={{
					padding: paddingAmount,
					width: "100%",
					height: "100%",
				}}
			>
				{children}
			</div>
		);
	}

	function buttonRow(state, action, showAddRemove = false, onAdd = () => {}, onRemove = () => {}) {
		// state should be either "edit" or "save"
		// action should be the function to call when the button is clicked

		let buttonIcon = null;
		if (state == "edit") {
			buttonIcon = <EditIcon style={{ width: "100%", height: "100%" }} />;
		} else if (state == "save") {
			buttonIcon = (
				<SaveAsIcon style={{ width: "100%", height: "100%" }} />
			);
		}

		return (
			<div
				style={{
					width: "100%",
					height: "50px",
					flex: "0",
					float: "bottom",
				}}
			>
				<div
					style={{
						width: "30px",
						height: "30px",
						margin: "10px",
						float: "right",
						borderRadius: "15px",
					}}
				>
					<Button
						style={{
							maxWidth: "30px",
							maxHeight: "30px",
							minWidth: "30px",
							minHeight: "30px",
							padding: "0 0 0 0",
						}}
						disableRipple
						onClick={action}
					>
						{buttonIcon}
					</Button>
				</div>
				{showAddRemove == false ? null : (
					<React.Fragment>
						<div
							style={{
								width: "30px",
								height: "30px",
								margin: "10px",
								float: "right",
								borderRadius: "15px",
							}}
						>
							<Button
								style={{
									maxWidth: "30px",
									maxHeight: "30px",
									minWidth: "30px",
									minHeight: "30px",
									padding: "0 0 0 0",
								}}
								disableRipple
								onClick={onAdd}
							>
								<AddIcon style={{ width: "100%", height: "100%" }} />
							</Button>
						</div>
						<div
							style={{
								width: "30px",
								height: "30px",
								margin: "10px",
								float: "right",
								borderRadius: "15px",
							}}
						>
							<Button
								style={{
									maxWidth: "30px",
									maxHeight: "30px",
									minWidth: "30px",
									minHeight: "30px",
									padding: "0 0 0 0",
								}}
								disableRipple
								onClick={onRemove}
							>
								<RemoveIcon style={{ width: "100%", height: "100%" }} />
							</Button>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}

	function minWidth0() {
		return (
			<React.Fragment>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						minWidth: "300px",
						flexWrap: "wrap",
					}}
				>
					{padding(infoCard(renderDescription(), "description"))}
					{padding(infoCard(renderEducation(), "education", editSection == "education", addEducation, removeEducation))}
					{padding(infoCard(renderHobbies(), "hobbies"))}
					{padding(infoCard(renderProjects(), "projects", editSection == "projects", addProject, removeProject))}
				</div>
			</React.Fragment>
		);
	}

	function minWidth600() {
		return (
			<React.Fragment>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						minWidth: "600px",
						flexWrap: "wrap",
					}}
				>
					<div style={{ flex: "1 300px" }}>
						{padding(infoCard(renderDescription(), "description"))}
					</div>
					<div style={{ flex: "1 300px" }}>
						<div style={{ width: "100%" }}>
							{padding(infoCard(renderEducation(), "education", editSection == "education", addEducation, removeEducation))}
						</div>
						<div style={{ width: "100%" }}>
							{padding(infoCard(renderHobbies(), "hobbies"))}
						</div>
						<div style={{ width: "100%" }}>
							{padding(infoCard(renderProjects(), "projects", editSection == "projects", addProject, removeProject))}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	function minWidth900() {
		return (
			<React.Fragment>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						minWidth: "900px",
						flexWrap: "wrap",
					}}
				>
					<div style={{ flex: "1 300px" }}>
						{padding(infoCard(renderDescription(), "description"))}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							flex: "2 600px",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								width: "100%",
								flexWrap: "wrap",
							}}
						>
							<div style={{ flex: "2 300px", height: "100%" }}>
								{padding(
									infoCard(renderEducation(), "education", editSection == "education", addEducation, removeEducation)
								)}
							</div>
							<div style={{ flex: "1 300px", height: "100%" }}>
								{padding(infoCard(renderHobbies(), "hobbies"))}
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								width: "100%",
								flexWrap: "wrap",
							}}
						>
							{padding(infoCard(renderProjects(), "projects", editSection == "projects", addProject, removeProject))}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<Nav location="Student Profile"/>
			<div
				style={{
					backgroundColor: "#080808",
					width: "100%",
					minWidth: "300px",
					minHeight: "100vh",
					color: "#BFD0DA",
				}}
			>
				{SelectByWidth([
					{ width: 0, function: minWidth0 },
					{ width: 600, function: minWidth600 },
					{ width: 900, function: minWidth900 },
				])}
			</div>
		</React.Fragment>
	);
}

export default StudentProfile;
