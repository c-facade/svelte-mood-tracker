import { FirebaseError } from 'firebase/app';

const errorMessages : {[key: string]: string} = {
	"auth/invalid-email": "Invalid email.",
	"auth/invalid-credential": "Incorrect email or password.",
	"auth/email-already-exists": "The provided email is already in use.",
	"auth/internal-error": "Authentication Error",
	"auth/invalid-password": "Password should be at least six characters."
}

export default function getErrorMessage(e : Error) : string{
	const code : string= (e as FirebaseError).code;	
	if(errorMessages[code]){
		return errorMessages[code];
	}
	else if(code.startsWith("auth")){
		return "Authentication Error: " + code;
	}
	return "Error: " + code;
}
