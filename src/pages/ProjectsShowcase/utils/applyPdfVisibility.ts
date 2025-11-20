import type { PdfOptions } from "../types";

export const applyPdfVisibility = (
  element: HTMLElement,
  options: PdfOptions
) => {
  const toggledNodes: Array<{ node: HTMLElement; previousDisplay: string }> =
    [];

  const toggleSection = (section: string, visible: boolean) => {
    if (visible) return;
    const nodes = element.querySelectorAll<HTMLElement>(
      `[data-section="${section}"]`
    );
    nodes.forEach((node) => {
      toggledNodes.push({
        node,
        previousDisplay: node.style.display,
      });
      node.style.display = "none";
    });
  };

  toggleSection("case-study", options.includeCaseStudy);
  toggleSection("features", options.includeFeatures);

  return () => {
    toggledNodes.forEach(({ node, previousDisplay }) => {
      node.style.display = previousDisplay;
    });
  };
};

