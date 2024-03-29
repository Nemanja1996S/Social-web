import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/User";


export const setIsLoading = createAction("[LogIn Component] Set isLoading");

export const loadUser = createAction(		//akcija ima id i parametre
	"[App Component] Load user from database",			//ovo je id akcije
	props<{					//ovo su parametri akcije
		email: string,
		password: string
	}>()
);

export const loadUserSuccess = createAction(		//akcija ima id i parametre
	"[App Component] Load user success",			//ovo je id akcije
	props<{					//ovo su parametri akcije
		user: User
	}>()
);


export const loadUserFailure = createAction(		//akcija ima id i parametre
	"[App Component] Load user failure",			//ovo je id akcije
	props<{					//ovo su parametri akcije
		error: string
	}>()
);