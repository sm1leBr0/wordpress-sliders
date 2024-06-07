import { useState, useEffect } from "@wordpress/element";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	ColorPalette,
	Spinner,
	Button,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState([]);

	useEffect(() => {
		apiFetch({ path: "/wp/v2/pages?per_page=100" })
			.then((fetchedPages) => {
				setPages(fetchedPages);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching pages:", error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (attributes.selectedPageTitles.length > 0) {
			const selectedPages = pages.filter((page) =>
				attributes.selectedPageTitles.includes(page.title.rendered),
			);
			setAttributes({
				selectedPages: selectedPages.map((page) => ({
					title: page.title.rendered,
					url: page.link,
				})),
			});
		} else {
			setAttributes({ selectedPages: [] });
		}
	}, [attributes.selectedPageTitles, pages]);

	const onSelectPage = (selectedPageTitles) => {
		const selectedPages = selectedPageTitles.map((title) => {
			const page = pages.find((p) => p.title.rendered === title);
			return {
				title: page.title.rendered,
				url: page.link,
			};
		});
		setAttributes({
			selectedPageTitles,
			selectedPages,
		});
	};

	const onRemovePage = (pageTitle) => {
		const updatedPageTitles = attributes.selectedPageTitles.filter(
			(title) => title !== pageTitle,
		);
		setAttributes({ selectedPageTitles: updatedPageTitles });
	};

	const onPageButtonClick = (pageTitle) => {
		const updatedPageTitles = [...attributes.selectedPageTitles, pageTitle];
		onSelectPage(updatedPageTitles);
	};

	const blockProps = useBlockProps({
		style: {
			backgroundColor: attributes.backgroundColor,
			color: attributes.textColor,
			fontSize: attributes.fontSize,
			"--animation-color": attributes.animationColor,
		},
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__("Color Settings", "services-cards")}>
					<ColorPalette
						label={__("Animation Color", "services-cards")}
						value={attributes.animationColor}
						onChange={(color) => setAttributes({ animationColor: color })}
					/>
				</PanelBody>
			</InspectorControls>
			{loading ? (
				<Spinner />
			) : (
				<div className="editor-container">
					<div className="page-selection">
						{pages.map((page) => (
							<Button
								key={page.id}
								isSecondary
								className="page-select-button"
								onClick={() => onPageButtonClick(page.title.rendered)}
							>
								{page.title.rendered}
							</Button>
						))}
					</div>
					{attributes.selectedPages.length > 0 && (
						<ul className="selected-pages-list">
							{attributes.selectedPages.map((page, index) => (
								<li key={index} className="selected-page-item">
									<h2>{page.title}</h2>
									<a href={page.url} target="_blank" rel="noopener noreferrer">
										{__("View Page", "services-cards")}
									</a>
									<Button
										isDestructive
										className="page-remove-button"
										onClick={() => onRemovePage(page.title)}
									>
										{__("Remove", "services-cards")}
									</Button>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default Edit;
