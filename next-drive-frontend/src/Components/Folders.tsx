import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";

import { IFolder } from "@Types/Abstract";

interface IFolderProps{
	folders: IFolder[]
}

export const Folders: React.FC<IFolderProps> = ({ folders } : IFolderProps) => {
	if(folders.length <= 0) return null;
	return (
		<div>
			<h3>Folders</h3>
			<div style={styles.container}>
				{
					folders.map((folder, index) => (
						<Button
							style={styles.button}
							variant="contained"
							color="primary"
							key={index}>
							<Link key={index} href="/[id]" as={`/${folder.Uid}`}>
								<a>{folder.FolderName}</a>
							</Link>
						</Button>
					))
				}
			</div>
		</div>
	);
};

const styles = {
	button: {
		margin: "5px"
	},
	container: {
		flexWrap: "wrap"
	}
} as IStyles;