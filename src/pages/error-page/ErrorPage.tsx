import { isRouteErrorResponse, useLocation, useRouteError } from "react-router-dom";
import { Error as ErrorComponent } from "../../components/Error/Error";

const ERROR_STRINGS = {
	err404: "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",
};

export default function ErrorPage() {
	const error = useRouteError();
	const location = useLocation();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<ErrorComponent
					h1="Oops!"
					h3={`404 - Page "${location.pathname}" not found`}
					pContent={ERROR_STRINGS.err404}
				/>
			);
		}

		var cont = error.error?.message && (
			<p>
				<i>{error.error.message}</i>
			</p>
		);
		return <ErrorComponent h1="Oops!" h3={`${error.status} ${error.statusText}`} pContent={cont} />;
	} else if (error instanceof Error) {
		return <ErrorComponent h1="Oops!" h3="Something went wrong." pContent={<i>{error.message}</i>} />;
	} else {
		return <ErrorComponent h1="Oops!" h3="Sorry, an unexpected error has occurred." pContent={String(error)} />;
	}
}
