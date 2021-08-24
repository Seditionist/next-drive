
export interface IFolder {
    Uid: string,
    FolderName: string,
    CreatedAt: Date,
    Folders?: IFolder[]
}

export interface IFile {
    Uid: string,
    FolderUid?: string,
    FileName: string,
    FileExtension: string,
    FileContentType: string,
    CreatedAt: Date
}

export interface IParent {
    Uid: string,
    Name: string
}