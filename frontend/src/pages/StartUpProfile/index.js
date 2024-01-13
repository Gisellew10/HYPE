import React, { useEffect, useState } from 'react';
import './StartupProfile.css';
import { useStartupProfileContext } from '../../contexts/startupProfileContext';
import { useSagas } from '../../sagas/sagaContext';
import SelectByWidth from '../../components/DisplayHelpers/SelectByWidth';
import { Button, TextField } from '@mui/material';
import Nav from "../../components/NavBar/Nav";
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAuthTokenContext } from "../../contexts/authTokenContext";
import { useHistory } from "react-router-dom";

function StartUpProfile () {

  const sagas = useSagas();
  const profile = useStartupProfileContext()

  const [editSection, setEditSection] = useState("none"); // values: none, description, mission, progress, contacts

  const [companyNameText, setCompanyNameText] = useState("");
  const [websiteText, setWebsiteText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [missionText, setMissionText] = useState("");
  const [progressText, setProgressText] = useState("");
  const [updatedContacts, setUpdatedContacts] = useState([]);
  const history = useHistory();
  const loggedIn = useAuthTokenContext();

	useEffect(() => {
		if (!loggedIn) {
        history.push("/"); //if not logged in go to home page
		}
	}, [loggedIn]);

  useEffect(() => {
    sagas.getStartupProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      setCompanyNameText(profile.companyName);
      setDescriptionText(profile.description);
      setWebsiteText(profile.website);
      setEmailText(profile.email);
      setMissionText(profile.mission);
      setProgressText(profile.progress);
      setUpdatedContacts(profile.contacts);
    }
  }, [profile]);

  // waits for profile to be loaded
	if (!profile) {
		return null;
	}

  // deconstructing profile object
	const {
		companyName = "",
    description = "",
    website = "",
		email = "",
    mission = "",
    progress = "",
		contacts = [],
	} = profile;

	async function editProfile() {
		  try{
        const res = await fetch('/startup/profile',{
          method: "PUT",
          headers:{
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authToken")
          },
          body: JSON.stringify({
            profile
          })
        })
			  const data = await res.json();
      }catch(error){
        console.log(error);
      }
		  sagas.getStartupProfile();
    }


  function startEditing(section) {

    setCompanyNameText(companyName);
    setWebsiteText(website);
    setEmailText(email);
    setDescriptionText(description);
    setMissionText(mission);
    setProgressText(progress);
    setUpdatedContacts(contacts);

    setEditSection(section);
  }

  function SaveChanges() {

    profile.companyName = companyNameText;
    profile.description = descriptionText;
    profile.website = websiteText;
    profile.email = emailText;
    profile.mission = missionText;
    profile.progress = progressText;
    profile.contacts = updatedContacts;

    editProfile();

    setCompanyNameText("");
    setDescriptionText("");
    setWebsiteText("");
    setEmailText("");
    setMissionText("");
    setProgressText("");
    setUpdatedContacts([]);

    setEditSection("none");
  }
  
  function renderCompanyName() {
		return (
			<p style={{margin: "0", padding: "0", textAlign: "center"}}>
        <b className="title">Company Name: </b>
        {editSection === "description" ?
          editField(companyNameText, setCompanyNameText) :
				  (companyName !== "" ? companyName : "No company name provided")
        }
			</p>
		);
	}

  function renderWebsite() {
		return (
			<p style={{margin: "0", padding: "0", textAlign: "center"}}>
        <b className="title">Website: </b>
        {editSection === "description" ?
          editField(websiteText, setWebsiteText) :
				  (website !== "" ? website : "No website provided")
        }
			</p>
		);
	}

	function renderEmail() {
		return (
			<p style={{margin: "0", padding: "0", textAlign: "center"}}>
				<b className="title">Email: </b>
        {editSection === "description" ?
          editField(emailText, setEmailText) :
          (email !== "" ? email : "No email provided")
        }
			</p>
		);
	}

  function renderDescription() {
    return <React.Fragment>
      <div style={{position: "relative"}}>
        <img src="/videos/startup_video_placeholder.png" alt="video" id="video"/>
      </div>
      <div style={{position: "relative", textAlign: "center"}}>
        <div style={{
              position: "absolute",
              right: "10%",
              width: "25%",
              aspectRatio: "2",
            }}>
          <img style={{
              width: "100%",
              bottom: "0px",
              right: "0px",
              aspectRatio: "1",
              position: "absolute",
            }}
            src="/images/startup_logo.png" alt="user"
            />
        </div>
        <div style={{ position: "relative", paddingTop: "12%" }}>
          {editSection === "description" ?
            editField(descriptionText, setDescriptionText) :
            <p style={{margin: "0", padding: "0", textAlign: "center"}}>{profile.description || "No description provided"}</p>
          }
          {renderCompanyName()}
          {renderWebsite()}
          {renderEmail()}
        </div>
      </div>
    </React.Fragment>;
  }
                
  function renderMission() {
		return <React.Fragment>
      <div style={{color: "#BFD0DA", fontSize: "25px"}}>Mission Statement</div>
      <p style={{margin: "0", padding: "0", textAlign: "center"}}>
        {editSection === "mission" ?
          editField(missionText, setMissionText) :
          (mission !== "" ? mission : "No mission provided")
        }
      </p>
		</React.Fragment>;
	}

  function addContact() {
    setUpdatedContacts([...updatedContacts, {r_name: "", email: "", position: "", department: ""}]);
  }

  function removeContact() {
    const newContacts = [...updatedContacts];
    newContacts.pop();
    setUpdatedContacts(newContacts);
  }

  function updateContact(index, field, value) {
    const newContacts = [...updatedContacts];
    newContacts[index][field] = value;
    setUpdatedContacts(newContacts);
  }

  function renderContacts() {
    if (editSection === "contacts") {
      return <React.Fragment>
          <div style={{color: "#BFD0DA", fontSize: "25px"}}>Contacts</div>
          {updatedContacts.map((contact, index) => (
            <div style={{display: "flex", flexDirection: "column"}} className="contactsText">
              <div style={{display: "flex", flexDirection: "row", paddingTop: "10px"}}>
                <p>Name: </p>{editField(contact.name, (value) => updateContact(index, "r_name", value))}
              </div>
              <div style={{display: "flex", flexDirection: "row"}}>
                <p>Email: </p>{editField(contact.email, (value) => updateContact(index, "email", value))}
              </div>
              <div style={{display: "flex", flexDirection: "row"}}>
                <p>Position: </p>{editField(contact.position, (value) => updateContact(index, "position", value))}
              </div>
              <div style={{display: "flex", flexDirection: "row"}}>
                <p>Department: </p>{editField(contact.department, (value) => updateContact(index, "department", value))}
              </div>
            </div>
          ))}
        </React.Fragment>
    }

		if (contacts.length === 0) {
			return <React.Fragment>
        <div style={{color: "#BFD0DA", fontSize: "25px"}}>Contacts</div>
				<div className="contactsText" style={{textAlign: "center", color: "#B3C4DE"}}>
					No contacts provided
				</div>
			</React.Fragment>;
		}

		return <React.Fragment>
        <div style={{color: "#BFD0DA", fontSize: "25px"}}>Contacts</div>
        {contacts.map((contact) => (
          <div className="contactsText" style={{paddingBottom: "10px"}}>
            <div>
              <p><b className='title'>{contact.r_name}</b></p>
              <p><b className='title'>Email: </b>{contact.email}</p>
              <p><b className='title'>Position: </b>{contact.position}</p>
              <p><b className='title'>Department: </b>{contact.department}</p>
            </div>
          </div>
        ))}
      </React.Fragment>;
	}

  function renderProgress() {
		return <React.Fragment>
      <div style={{color: "#BFD0DA", fontSize: "25px"}}>Our Progress</div>
        {editSection === "progress" ?
          editField(progressText, setProgressText) :
          <p style={{margin: "0", padding: "0", textAlign: "center"}}>{progress || "No progress provided"}</p>
        }
		</React.Fragment>;
	}

  function editField(text, updateText) {
    return<TextField 
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
        '& .MuiInput-underline:before': { borderBottomColor: "#BFD0DA" },
        '& .MuiInput-underline:after': { borderBottomColor: "#80C8F0" },
      }}
      variant='standard'
      small
      disabled={false}
      value={text}
      onChange={(e) => {
        updateText(e.target.value)
      }}
      />
  }

  function infoCard(children, section = "", showAddRemove = false, onAdd = () => {}, onRemove = () => {}) {
    return <div style={{
      backgroundColor: "#1B2028",
      borderRadius: "15px",
      width: "100%",
      height: "100%",
      flex: "1 300px",
      flexDirection: "column",
      minHeight: "30px",
    }}>
      <div style={{style: "flex", flexDirection: "row", width: "100%", flex: "1"}}>
        {children}
      </div>
      {editSection == section ?
        buttonRow("save", () => SaveChanges(), showAddRemove, onAdd, onRemove) :
        buttonRow("edit", () => startEditing(section), false, () => {}, () => {})
      }
    </div>
  }

  function padding(children, pixels = 20) {
    let paddingAmount = pixels.toString() + "px";

    return <div style={{
      padding: paddingAmount,
      width: "100%",
      height: "100%",
    }}>
      {children}
    </div>
  }

  function buttonRow(state, action,  showAddRemove = false, onAdd = () => {}, onRemove = () => {}) {
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

  function minWidth0 () {
    return <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", minWidth: "300px", flexWrap: "wrap" }}>
        {padding(infoCard(renderDescription(),"description"))}
        {padding(infoCard(renderMission(),"mission"))}
        {padding(infoCard(renderContacts(),"contacts", true, addContact, removeContact))}
        {padding(infoCard(renderProgress(),"progress"))}
      </div>
    </React.Fragment>
  }

  function minWidth600 () {
    return <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", minWidth: "600px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 300px" }}>
          {padding(infoCard(renderDescription(), "description"))}
        </div>
        <div style={{ flex: "1 300px" }}>
          <div style={{ width: "100%"}}>
            {padding(infoCard(renderMission(), "mission"))}
          </div>
          <div style={{ width: "100%"}}>
            {padding(infoCard(renderContacts(), "contacts", true, addContact, removeContact))}
          </div>
          <div style={{ width: "100%"}}>
            {padding(infoCard(renderProgress(), "progress"))}
          </div>
        </div>
      </div>
    </React.Fragment>
  }

  function minWidth900 () {
    return <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", minWidth: "900px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 300px" }}>
          {padding(infoCard(renderDescription(), "description"))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: "2 600px" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
            <div style={{ flex: "1 300px", height: "100%" }}>
              {padding(infoCard(renderMission(), "mission"))}
            </div>
            <div style={{ flex: "1 300px", height: "100%" }}>
              {padding(infoCard(renderContacts(), "contacts", true, addContact, removeContact))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
            {padding(infoCard(renderProgress(), "progress"))}
          </div>
        </div>
      </div>
    </React.Fragment>
  }

  return <React.Fragment>
      <Nav location="Startup Profile"/>
      <div style={{
                backgroundColor: "#080808",
                width: "100%",
                minWidth: "300px",
                minHeight: "100vh",
    }}>
      {SelectByWidth([{width: 0, function: minWidth0}, {width: 600, function: minWidth600}, {width: 900, function: minWidth900}])}
    </div>
  </React.Fragment>;
};

export default StartUpProfile;
