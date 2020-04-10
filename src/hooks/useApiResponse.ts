import React from 'react';

export interface IApiResponseState<T> {
	apiResponse: T;
	loading: boolean;
	notFound: boolean;
}

/**
 * Creates an hook that takes care of loading data from backend and handle the state of the request via
 * loading and notFound state variables
 * @param {string} endpointUrl
 * @param {any} initValue initial state for the api response (useful in case you need to initialise to an empty array)
 * null if not defined
 * @returns {IApiResponseState}
 */
export default function useApiResponse<T> (endpointUrl: string, initValue: T = null): IApiResponseState<T> {
	const [apiResponse, setApiResponse] = React.useState<T>(initValue);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [notFound, setNotFound] = React.useState<boolean>(false);

	React.useEffect(() => {
		let isCancelled = false;

		setLoading(true);
		fetch(endpointUrl)
			.then(response => {
				if (response.status === 404) {
					throw `Not found at: ${endpointUrl}`;
				}
				return response.json();
			})
			.then(responseJson => {
				if (!isCancelled) {
					setApiResponse(responseJson);
					setLoading(false);
					setNotFound(false);
				}
			})
			.catch(error => {
				if (!isCancelled) {
					console.error(error);
					setNotFound(true);
					setLoading(false);
				}
			});

		return (): void => {
			isCancelled = true;
		};
	}, [endpointUrl]);

	return {
		apiResponse,
		loading,
		notFound
	};
}