import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";

import React from "react";
import { Requests } from "@Services/Requests";
import { IFile, IFolder } from "@Types/Abstract";
import { Directory } from "@Comp/Directory";

interface ISubFolderProps {
	folders: IFolder[],
	files: IFile[],
	folderUID?: string
}

const SubFolder: React.FC<ISubFolderProps> = ({ folders, files, folderUID }: ISubFolderProps): JSX.Element => {
	return (
		<Directory folderUID={folderUID} folders={folders} files={files} />
	);
};

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

	folders.sort((a, b) => a.length - b.length);

	return {
		props: {
			folders,
			files,
			folderUID: id
		}
	};
};

export default SubFolder;