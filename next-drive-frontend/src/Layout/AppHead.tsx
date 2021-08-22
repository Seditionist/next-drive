import React from "react";
import Head from "next/head";

interface IAppHeadProps {
    title: string
}

export const AppHead: React.FC<IAppHeadProps> = ({ title }: IAppHeadProps): JSX.Element => {
	return (
		<Head>
			<title>{ title }</title>
			<meta charSet="UTF-8" />
			<meta name="description" content="frontend for next cloud drive" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};
