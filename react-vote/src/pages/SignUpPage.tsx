import styled from 'styled-components';
import InputBox from '../components/InputBox';
import { Dropdown } from '../components/Dropdown';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../queries/useSignupMutation';

function SignUpPage() {
	const teamLists = ['Azito', 'BeatBuddy', 'Petplate', 'Couplelog', 'TIG'];
	const partLists = ['FRONT', 'BACK'];

	const { join, isPending } = useSignupMutation();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [team, setTeam] = useState('');
	const [role, setRole] = useState('');
	const [part, setPart] = useState('');

	const isFormValid = () => {
		return (
			name !== '' &&
			username !== '' &&
			password !== '' &&
			confirmPassword !== '' &&
			password === confirmPassword &&
			email !== '' &&
			team !== '' &&
			part !== ''
		);
	};

	const handleSignup = async () => {
		const data = { name, username, password, email, team, role, part };
		console.log(data);
		join(data); // mutate 함수 실행 -> 서버 상태 변경
	};

	return (
		<SignUpContainer>
			<Title>Sign Up</Title>
			<SignUpInfoWrapper>
				<InputBoxWrapper>
					<InputBox
						placeholder='이름'
						value={name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setName(e.target.value)
						}
					/>
					<InputBox
						placeholder='아이디'
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
					/>
					<InputBox
						placeholder='비밀번호'
						type='password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
					/>
					<InputBox
						placeholder='비밀번호 확인'
						type='password'
						value={confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setConfirmPassword(e.target.value)
						}
					/>
					{password !== '' && confirmPassword !== '' && (
						<PasswordMatchMessage isValid={password === confirmPassword}>
							{password === confirmPassword
								? '비밀번호가 일치합니다.'
								: '비밀번호가 일치하지 않습니다.'}
						</PasswordMatchMessage>
					)}
					<InputBox
						placeholder='이메일 주소'
						type='email'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>
				</InputBoxWrapper>

				<DropdownWrapper>
					<Dropdown
						listsName='team'
						lists={teamLists}
						onChange={(selectedTeam: string) => setTeam(selectedTeam)}
					/>
					<Dropdown
						listsName='part'
						lists={partLists}
						onChange={(selectedPart: string) => setPart(selectedPart)}
					/>
				</DropdownWrapper>
				<EnrollBtn onClick={handleSignup} disabled={!isFormValid()}>
					{isPending ? 'wait plz..' : '회원가입'}
				</EnrollBtn>
			</SignUpInfoWrapper>
		</SignUpContainer>
	);
}

export default SignUpPage;

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const Title = styled.h2`
	margin-bottom: 1.5rem;
`;

const SignUpInfoWrapper = styled.div`
	width: 40vw;
	height: 70vh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	//뒤에 불투명 배경 요소
	background-color: transparent;
	border: 0.1rem solid rgba(255, 255, 255, 0.3);
	border-radius: 20px;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.05),
			rgba(255, 255, 255, 0.2)
		),
		linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
	background-origin: border-box;
	background-clip: border-box, content-box;
	backdrop-filter: blur(30px);
`;
const InputBoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
`;

const DropdownWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
	width: 80%;
`;
const EnrollBtn = styled.button`
	border: none;
	border-radius: 10px;
	width: 50%;
	height: 3.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;

	background-color: ${({ disabled, theme }) =>
		disabled ? 'white' : theme.colors.green};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	color: ${({ disabled }) => (disabled ? 'grey' : 'white')};

	font-size: 1.2rem;
	font-weight: 520;
`;

const PasswordMatchMessage = styled.div<{ isValid: boolean }>`
	color: ${({ isValid, theme }) => (isValid ? theme.colors.green : 'red')};
	font-size: 0.9rem;
	margin-bottom: 1rem;
`;
