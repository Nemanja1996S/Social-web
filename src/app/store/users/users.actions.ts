import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/User";

export const unsetIsLoading = createAction("[LogIn Component] Unset isLoading");

export const setIsLoading = createAction("[LogIn Component] Set isLoading");

export const setUser = createAction(		//akcija ima id i parametre
	"[App Componet] Set user in state",			//ovo je id akcije
	props<{					//ovo su parametri akcije
		user: User
	}>()
);

export const loadUser = createAction(		//akcija ima id i parametre
	"[App Componet] Load user from database",			//ovo je id akcije
	props<{					//ovo su parametri akcije
		email: string,
		password: string
	}>()
);