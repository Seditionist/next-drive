import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider } from "@material-ui/core";

import { IFile, IFolder } from "@Types/Abstract";
import { Folders } from "@Comp/Folders";
import { Files } from "@Comp/Files";
import { PublicRequests } from "@Services/Requests";
import { AppLayout } from "../Layout/AppLayout";

interface IDirectoryProps {
	folders: IFolder[],
	files: IFile[],
	folderUID?: string
}

export const Directory: React.FC<IDirectoryProps> = ({
	folders,
	files,
	folderUID
}: IDirectoryProps): JSX.Element => {
	
	const [open, setOpen] = useState(false);
	const [folderLoading, setFolderLoading] = useState(false);
	const [folderName, setFolderName] = useState("Untitled Folder");

	const handleSubmit = async () => {
		try {
			setFolderLoading(true);

			console.log(folderUID);
			if(folderUID)
			{
				const { data } = await PublicRequests.Post("folders/createsub", {
					name: folderName,
					folderUID
				});
				console.log(data);
			}
			else
			{
				const { data } = await PublicRequests.Post("folders/createroot", {
					name: folderName
				});
				console.log(data);
			}

			window.location.reload();

			setFolderLoading(false);
			setFolderName("Untitled Folder");
			setOpen(false);
		} catch (error) {
			setFolderLoading(false);
			setFolderName("Untitled Folder");
			setOpen(false);

			console.log(error);
		}
	};

	return (
		<AppLayout>
			<div>
				<Button variant="contained" color="primary" onClick={() => setOpen(true)} disabled={folderLoading}>Create Folder</Button>
				<Folders folders={folders} />
			</div>
			<div>
				<Divider style={{marginBottom: "10px", marginTop: "10px"}} />
				<Button variant="contained" color="primary">Upload File</Button>
				<Files files={files} />
			</div>
			<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New Folder</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="FolderName"
						type="text"
						placeholder="folder name..."
						autoComplete="off"
						onChange={e => setFolderName(e.target.value)}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={folderLoading} color="primary">
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</AppLayout>
	);
};
