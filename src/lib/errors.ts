import { FirebaseError } from 'firebase/app';
import type { ErrorMessage } from '../stores';

const errorMessages : {[key: string]: string} = {
	"auth/invalid-email": "Invalid email.",
	"auth/invalid-credential": "Incorrect email or password.",
	"auth/email-already-exists": "The provided email is already in use.",
	"auth/internal-error": "Authentication Error",
	"auth/invalid-password": "Password should be at least six characters."
}

export default function getErrorMessage(e : Error) : ErrorMessage{
	const code : string= (e as FirebaseError).code;	
	let message: string;
	if(errorMessages[code]){
			message = errorMessages[code];
	}
	else if(code.startsWith("auth")){
		message = "Authentication Error: " + code;
	}
	else{
		message = "Error: " + code;
	}
	return {
		message,
		red: true
	}
}
