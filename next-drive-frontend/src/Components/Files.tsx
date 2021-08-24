import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";

import { IFile } from "@Types/Abstract";

interface IFolderProps{
	files: IFile[]
}

export const Files: React.FC<IFolderProps> = ({ files } : IFolderProps) => {
	if(files.length < 1) return null;

	return (
		<div>
			<h3>Files</h3>
			<div style={styles.container}>
				{
					files.map((file, index) => (
						<Button
							style={styles.button}
							variant="contained"
							color="primary"
							key={index}>
							<Link key={index} href={`/api/download?uid=${file.Uid}`} >
								<a target="_blank">{file.FileName}{file.FileExtension}</a>
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