import styled from "styled-components";

export const FormWrapper = styled.main`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ContactForm = styled.form`
	border-radius: 10px;
	box-shadow: 0 0 10px black;
	display: flex;
	flex-direction: column;
	padding: 4px 4px 4px 4px;
	background: white;
	height: 70vh;
	width: 70vw;
	align-items: center;
	justify-content: center;
	position: relative;
`;

export const MessagePrompt = styled.h1`
	font-size: 2em;
	font-weight: bold;
`;

export const Label = styled.label`
	color: grey;
	font-weight: light;
	margin-top: 10px;
`;

export const Separator = styled.span`
	color: red;
`;

export const Input = styled.input`
	border: none;
	/* border-radius: 10px; */
	background: transparent;
	border-bottom: solid 1px;
	padding: 1px -4px 1px 0;
	font-weight: light;
	color: grey;
	font-size: 1em;
	margin-top: 10px;

	:focus {
		outline: none;
		outline-color: green;
		border-radius: 5px;
	}
`;

// export const EmailLabel = styled.label`
//     color: gray;
//     font-weight: light;
//     margin-top: 4px;
// `;

export const MessageArea = styled.textarea`
	border-radius: 10px;
	background: transparent;
	/* border-bottom: solid 1px black; */
	padding: 1px -4px 1px 0;
	font-weight: light;
	color: grey;
	font-size: 1em;
	/* text-decoration: none; */
	font-family: inherit;
	margin-top: 10px;

	:focus {
		outline: none;
		outline-color: green;
		border-radius: 5px;
	}
`;

export const FormSubmit = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

export const SubmitButton = styled.button`
	margin-top: 10px;
	padding: 1px 5px 1px 5px;
	background: #130f49;
	color: gray;
	font-weight: light;
	border-radius: 10px;
	font-size: 1em;
	display: flex;
	flex-direction: row;
	align-items: center;
	border: none;
`;

export const SubmitIcon = styled.svg`
	color: cyan;
`;

export const ErrorMessage = styled.p`
	color: red;
`;

export const SuccessMessage = styled.p`
	color: green;
	font-weight: semibold;
	font-size: 1em;
	margin: 1px 0 1px 0;
`;

export const MessageReport = styled.div`
	text-align: left;
`;
