import React, { useState, useEffect } from "react";
import { useChatContext } from "../../contexts/chatContext";
import { useSagas } from "../../sagas/sagaContext";
import "./Chat.css"
import Nav from "../../components/NavBar/Nav";
import CreateGroupPopUp from "../../components/createGroupModal/CreateGroupPopUp";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Chat() {
	const sagas = useSagas();
	const chats = useChatContext();
	const history = useHistory();

	const [cindex, setIndex] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [createGroup, setCreateGroup] = useState(false);
	const [addMembers, setAddMembers] = useState(false);
	const [newMsg, setNewMsg] = useState("");
	const [openMessageIndex, setOpenMessageIndex] = useState(null);
	const [clickedMessageIndex, setClickedMessageIndex] = useState(null);
	const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
	const [search, setSearch] = useState("");

	const [icon, setIcon] = useState({});
  const [names, setNames] = useState();

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

	const handleClickOpen = (index) => {
		setClickedMessageIndex(index);
		setOpenMessageIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleDeleteMessage = async (chatId) => {
		await sagas.deleteMessage(chatId, clickedMessageIndex);

		setShowDeleteSuccess(true);
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		await delay(1000);
		history.go(0);
		await delay(1000);
		setShowDeleteSuccess(false);
	};

	useEffect(()=>{
		sagas.getStudentList((data) => {
			setNames(data.students.map((student)=>{
				return {
					name: student.name,
					id: student.userId
				}
			})) 
		}, (data) => {
			console.log(data)
		})
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([sagas.getChats(), sagas.getStudentProfile()]);
				setIsLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([
					sagas.getChats(),
					sagas.getStudentProfile(),
				]);
				setIsLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (isLoaded && chats) {
			const chatMembers = chats.map((chat) => chat.members);
			chatMembers.forEach((members) => members.forEach(fetchIcon));
		}
	}, [chats, isLoaded]); 

	if (!isLoaded || !chats) {
		return null;
	}

	const handleDelete = async (chatId) => {
		await sagas.deleteChat(chatId);
		await sagas.getChats();
	}

	const createGroupRefresh = async () => {
		await sagas.getChats();
		setCreateGroup(false)
	}

	const sendMessage = async (chatId, message) => {
		await sagas.updateChatMessageSaga(chatId, message);
		await sagas.getChats();
		setNewMsg("");
		const element = document.getElementById('messageWrap');
		element.scrollTop = element.scrollHeight;
	}

	const chatNames = chats.map(chat => chat.chatName);
	const chatMsgs = chats.map(chat => chat.messages);
	const chatMembers = chats.map(chat => chat.members);
	const chatIds = chats.map(chat => chat.chatId);
	
	const getName = (id) => {
		const student = names.find((student) => student.id === id);
		return student.name;
	};
	const filterStudents = chatNames.filter((studentName) => {
		const sName = studentName.toLowerCase();
		const query = search.toLowerCase();

		if (query.length === 1) {
			return sName.startsWith(query);
		}

		else if (query.length > 1) {
			const sName2 = sName.slice(0, query.length);
			return sName2 === query;
		}

		return false;
	});

	return (
		<>
			<Nav location='/chat'/>
			<div className="chatPage">
				<div className="side">
					<div className="sideFunction">
						<input type="text" id="search" name="searchC" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
						<img src="/images/add.png" width={35} height={35} onClick={() => setCreateGroup(true)} />
					</div>

					{setSearch.length > 0 && (
						<div className="searchResult">
							{chatNames.map((cname, index) => {
								return (
									<ul className="results">
										{filterStudents.map((sName) => {
											if (cname == sName) {
												return (
													<li className="resultItem" key={index} onClick={() => setIndex(index)}>{sName}</li>
												)
											}
										})}
									</ul>
								)
							})}
						</div>
					)}

					{chatNames.map((cname, index) => {
						if (chatMembers[index].length > 2) {
							return (
								<div id="chatList" key={index}>
									<img src="/images/groupIcon.png" id="chatIcon" />
									<p onClick={() => setIndex(index)}>{cname}</p>
									<button id="close" onClick={() => handleDelete(chats[index].chatId)}><strong>X</strong></button>
								</div>
							)
						}

						else {
							return (
								<div id="chatList" key={index}>
									<img src={icon[chatMembers[index][1]]} id="chatIcon" className="circleIcon"/>
									<p onClick={() => setIndex(index)}>
										{cname}
									</p>
									<button
										id="close"
										onClick={() =>
											handleDelete(chats[index].chatId)
										}
									>
										<strong>X</strong>
									</button>
								</div>
							);
						}
					})}
				</div>

				<div className="chatBody">
					<div className="chatHead">
						<p>{chatNames[cindex]}</p>
						<img src="/images/add.png" width={35} height={35} onClick={() => setAddMembers(true)} />
					</div>
					{showDeleteSuccess && (
						<div className="delete-success-message">Message deleted successfully</div>
					)}
					<div id="messageWrap">
						{chatMsgs.length !== 0 ? chatMsgs[cindex].map((msg, i) => {
							if (msg.userId === chatMembers[0][0]) {
								const isOpen = openMessageIndex === i;
								return (
									<li key={i} className="me">
										{/* <div className="memberName">
											{getName(msg.userId)}
										</div> */}
										<div className="msg">
											<p onClick={() => handleClickOpen(i)}>{msg.message}</p>
											{isOpen && (
												<div className="delete_message">
													<p onClick={() => handleDeleteMessage(chatIds[cindex])}>
														Delete
													</p>
												</div>
											)}
										</div>
										<p className="time">{new Date(msg.timeStamp).getHours()}:{new Date(msg.timeStamp).getMinutes()}</p>
									</li>
								)
							}
							else {
								const isOpen = openMessageIndex === i;
								return (
									<li key={i} className="others">
										<div className="memberName">
											{getName(msg.userId)}
										</div>
										<div className="msg">
											<p onClick={() => handleClickOpen(i)}>{msg.message}</p>
											{isOpen && (
												<div className="delete_message">
													<p onClick={() => handleDeleteMessage(chatIds[cindex])}>
														Delete
													</p>
												</div>
											)}
										</div>
										<p className="time">{new Date(msg.timeStamp).getHours()}:{new Date(msg.timeStamp).getMinutes()}</p>
									</li>
								)
							}
						}) : null
						}

					</div>
					<div className="sendMsg">
						<input type="text" id="newMsg" value={newMsg} onChange={(value) => setNewMsg(value.target.value)} />
						<button id="sendButton" onClick={() => sendMessage(chats[cindex].chatId, newMsg)}>Send</button>
					</div>
				</div>
			</div>
			{createGroup && <CreateGroupPopUp onDismiss={() => createGroupRefresh()} />}
			{addMembers && <CreateGroupPopUp chatId={chats[cindex].chatId} chatName={chatNames[cindex]} members={chats[cindex].members} onDismiss={() => setAddMembers(false)} />}
		</>
	)
}

export default Chat;