import { ApiResponse, create } from "apisauce";
import { AxiosRequestConfig } from "axios";

import { Config } from "./Config";

export class Requests {
	private static readonly client = create({
		baseURL: Config.Options.API_ENDPOINT,
		headers: {

		}
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<any>> {
		try {
			return await Requests.client.get(url, config);
		} catch (error) {
			throw new Error(error);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<any>> {
		try {
			return await Requests.client.post(url, data, config);
		} catch (error) {
			throw new Error(error);
		}
	}
}

export class PublicRequests {
	
	private static readonly client = create({
		baseURL: "/api/",
		headers: {

		}
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<any>> {
		try {
			return await PublicRequests.client.get(url, config);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static async Post(url: string, data: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<any>> {
		try {
			return await PublicRequests.client.post(url, data, config);
		} catch (error) {
			throw new Error(error);
		}
	}
}