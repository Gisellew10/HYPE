import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Wrapper,
	FlexColumn,
	FlexRow,
	InputLabel,
	Input,
	MainButton,
	Box,
	PageWrapper,
	MainHeader,
	PageBg
} from "./style";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSagas } from "../../sagas/sagaContext";

 

function CreateGroupPopUp({chatId, chatName, members, onDismiss}) {
	const [name, setName] = useState("");
	const [options, setOptions] = useState();
	const [selected, setSelected] = useState();

	const animatedComponents = makeAnimated();
	const sagas = useSagas();

	
	const updateMembersChat = (chatId, othersUserId) => {

		if (othersUserId.length === 0) {
			return;
		}
		
		sagas.updateMembersChatSaga(chatId, othersUserId, (data) => {
			// console.log(data);
			onDismiss()
		}, (data) => {
			console.log(data)
		})
	}

	const createGroup = (chatname, othersUserId) => {

		if (othersUserId.length === 0) {
			return;
		}
		sagas.createChat(chatname, othersUserId, (data) => {
			// console.log(data);
			onDismiss()
		}, (data) => {
			console.log(data)
		})
	}
	const handleChange = (selectedOption) => {
		setSelected(selectedOption);
	};

	useEffect(()=>{
		sagas.getStudentList((data) => {
			setOptions(data.students.map((student)=>{
				return {
					value: student.name,
					label: student.name,
					userId: student.userId,
					image: '/images/user.png',
					color: 'red',
					disabled: members ? members.includes(student.userId) : false
				}
			})) 
		}, (data) => {
			console.log(data)
		})
	}, [])

	return (
    <>
      <PageBg
        onClick={() => {
          onDismiss();
        }}
      />
      <Wrapper>
        <FlexColumn>
          <MainHeader>{chatId ? "Update Chat" : "Create Chat"}</MainHeader>
          <InputLabel>Chat Name:</InputLabel>
          <Input
            type="text"
            placeholder={"Enter the group name"}
            value={chatId ? chatName : name}
            onChange={(value) => setName(value.target.value)}
            disabled={chatId}
          />
          <InputLabel>Add Member(s):</InputLabel>
          <div style={{ width: "100%", textAlign: "left" }}>
            <Select
              isMulti
              name="students"
              closeMenuOnSelect={false}
              options={options}
              components={animatedComponents}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              isOptionDisabled={(option) => option.disabled}
              formatOptionLabel={(student) => (
                <FlexRow justifyContent="flex-start">
                  <Box>
                    <img src={student.image} />
                  </Box>
                  <div>{student.label}</div>
                </FlexRow>
              )}
            />
          </div>
          <MainButton
            onClick={() => {
              chatId
                ? updateMembersChat(
                    chatId,
                    selected.map((student) => student.userId)
                  )
                : createGroup(
                    name,
                    selected ? selected.map((student) => student.userId) : []
                  );
            }}
          >
            {chatId ? "Update Chat" : "Create Chat"}
          </MainButton>
        </FlexColumn>
      </Wrapper>
    </>
  );
}

export default CreateGroupPopUp;
