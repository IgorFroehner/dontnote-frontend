export type AuthInfo = {
	token: string;
	user: {
		uuid: string;
		username: string;
		email: string;
		created_at: string;
	};
};
