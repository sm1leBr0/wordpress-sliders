import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const blockProps = useBlockProps.save({
		style: {
			backgroundColor: attributes.backgroundColor,
			color: attributes.textColor,
			fontSize: attributes.fontSize,
			"--animation-color": attributes.animationColor,
		},
	});

	return (
		<div {...blockProps}>
			<h2>{__("Selected Pages:", "services-cards")}</h2>
			<ul>
				{attributes.selectedPages.map((page, index) => (
					<li key={index} className="selected-page-item">
						<h2>{page.title}</h2>
						<a href={page.url} target="_blank" rel="noopener noreferrer">
							{__("View Page", "services-cards")}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Save;
