import { GetServerSideProps } from "next";
import React from "react";

import { AppLayout } from "../Layout/AppLayout";
import { Requests } from "../Services/Requests";
import { IFolder, IFile } from "../Types/Abstract";
import { Folders } from "../Components/Folders";
import { Files } from "../Components/Files";

interface IHomeProps {
	folders: IFolder[],
	files: IFile[]
}

const Home: React.FC<IHomeProps> = ({folders, files}: IHomeProps): JSX.Element => {
	return (
		<AppLayout>
			<Folders folders={folders} />
			<Files files={files} />
		</AppLayout>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
	const folders = [];
	const response_folders = await Requests.Get("folders/getfolders/");
	if(response_folders.ok) {
		folders.push(...response_folders.data.data);
	}

	const files = [];
	const response_files = await Requests.Get("files/getfiles/");
	if(response_files.ok) {
		files.push(...response_files.data.data);
	}

	return {
		props: {
			folders,
			files
		}
	};
};