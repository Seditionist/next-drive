import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";

import React from "react";
import { Requests } from "@Services/Requests";
import { IFile, IFolder } from "@Types/Abstract";
import { Folders } from "../../Components/Folders";
import { Files } from "../../Components/Files";
import { AppLayout } from "src/Layout/AppLayout";

interface ISubFolderProps {
	folders: IFolder[],
	files: IFile[]
}

const SubFolder: React.FC<ISubFolderProps> = ({ folders, files }: ISubFolderProps): JSX.Element => {
	return (
		<AppLayout>
			<Folders folders={folders} />
			<Files files={files} />
		</AppLayout>
	);
};

export default SubFolder;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	const { id } = context.params as ParsedUrlQuery;

	const folders = [];
	const response_folders = await Requests.Get(`folders/getfolders/${id}`);
	if(response_folders.ok) {
		folders.push(...response_folders.data.data);
	}

	const files = [];
	const response_files = await Requests.Get(`files/getfiles/${id}`);
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