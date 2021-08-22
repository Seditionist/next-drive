import React from "react";

export const AppFooter: React.FC = (): JSX.Element => {
	return (
		<footer style={styles.footer}>
			<div>&copy; Copyright {new Date().getFullYear()}</div>
		</footer>
	);
};

const styles = {
	footer: {
		width: "100%",
		marginTop: "10px",
		height: "100px",
		borderTop: "1px solid gray",
		justifyContent: "center",
		alignItems: "center",
		display: "flex"
	}
} as IStyles;