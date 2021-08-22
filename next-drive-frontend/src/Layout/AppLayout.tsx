import React, {ReactNode} from "react";
import { AppFooter } from "./AppFooter";
import { AppHead } from "./AppHead";

import { Container } from "./Container";

interface IAppLayout {
    children: ReactNode
}

export const AppLayout: React.FC<IAppLayout> = ({ children }: IAppLayout): JSX.Element => {
	return (
		<Container>
			<AppHead title="Next Drive" />
			{ children }
			<AppFooter />
		</Container>
	);
};